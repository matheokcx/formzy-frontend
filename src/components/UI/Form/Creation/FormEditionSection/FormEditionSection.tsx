import styles from './form-edition-section.module.css';
import type { FormField } from '@/types';
import { HandGrabbingIcon } from '@phosphor-icons/react';
import { type DragEvent, Fragment, useRef, useState } from 'react';
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
}

const FormEditionSection = ({
    name,
    setName,
    description,
    setDescription,
    fields,
    setFields,
}: FormEditionSectionProps) => {
    const { t } = useTranslation();

    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const [dropIndex, setDropIndex] = useState<number | null>(null);
    const fieldRefs = useRef<(HTMLDivElement | null)[]>([]);

    const reindex = (nextFields: FormField[]): FormField[] =>
        nextFields.map((field: FormField, index: number) => ({ ...field, position: index + 1 }));

    const insertFieldAt = (newField: FormField, index: number): void => {
        const nextFields: FormField[] = [...fields];
        nextFields.splice(index, 0, newField);
        setFields(reindex(nextFields));
    };

    const removeField = (position: number): void => {
        setFields(reindex(fields.filter((field: FormField) => field.position !== position)));
    };

    const computeDropIndex = (clientY: number): number => {
        for (let index = 0; index < fields.length; index++) {
            const element: HTMLDivElement | null = fieldRefs.current[index];

            if (!element) {
                continue;
            }

            const rect: DOMRect = element.getBoundingClientRect();

            if (clientY < rect.top + rect.height / 2) {
                return index;
            }
        }

        return fields.length;
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
        if (!event.dataTransfer.types.includes(PICKABLE_FIELD_FORMAT)) {
            return;
        }

        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        setIsDragOver(true);
        setDropIndex(computeDropIndex(event.clientY));
    };

    const handleDragLeave = (event: DragEvent<HTMLDivElement>): void => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
            return;
        }

        setIsDragOver(false);
        setDropIndex(null);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        const data: string = event.dataTransfer.getData(PICKABLE_FIELD_FORMAT);
        const index: number = dropIndex ?? fields.length;

        setIsDragOver(false);
        setDropIndex(null);

        if (!data) {
            return;
        }

        const { label, type } = JSON.parse(data) as FormField;
        insertFieldAt({ label: label, type: type, required: true, position: index + 1 }, index);
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
                fields.map((field: FormField, index: number) => (
                    <Fragment key={field.position}>
                        {/* Fragment = <></> */}
                        {dropIndex === index && <div className={styles.dropIndicator} />}
                        <div
                            className={styles.fieldWrapper}
                            ref={(element: HTMLDivElement | null) => {
                                fieldRefs.current[index] = element;
                            }}
                        >
                            <RenderField field={field} removeField={removeField} />
                        </div>
                    </Fragment>
                ))
            )}

            {fields.length > 0 && dropIndex === fields.length && (
                <div className={styles.dropIndicator} />
            )}
        </div>
    );
};

export default FormEditionSection;
