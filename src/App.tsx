import {Routes, Route, Navigate} from "react-router-dom";
import {HashRouter} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import {HomePage} from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import ClientHomePage from "./pages/ClientHomePage";
import ProviderHomePage from "./pages/ProviderHomePage";
import {AuthProvider} from "./context/AuthContext";
import {useAuth} from "./hooks/useAuth";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx";
import TermsOfUsePage from "./pages/TermsOfUsePage.tsx";
import ProviderProposalsPage from "./pages/ProviderProposalsPage.tsx";
import ServiceProposalsPage from "./pages/ServiceProposalsPage.tsx";

export default function App() {
    return (
        <HashRouter>
            <AuthProvider>
                <AppContent/>
            </AuthProvider>
        </HashRouter>
    );
}

function AppContent() {
    function ProtectedRoute({children}: { children: React.ReactNode; userType?: "CLIENT" | "PROVIDER" }) {
        const {loading, authData} = useAuth();

        if (loading) {
            return <div
                className="min-h-screen flex items-center justify-center bg-neutral-light text-primary-dark">Carregando...</div>;
        }

        if (!authData) {
            return <Navigate to="/login" replace/>;
        }

        return <>{children}</>;
    }

    function HomeRedirect() {
        const {authData, loading} = useAuth();

        if (loading) {
            return <div
                className="min-h-screen flex items-center justify-center bg-neutral-light text-primary-dark">Carregando...</div>;
        }

        if (authData?.userType) {
            return <Navigate to={authData.userType === "CLIENT" ? "/client/home" : "/provider/home"} replace/>;
        }

        return <HomePage/>;
    }

    return (
        <Routes>
            <Route path="/" element={<HomeRedirect/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
            <Route path="/reset-password" element={<ResetPasswordPage/>}/>
            <Route path="/terms" element={<TermsOfUsePage/>}/>
            <Route path="/service/:serviceId/proposals" element={<ServiceProposalsPage />} />

            <Route
                path="/client/home"
                element={
                    <ProtectedRoute userType="CLIENT">
                        <ClientHomePage/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <ProfilePage auth={useAuth()}/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/provider/home"
                element={
                    <ProtectedRoute userType="PROVIDER">
                        <ProviderHomePage/>
                    </ProtectedRoute>
                }
            />
            <Route path="/provider/proposals"
                   element={
                       <ProtectedRoute userType="PROVIDER">
                           <ProviderProposalsPage/>
                       </ProtectedRoute>
                   }
            />
            <Route path="*" element={<HomePage/>}/>
        </Routes>
    );
}
