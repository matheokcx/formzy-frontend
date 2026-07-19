import PickableFields from '@/components/UI/Form/Creation/PickableFields/PickableFields.tsx';
import styles from './form-creation-page.module.css';
import FormCreationHeader from '@/components/UI/Form/Creation/FormCreationHeader/FormCreationHeader.tsx';
import { useState } from 'react';
import type { FormField } from '@/types';
import FormEditionSection from '@/components/UI/Form/Creation/FormEditionSection/FormEditionSection.tsx';

const FormCreationPage = () => {
    const [description, setDescription] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [fields, setFields] = useState<FormField[]>([]);

    console.log(setDescription, setIsPrivate);

    return (
        <main className={styles.page}>
            <FormCreationHeader description={description} fields={fields} isPrivate={isPrivate} />
            <div className={styles.content}>
                <PickableFields />
                <FormEditionSection fields={fields} setFields={setFields} />
            </div>
        </main>
    );
};

export default FormCreationPage;
