import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth.ts';
import { AuthService } from '@/services/authService.ts';
import toast from 'react-hot-toast';
import styles from './login-form.module.css';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { t } = useTranslation();

    const handleLogin = async (formData: FormData): Promise<void> => {
        try {
            const response = await AuthService.login(formData);

            if (response.status === 200) {
                login(response.data.token);
                navigate('/');
            }
        } catch {
            toast.error('Email ou mot de passe incorrect');
        }
    };

    return (
        <form action={handleLogin} className={styles.loginForm}>
            <h3>{t('login')}</h3>
            <input type="email" name="email" placeholder={t('email')} required />
            <input type="password" name="password" placeholder={t('password')} required />

            <button type="submit">{t('login')}</button>
            <Link to="/signup" style={{ textAlign: 'center' }}>
                {t('signup')}
            </Link>
        </form>
    );
};

export default LoginForm;
