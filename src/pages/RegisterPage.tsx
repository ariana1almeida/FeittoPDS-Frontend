import RegisterForm from "../components/register/RegisterForm";

function RegisterPage() {
    return (
        <div className="min-h-screen w-full bg-neutral-light flex flex-col">
            <div className="flex-1 p-6">
                <div className="space-y-4 justify-center">
                    <div className="flex justify-center">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
