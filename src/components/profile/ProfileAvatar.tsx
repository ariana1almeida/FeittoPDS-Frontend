import {Avatar, AvatarImage, AvatarFallback} from "../common/Avatar";
import {CameraIcon, UserIcon} from "@phosphor-icons/react";

export default function ProfileAvatar() {
    return (
        <div className="flex flex-col items-center mb-8 relative">
            <Avatar className="h-24 w-24 mb-2">
                <AvatarImage src={undefined}/>
                <AvatarFallback className="bg-primary-dark text-white text-3xl">
                    <UserIcon size={48}/>
                </AvatarFallback>
            </Avatar>
            <label
                htmlFor="avatar-upload"
                className="bg-accent-yellow rounded-full p-2 cursor-pointer shadow-lg hover:bg-accent-yellow-hover transition-colors absolute right-14 top-18"
            >
                <CameraIcon className="h-5 w-5 text-white"/>
                <input id="avatar-upload" type="file" accept="image/*" className="hidden"/>
            </label>
            <p className="text-sm text-neutral-medium mt-2">Clique no ícone para alterar a foto</p>
        </div>
    );
}
