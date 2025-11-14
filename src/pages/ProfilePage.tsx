import Header from "../components/common/Header.tsx";
import Footer from "../components/common/Footer.tsx";
import BackButton from "../components/common/BackButton.tsx";
import H1 from "../components/common/H1.tsx";
import P from "../components/common/P.tsx";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "../components/common/Tabs";
import ProfileAvatar from "../components/profile/ProfileAvatar.tsx";
import PersonalInfoForm from "../components/profile/PersonalInfoForm.tsx";
import AdvancedSettings from "../components/profile/AdvancedSettings.tsx";
import type {ProfileResponse} from "../types/ProfileResponse.ts";
import type {AuthContextType} from "../types/AuthContextType.ts";
import {useState, useEffect} from "react";
import {UserService} from "../services/UserService.ts";

interface ProfilePageProps {
    auth?: AuthContextType
}

export default function ProfilePage({auth}: ProfilePageProps) {
    const userService = UserService.getInstance();
    const [updateData, setUpdateData] = useState<ProfileResponse>({});
    const [loading, setLoading] = useState(true);
    const isProvider = auth?.authData?.userType === "PROVIDER";
    const uid = auth?.authData?.uid ?? '';

    const getProfileData = async () => {
        if (!uid || uid.trim() === '') return;
        try {
            setLoading(true);
            const res = await userService.getUserProfileInformation(uid);
            console.log('resposta do profile:', res);
            // const res = await api.get<ProfileResponse>(endpoint);
            setUpdateData(res)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateUserInformation = async () => {
        if (!uid || uid.trim() === '') return;
        try {
            setLoading(true);
            const updateInput = {...updateData};
            if (updateInput?.id) {
                delete updateInput.id;
            }
            const res = await userService.updateUserInformation(uid, updateInput);
            setUpdateData(res);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!auth?.authData?.uid) return;
        getProfileData();
    }, [auth?.authData?.uid]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-5">
                <h1 className="text-center">Carregando informações do usuário...</h1>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-neutral-light">
            <Header/>
            <div className="flex flex-col flex-1 max-w-7xl mx-auto w-full">
                <div className="max-w-7xl px-8 py-12 h-16 flex items-center justify-start">
                    <BackButton/>
                </div>
                <div className="flex flex-col justify-start items-center flex-1 px-4">
                    <H1 className="text-primary-dark">Meu Perfil</H1>
                    <P className="text-primary-dark/80">
                        {isProvider
                            ? "Gerencie suas informações profissionais"
                            : "Gerencie suas informações pessoais e preferências"}
                    </P>
                    <div className="bg-white m-40 mt-8 p-8 rounded-lg shadow-md w-full max-w-3xl">
                        <Tabs defaultValue="personal" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-10 bg-muted">
                                <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
                                <TabsTrigger value="advanced">Configurações Avançadas</TabsTrigger>
                            </TabsList>
                            <TabsContent value="personal" className="space-y-10">
                                <div className="flex flex-col space-y-3 items-center">
                                    <ProfileAvatar
                                        updateData={updateData}
                                        setUpdateData={setUpdateData}/>
                                    <PersonalInfoForm
                                        updateData={updateData}
                                        setUpdateData={setUpdateData}
                                        onSubmit={updateUserInformation}
                                        isProvider={isProvider}
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent value="advanced" className="space-y-10">
                                <AdvancedSettings/>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
