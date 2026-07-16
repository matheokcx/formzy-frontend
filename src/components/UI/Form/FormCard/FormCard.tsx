import type { Form } from '@/types';
import styles from './form-card.module.css';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DotsThreeVerticalIcon, ListChecksIcon, UsersThreeIcon } from '@phosphor-icons/react';

type FormCardProps = {
    form: Form;
};

const FormCard = ({ form }: FormCardProps) => {
    const { t } = useTranslation();
    const handleFormStatus = useCallback(() => {
        if (form.isPrivate) {
            return t('forms.status.private');
        }

        if (form.isClosed) {
            return t('forms.status.closed');
        }

        return t('forms.status.open');
    }, [form, t]);
    const handleFormStatusColor = useCallback(() => {
        if (form.isPrivate) {
            return '#e34b4b';
        }

        if (form.isClosed) {
            return '1A1A1A';
        }

        return '#28cd19';
    }, [form]);

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span
                    className={styles.statusChip}
                    style={{ backgroundColor: handleFormStatusColor() }}
                >
                    {handleFormStatus()}
                </span>
                <DotsThreeVerticalIcon size={22} />
            </div>
            <h2>{form.name}</h2>
            <div className={styles.footer}>
                <div>
                    <ListChecksIcon size={24} />
                    <p>
                        {Object.keys(form.fields).length} {t('questions')}
                    </p>
                </div>
                <div>
                    <UsersThreeIcon size={24} />
                    <p>
                        {form?.replies?.length ?? 0} {t('replies')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FormCard;
