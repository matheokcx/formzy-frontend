import type { Form, FormStatus } from '@/types';
import FormCard from '@/components/UI/Form/FormCard/FormCard.tsx';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth.ts';
import styles from './form-list.module.css';
import { AuthService } from '@/services/formService.ts';
import { useTranslation } from 'react-i18next';

type FormListProps = {
    statusFilter: FormStatus;
};

const FormList = ({ statusFilter }: FormListProps) => {
    const { t } = useTranslation();

    const [forms, setForms] = useState<Form[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        const func = async () => {
            if (user) {
                const result: Form[] = await AuthService.getUserForms(user.id);
                setForms(result);
            }
        };
        func();
    }, [user]);

    return (
        <div>
            <div>
                <h1>{t('forms.your_forms')}</h1>
                <p>{t('forms.formWithCount', { count: forms.length })}</p>
            </div>

            <div className={styles.grid}>
                {forms.length > 0 &&
                    forms.map((form: Form) => <FormCard key={form.id} form={form} />)}
            </div>
        </div>
    );
};

export default FormList;
