import RegisterForm from "../components/register/RegisterForm";

function RegisterPage() {
    return (
        <div className="min-h-screen w-full bg-accent-yellow p-6">
            <div className="space-y-4 justify-center">
                <div className="flex justify-center">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
