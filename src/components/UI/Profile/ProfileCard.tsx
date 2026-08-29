import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth.ts';
import { useTheme } from '@/hooks/useTheme.tsx';
import LanguageSelector from '@/components/UI/LanguageSelector.tsx';
import styles from '../../../pages/ProfilePage/profile-page.module.css';

const ProfileCard = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const { theme, handleThemeChange } = useTheme();

    if (!user) {
        throw new Promise<void>(() => {});
    }

    return (
        <section className={styles.profileSection}>
            <header className={styles.header}>
                <span className={styles.avatar}>{user.fullName.slice(0, 2)}</span>
                <div className={styles.identity}>
                    <h2>{user.fullName}</h2>
                    <span className={styles.role}>{user.role}</span>
                </div>
            </header>

            <hr />

            <dl className={styles.infoList}>
                <div className={styles.infoRow}>
                    <dt>{t('email')}</dt>
                    <dd>{user.email}</dd>
                </div>
                <div className={styles.infoRow}>
                    <dt>{t('createdAt')}</dt>
                    <dd>{user.createdAt.toLocaleString().split('T')[0]}</dd>
                </div>
                <div className={styles.infoRow}>
                    <dt>{t('updatedAt')}</dt>
                    <dd>{user.updatedAt.toLocaleString().split('T')[0]}</dd>
                </div>
            </dl>

            <hr />

            <footer className={styles.settings}>
                <button onClick={handleThemeChange}>{t(theme)}</button>
                <LanguageSelector />
            </footer>
        </section>
    );
};

export default ProfileCard;
