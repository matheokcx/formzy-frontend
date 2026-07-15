import { Route, Routes } from 'react-router';
import './lib/i18n';
import ProtectedRoute from '@/components/Layout/ProtectedRoute.tsx';
import NavBar from '@/components/Layout/NavBar/NavBar.tsx';
import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/HomePage.tsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.tsx'));
const RegisterPage = lazy(() => import('./pages/RegisterPage.tsx'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage.tsx'));

const App = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<RegisterPage />} />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
};

export default App;
