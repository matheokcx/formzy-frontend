import type { Form, FormStatus } from '@/types';
import FormCard from '@/components/UI/Form/FormCard/FormCard.tsx';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/hooks/useAuth.ts';
import styles from './form-list.module.css';
import { useTranslation } from 'react-i18next';
import { FormService } from '@/services/formService.ts';

type FormListProps = {
    statusFilter: FormStatus;
};

const FormList = ({ statusFilter }: FormListProps) => {
    const { t } = useTranslation();
    const { user } = useAuth();

    const [forms, setForms] = useState<Form[]>([]);

    useEffect(() => {
        const func = async () => {
            if (user) {
                const result: Form[] = await FormService.getUserForms(user.id);
                setForms(result);
            }
        };
        func();
    }, [user]);

    const filteredForms = useMemo(() => {
        switch (statusFilter) {
            case 'open':
                return forms.filter((form) => !form.isPrivate && !form.isClosed);
            case 'closed':
                return forms.filter((form) => !form.isPrivate && form.isClosed);
            case 'private':
                return forms.filter((form) => form.isPrivate);
            default:
                return forms;
        }
    }, [forms, statusFilter]);

    return (
        <div>
            <div>
                <h1>{t('forms.your_forms')}</h1>
                <p>{t('forms.formWithCount', { count: filteredForms.length })}</p>
            </div>

            <div className={styles.grid}>
                {filteredForms.length > 0 &&
                    filteredForms.map((form: Form) => <FormCard key={form.id} form={form} />)}
            </div>
        </div>
    );
};

export default FormList;
