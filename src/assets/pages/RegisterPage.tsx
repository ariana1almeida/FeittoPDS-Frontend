import RegisterForm from "../../components/register/RegisterForm";

function RegisterPage() {
  return (
    <div className="min-h-screen w-full bg-amber-600 p-6">
      <div className="space-y-4 justify-center">
        <div className="flex justify-center">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
