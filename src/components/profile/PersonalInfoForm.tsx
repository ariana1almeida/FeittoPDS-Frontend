import React from "react";
import Input from "../common/Input.tsx";
import CustomSelect from "../common/CustomSelect.tsx";
import {PhoneIcon, FloppyDiskIcon} from "@phosphor-icons/react";
import {CITIES} from "../../constants/formData.ts";
import type {ProfileResponse} from "../../types/ProfileResponse.ts";

interface PersonalInfoFormProps {
    updateData: ProfileResponse,
    setUpdateData: React.Dispatch<React.SetStateAction<ProfileResponse>>,
    onSubmit: () => void,
    isProvider?: boolean
}

export default function PersonalInfoForm({updateData, setUpdateData, onSubmit, isProvider}: PersonalInfoFormProps) {
    return (
        <form className="w-full space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-neutral-dark font-medium mb-1">
                        Primeiro nome
                    </label>
                    <Input
                        name=""
                        value={updateData?.firstName ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setUpdateData(prev => ({...(prev || {}), firstName: e.target.value}));
                        }}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-dark mb-1">
                        Sobrenome
                    </label>
                    <Input
                        name=""
                        value={updateData?.lastName ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setUpdateData(prev => ({...(prev || {}), lastName: e.target.value}));
                        }}
                    />
                </div>
            </div>

            <div className="mb-12">
                <label className="block text-sm font-medium text-neutral-dark mb-1">Telefone</label>
                <Input
                    name=""
                    icon={<PhoneIcon/>}
                    value={updateData?.phone ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUpdateData(prev => ({...(prev || {}), phone: e.target.value}));
                    }}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-neutral-dark mb-1">Estado</label>
                    <Input name="" value={updateData?.state ?? ""} readOnly={true}/>
                </div>
                <div>
                    <label>
                        <CustomSelect
                            label="Cidade"
                            name="city"
                            value={updateData.city ?? ""}
                            options={CITIES}
                            placeholder="Cidade"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                const {name, value} = e.target;
                                setUpdateData(prev => ({...(prev || {}), [name]: value}));
                            }}
                        />
                    </label>
                </div>
            </div>

            {isProvider && (
                <div className="mb-12">
                    <label className="block text-sm font-medium text-neutral-dark mb-1">Bairro</label>
                    <Input
                        name=""
                        value={updateData?.neighborhood ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setUpdateData(prev => ({
                                ...(prev || {}),
                                userData: {...(prev?.userData || {}), neighborhood: e.target.value}
                            }));
                        }}
                    />
                </div>
            )}

            {!isProvider && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-neutral-dark mb-1">Endereço</label>
                        <Input
                            name=""
                            value={updateData?.userData?.street ?? ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setUpdateData(prev => ({
                                    ...(prev || {}),
                                    userData: {...(prev?.userData || {}), street: e.target.value}
                                }));
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-dark mb-1">Número</label>
                            <Input
                                name=""
                                value={updateData?.userData?.houseNumber?.toString() ?? ""}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setUpdateData(prev => ({
                                        ...(prev || {}),
                                        userData: {...(prev?.userData || {}), houseNumber: parseInt(e.target.value, 10)}
                                    }));
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-dark mb-1">Referência</label>
                            <Input
                                name=""
                                value={updateData?.userData?.reference ?? ""}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setUpdateData(prev => ({
                                        ...(prev || {}),
                                        userData: {...(prev?.userData || {}), reference: e.target.value}
                                    }));
                                }}
                            />
                        </div>
                    </div>
                </>
            )}

            <button
                type="submit"
                className="w-full bg-primary-dark text-white rounded-lg py-3 mt-6 font-medium shadow-md hover:bg-primary-medium transition-colors flex items-center justify-center gap-2"
                onClick={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <FloppyDiskIcon/> Salvar Alterações
            </button>
        </form>
    );
}