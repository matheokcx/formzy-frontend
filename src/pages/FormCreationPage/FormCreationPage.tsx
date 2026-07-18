import PickableFields from '@/components/UI/Form/Creation/PickableFields.tsx';
import styles from './form-creation-page.module.css';
import { useNavigate } from 'react-router';
import {
    ArrowClockwiseIcon,
    ArrowCounterClockwiseIcon,
    ArrowLeftIcon,
    EyeIcon,
    FloppyDiskIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

const FormCreationPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <div>
                    <button onClick={() => navigate('/forms')} className={styles.backButton}>
                        <ArrowLeftIcon size={24} />
                    </button>
                    <input type="text" name="name" placeholder="Nom du formulaire" />
                </div>
                <div>
                    <button>
                        <ArrowCounterClockwiseIcon size={20} />
                    </button>
                    <button>
                        <ArrowClockwiseIcon size={20} />
                    </button>
                    <button>
                        <EyeIcon size={16} />
                        {t('glimpse')}
                    </button>
                    <button>
                        <FloppyDiskIcon size={16} />
                        {t('save')}
                    </button>
                </div>
            </div>
            <PickableFields />
        </main>
    );
};

export default FormCreationPage;
