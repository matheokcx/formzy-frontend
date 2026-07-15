import type { Form } from '@/types';
import FormCard from '@/components/UI/Form/FormCard.tsx';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth.ts';
import styles from './form-list.module.css';
import { AuthService } from '@/services/formService.ts';

const FormList = () => {
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
        <div className={styles.grid}>
            {forms.length > 0 && forms.map((form: Form) => <FormCard key={form.id} form={form} />)}
        </div>
    );
};

export default FormList;
