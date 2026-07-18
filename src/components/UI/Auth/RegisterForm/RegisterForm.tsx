import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth.ts';
import { AuthService } from '@/services/authService.ts';
import toast from 'react-hot-toast';
import styles from './register-form.module.css';
import { useTranslation } from 'react-i18next';

const RegisterForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { t } = useTranslation();

    const handleRegister = async (formData: FormData): Promise<void> => {
        if (formData.get('password') !== formData.get('passwordConfirmation')) {
            toast.error(t('passwordMismatch'));
            return;
        }

        try {
            const response = await AuthService.register(formData);

            if (response.status === 201 || response.status === 200) {
                login(response.data.token);
                navigate('/');
            }
        } catch {
            toast.error(t('registerError'));
        }
    };

    return (
        <form action={handleRegister} className={styles.registerForm}>
            <h3>{t('signup')}</h3>
            <input type="text" name="fullName" placeholder={t('fullName')} required />
            <input type="email" name="email" placeholder={t('email')} required />
            <input type="password" name="password" placeholder={t('password')} required />
            <input
                type="password"
                name="passwordConfirmation"
                placeholder={t('passwordConfirmation')}
                required
            />

            <button type="submit">{t('signup')}</button>
        </form>
    );
};

export default RegisterForm;
