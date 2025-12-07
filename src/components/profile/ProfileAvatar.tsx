import {Avatar} from "../common/Avatar";
import {CameraIcon} from "@phosphor-icons/react";
import type {ProfileResponse} from "../../types/ProfileResponse.ts";
import {convertImageToBase64} from "../common/utils.ts";
type ProfileAvatarProps = {
    updateData: ProfileResponse;
    setUpdateData: (updateData: ProfileResponse) => void;
};

export default function ProfileAvatar(profileAvatarProps: ProfileAvatarProps) {
    const {updateData, setUpdateData} = profileAvatarProps;

    const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            convertImageToBase64(file)
                .then((base64String) => {
                    setUpdateData({
                        ...updateData,
                        picture: base64String,
                    });
                })
                .catch((error) => {
                    console.error("Error converting image to base64:", error);
                });
        }
    };

    return (
        <div className="flex flex-col items-center mb-8 relative">
            <Avatar className="h-24 w-24 mb-2"
                    image={updateData.picture}
                    alt={"Avatar do usuário"}>
            </Avatar>
            <label
                htmlFor="avatar-upload"
                className="bg-primary-dark rounded-full p-2 cursor-pointer absolute right-14 top-18"
            >
                <CameraIcon className="h-5 w-5 text-white"/>
                <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleSubmit}/>
            </label>
            <p className="text-sm text-neutral-medium mt-2">Clique no ícone para alterar a foto</p>
        </div>
    );
}
