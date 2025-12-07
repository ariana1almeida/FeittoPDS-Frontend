import {ArrowLeftIcon} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate();
    return (
        <div>
            <button
                onClick={() => navigate("/")}
                className="flex items-center text-neutral-dark mb-6"
            >
                <ArrowLeftIcon className="h-4 w-4 mr-2"/>
                Voltar
            </button>
        </div>
    );
}
