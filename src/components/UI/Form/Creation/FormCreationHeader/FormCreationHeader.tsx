import styles from './form-creation-header.module.css';
import { ArrowLeftIcon, EyeIcon, FloppyDiskIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

interface FormCreationHeaderProps {
    name: string;
    handleSave: () => void;
}

const FormCreationHeader = ({ name, handleSave }: FormCreationHeaderProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className={styles.header}>
            <div className={styles.leftHeader}>
                <button onClick={() => navigate('/forms')} className={styles.backButton}>
                    <ArrowLeftIcon size={24} />
                </button>
                <h2>{name}</h2>
            </div>
            <div>
                <button className={styles.glimpseButton}>
                    <EyeIcon size={16} />
                    {t('glimpse')}
                </button>
                <button onClick={handleSave} className={styles.saveButton}>
                    <FloppyDiskIcon size={16} />
                    {t('save')}
                </button>
            </div>
        </div>
    );
};

export default FormCreationHeader;
