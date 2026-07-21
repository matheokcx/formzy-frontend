import DraggableFieldsList from '@/components/UI/Form/Creation/DraggableFieldsList/DraggableFieldsList.tsx';
import styles from './form-creation-page.module.css';
import FormCreationHeader from '@/components/UI/Form/Creation/FormCreationHeader/FormCreationHeader.tsx';
import { useState } from 'react';
import type { FormField } from '@/types';
import FormEditionSection from '@/components/UI/Form/Creation/FormEditionSection/FormEditionSection.tsx';
import { FormService } from '@/services/formService.ts';
import { useNavigate } from 'react-router';

const FormCreationPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState<string>('Nom du formulaire');
    const [description, setDescription] = useState<string>('Description');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [fields, setFields] = useState<FormField[]>([]);

    const saveFormInformation = async (): Promise<void> => {
        await FormService.createForm({
            name: name,
            description: description,
            isPrivate: isPrivate,
            //fields: fields,
            fields: {} as never,
        }).then(() => navigate('/forms'));
    };

    return (
        <main className={styles.page}>
            <FormCreationHeader name={name} handleSave={saveFormInformation} />
            <div className={styles.content}>
                <DraggableFieldsList />
                <FormEditionSection
                    name={name}
                    setName={setName}
                    description={description}
                    setDescription={setDescription}
                    fields={fields}
                    setFields={setFields}
                    isPrivate={isPrivate}
                    setIsPrivate={setIsPrivate}
                />
            </div>
        </main>
    );
};

export default FormCreationPage;
