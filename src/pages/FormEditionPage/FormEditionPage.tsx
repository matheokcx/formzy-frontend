import DraggableFieldsList from '@/components/UI/Form/Creation/DraggableFieldsList/DraggableFieldsList.tsx';
import styles from './form-edition-page.module.css';
import FormCreationHeader from '@/components/UI/Form/Creation/FormCreationHeader/FormCreationHeader.tsx';
import { useEffect, useState } from 'react';
import type { Form, FormField } from '@/types';
import FormEditionSection from '@/components/UI/Form/Creation/FormEditionSection/FormEditionSection.tsx';
import FieldSettingsSidebar from '@/components/UI/Form/Creation/FieldSettingsSidebar/FieldSettingsSidebar.tsx';
import { FormService } from '@/services/formService.ts';
import { useNavigate, useParams } from 'react-router';

const FormEditionPage = () => {
    const navigate = useNavigate();
    const { formId } = useParams();

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [fields, setFields] = useState<Record<string, FormField>>({});
    const [selectedFieldPosition, setSelectedFieldPosition] = useState<number | null>(null);

    const selectedField: FormField | null =
        selectedFieldPosition !== null ? fields[selectedFieldPosition] : null;

    const updateField = (position: string, updates: Partial<FormField>): void => {
        setFields((previousFields: Record<string, FormField>) => {
            const currentField: FormField | undefined = previousFields[position];

            if (!currentField) {
                return previousFields;
            }

            return { ...previousFields, [position]: { ...currentField, ...updates } };
        });
    };

    const saveFormInformation = async (): Promise<void> => {
        if (formId) {
            await FormService.updateForm(Number(formId), {
                name: name,
                description: description,
                isPrivate: isPrivate,
                fields: JSON.stringify(fields),
            }).then(() => navigate('/forms'));
        } else {
            await FormService.createForm({
                name: name,
                description: description,
                isPrivate: isPrivate,
                fields: JSON.stringify(fields),
            }).then(() => navigate('/forms'));
        }
    };

    useEffect(() => {
        const func = async () => {
            const form: Form | null = await FormService.getForm(Number(formId));

            if (form) {
                setName(form.name);
                setDescription(form.description);
                setIsPrivate(form.isPrivate);
                setFields(form.fields);
            }
        };

        if (formId) {
            func();
        }
    }, [formId]);

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
                    isPrivate={isPrivate}
                    setIsPrivate={setIsPrivate}
                    fields={fields}
                    setFields={setFields}
                    selectedFieldPosition={selectedFieldPosition}
                    setSelectedFieldPosition={setSelectedFieldPosition}
                />
                {selectedField && (
                    <FieldSettingsSidebar
                        currentField={selectedField}
                        updateField={updateField}
                        close={() => setSelectedFieldPosition(null)}
                    />
                )}
            </div>
        </main>
    );
};

export default FormEditionPage;
