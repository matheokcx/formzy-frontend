import styles from './form-edition-section.module.css';
import type { FormField } from '@/types';
import { HandGrabbingIcon } from '@phosphor-icons/react';
import { type DragEvent, useState } from 'react';
import { PICKABLE_FIELD_FORMAT } from '@/components/UI/Form/Creation/DraggableField/DraggableField.tsx';
import { useTranslation } from 'react-i18next';
import RenderField from '@/components/UI/Form/Creation/RenderField/RenderField.tsx';

interface FormEditionSectionProps {
    name: string;
    setName: (name: string) => void;
    description: string;
    setDescription: (description: string) => void;
    fields: FormField[];
    setFields: (newValue: FormField[]) => void;
    isPrivate: boolean;
    setIsPrivate: (isPrivate: boolean) => void;
}

const FormEditionSection = ({
    name,
    setName,
    description,
    setDescription,
    fields,
    setFields,
    isPrivate,
    setIsPrivate,
}: FormEditionSectionProps) => {
    const { t } = useTranslation();

    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    const addField = (newField: FormField): void => {
        setFields([...fields, newField]);
    };

    const removeField = (position: number): void => {
        setFields(fields.filter((field: FormField) => field.position !== position));
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
        if (!event.dataTransfer.types.includes(PICKABLE_FIELD_FORMAT)) {
            return;
        }

        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        setIsDragOver(true);
    };

    const handleDragLeave = (): void => {
        setIsDragOver(false);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        setIsDragOver(false);
        const data: string = event.dataTransfer.getData(PICKABLE_FIELD_FORMAT);

        if (!data) {
            return;
        }

        const { label, type } = JSON.parse(data) as FormField;
        addField({ label: label, type: type, required: true, position: fields.length + 1 });
    };

    return (
        <div
            className={`${styles.dropZone} ${isDragOver ? styles.dropZoneActive : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className={styles.formInformation}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            {fields.length === 0 ? (
                <div className={styles.emptyZone}>
                    <HandGrabbingIcon size={32} />
                    <p className={styles.dropHint}>{t('forms.drop_field_here')}</p>
                </div>
            ) : (
                fields.map((field: FormField) => (
                    <RenderField key={field.position} field={field} removeField={removeField} />
                ))
            )}
        </div>
    );
};

export default FormEditionSection;
