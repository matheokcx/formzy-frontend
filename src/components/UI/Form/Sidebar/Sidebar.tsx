import { useTranslation } from 'react-i18next';
import { CircleDashedIcon, LockIcon, PlusIcon, TrayIcon, XCircleIcon } from '@phosphor-icons/react';
import styles from './sidebar.module.css';
import { useNavigate } from 'react-router';
import type { FormStatus } from '@/types';

interface SidebarProps {
    statusFilter: FormStatus;
    handleFilterChange: (newValue: FormStatus) => void;
}

const Sidebar = ({ statusFilter, handleFilterChange }: SidebarProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleButtonFilterColor = (filter: FormStatus) => {
        return {
            backgroundColor: statusFilter === filter ? '#1A1A1A' : 'transparent',
            color: statusFilter === filter ? '#FFF' : 'var(--title-color)',
        };
    };

    return (
        <aside className={styles.sidebar}>
            <button onClick={() => navigate('/forms/creation')}>
                <PlusIcon size={24} />
                {t('forms.new_form')}
            </button>

            <p>{t('filters')}</p>
            <div className={styles.formStatusButtons}>
                <button
                    onClick={() => handleFilterChange('all')}
                    style={handleButtonFilterColor('all')}
                >
                    <div>
                        <TrayIcon size={20} />
                        {t('all')}
                    </div>
                </button>
                <button
                    onClick={() => handleFilterChange('open')}
                    style={handleButtonFilterColor('open')}
                >
                    <div>
                        <CircleDashedIcon size={20} />
                        {t('forms.status.open')}
                    </div>
                </button>
                <button
                    onClick={() => handleFilterChange('closed')}
                    style={handleButtonFilterColor('closed')}
                >
                    <div>
                        <XCircleIcon size={20} />
                        {t('forms.status.closed')}
                    </div>
                </button>
                <button
                    onClick={() => handleFilterChange('private')}
                    style={handleButtonFilterColor('private')}
                >
                    <div>
                        <LockIcon size={20} />
                        {t('forms.status.private')}
                    </div>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
