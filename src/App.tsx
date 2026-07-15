import { Route, Routes } from 'react-router';
import './lib/i18n';
import ProtectedRoute from '@/components/Layout/ProtectedRoute.tsx';
import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/HomePage.tsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.tsx'));
const RegisterPage = lazy(() => import('./pages/RegisterPage.tsx'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage.tsx'));
const FormsPage = lazy(() => import('./pages/FormsPage/FormsPage.tsx'));

const App = () => {
    return (
        <>
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
                <Route
                    path="/forms"
                    element={
                        <ProtectedRoute>
                            <FormsPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
};

export default App;
