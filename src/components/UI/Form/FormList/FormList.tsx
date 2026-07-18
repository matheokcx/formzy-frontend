import type { Form, FormStatus } from '@/types';
import FormCard from '@/components/UI/Form/FormCard/FormCard.tsx';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/hooks/useAuth.ts';
import styles from './form-list.module.css';
import { AuthService } from '@/services/formService.ts';
import { useTranslation } from 'react-i18next';

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
                const result: Form[] = await AuthService.getUserForms(user.id);
                setForms(result);
            }
        };
        func();
    }, [user]);

    const filteredForms = useMemo(() => {
        switch (statusFilter) {
            case 'open':
                // ouvert : ni privé, ni fermé
                return forms.filter((form) => !form.isPrivate && !form.isClosed);
            case 'closed':
                // fermé : pas privé mais fermé
                return forms.filter((form) => !form.isPrivate && form.isClosed);
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
