import RegisterForm from "../components/register/RegisterForm";
import Header from "../components/Header";
import Footer from "../components/Footer";

function RegisterPage() {
    return (
        <div className="min-h-screen w-full bg-accent-yellow flex flex-col">
            <Header />

            <div className="flex-1 p-6">
                <div className="space-y-4 justify-center">
                    <div className="flex justify-center">
                        <RegisterForm />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default RegisterPage;
