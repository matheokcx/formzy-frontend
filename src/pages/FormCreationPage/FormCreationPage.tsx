import PickableFields from '@/components/UI/Form/Creation/PickableFields/PickableFields.tsx';
import styles from './form-creation-page.module.css';
import FormCreationHeader from '@/components/UI/Form/Creation/FormCreationHeader/FormCreationHeader.tsx';
import { useState } from 'react';
import type { FormField } from '@/types';

const FormCreationPage = () => {
    const [description, setDescription] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [fields, setFields] = useState<FormField[]>([]);

    const addField = (newField: FormField): void => {
        setFields([...fields, newField]);
    };

    const removeField = (position: number): void => {
        setFields(fields.filter((field: FormField) => field.position !== position));
    };

    return (
        <main className={styles.page}>
            <FormCreationHeader description={description} fields={fields} isPrivate={isPrivate} />
            <PickableFields />
            <div></div>
        </main>
    );
};

export default FormCreationPage;
