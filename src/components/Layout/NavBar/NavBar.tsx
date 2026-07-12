import { Link, useLocation, useNavigate } from 'react-router';
import styles from './navbar.module.css';
import { useAuth } from '@/hooks/useAuth.ts';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { isAuthenticated, logout } = useAuth();
    const { t } = useTranslation();
    const isAuthPage = ['/login', '/signin'].includes(pathname);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (isAuthPage) {
        return null;
    }

    return (
        <nav className={styles.navbar}>
            <div>
                <Link to="/">{t('home')}</Link>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                {!isAuthenticated ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => navigate('/login')}>{t('login')}</button>
                        <button onClick={() => navigate('/signup')}>{t('signup')}</button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => navigate('/profile')}>{t('profile')}</button>
                        <button onClick={handleLogout}>{t('logout')}</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
