import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.tsx';
import './lib/i18n';
import LoginPage from '@/pages/LoginPage.tsx';
import RegisterPage from '@/pages/RegisterPage.tsx';
import ProfilePage from '@/pages/ProfilePage/ProfilePage.tsx';
import ProtectedRoute from '@/components/Layout/ProtectedRoute.tsx';
import NavBar from '@/components/Layout/NavBar/NavBar.tsx';

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
