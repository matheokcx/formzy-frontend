import styles from './form-edition-section.module.css';
import type { FormField } from '@/types';
import { HandGrabbingIcon } from '@phosphor-icons/react';
import { type DragEvent, Fragment, useMemo, useRef, useState } from 'react';
import { PICKABLE_FIELD_FORMAT } from '@/components/UI/Form/Creation/DraggableField/DraggableField.tsx';
import { useTranslation } from 'react-i18next';
import RenderField from '@/components/UI/Form/Creation/RenderField/RenderField.tsx';

interface FormEditionSectionProps {
    name: string;
    setName: (name: string) => void;
    description: string;
    setDescription: (description: string) => void;
    isPrivate: boolean;
    setIsPrivate: (newValue: boolean) => void;
    fields: Record<string, FormField>;
    setFields: (newValue: Record<string, FormField>) => void;
    selectedFieldPosition: number | null;
    setSelectedFieldPosition: (position: number | null) => void;
}

const FormEditionSection = ({
    name,
    setName,
    description,
    setDescription,
    isPrivate,
    setIsPrivate,
    fields,
    setFields,
    selectedFieldPosition,
    setSelectedFieldPosition,
}: FormEditionSectionProps) => {
    const { t } = useTranslation();

    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const [dropIndex, setDropIndex] = useState<number | null>(null);

    const fieldRefs = useRef<(HTMLDivElement | null)[]>([]);
    const orderedFields: FormField[] = useMemo(
        (): FormField[] =>
            Object.values(fields).sort((a: FormField, b: FormField) => a.position - b.position),
        [fields],
    );

    const updateFieldIndexes = (nextFields: FormField[]): Record<string, FormField> => {
        return nextFields.reduce<Record<string, FormField>>(
            (record: Record<string, FormField>, field: FormField, index: number) => {
                record[index] = { ...field, position: index };
                return record;
            },
            {},
        );
    };

    const insertField = (newField: FormField, index: number): void => {
        const newVersion: FormField[] = [...orderedFields];
        newVersion.splice(index, 0, newField);
        setFields(updateFieldIndexes(newVersion));
    };

    const removeField = (position: number): void => {
        const newVersion: FormField[] = orderedFields.filter(
            (field: FormField) => field.position !== position,
        );
        setFields(updateFieldIndexes(newVersion));
        setSelectedFieldPosition(null);
    };

    const getNewFieldIndex = (positionY: number): number => {
        for (let index = 0; index < orderedFields.length; index++) {
            const element: HTMLDivElement | null = fieldRefs.current[index];

            if (!element) {
                continue;
            }

            const fieldElement: DOMRect = element.getBoundingClientRect();

            if (positionY < fieldElement.top + fieldElement.height / 2) {
                return index;
            }
        }

        return orderedFields.length;
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        setIsDragOver(true);
        setDropIndex(getNewFieldIndex(event.clientY));
    };

    const handleDragLeave = (): void => {
        setIsDragOver(false);
        setDropIndex(null);
    };

    const handleDropNewField = (event: DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        const data: string = event.dataTransfer.getData(PICKABLE_FIELD_FORMAT);
        const index: number = dropIndex ?? orderedFields.length;
        handleDragLeave();

        const { label, type } = JSON.parse(data) as FormField;
        insertField({ label: label, type: type, required: true, position: index }, index);
    };

    return (
        <div
            className={`${styles.dropZone} ${isDragOver ? styles.dropZoneActive : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDropNewField}
        >
            {orderedFields.length === 0 ? (
                <div className={styles.emptyZone}>
                    <HandGrabbingIcon size={32} />
                    <p className={styles.dropHint}>{t('forms.drop_field_here')}</p>
                </div>
            ) : (
                <>
                    <div className={styles.formInformation}>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className={styles.isPrivateInput}>
                            <h4>{t('private')}</h4>
                            <input
                                type="checkbox"
                                checked={isPrivate}
                                onChange={(e) => setIsPrivate(e.target.checked)}
                            />
                        </div>
                    </div>
                    {orderedFields.map((field: FormField, index: number) => (
                        <Fragment key={field.position}>
                            {dropIndex === index && <div className={styles.dropIndicator} />}
                            <div
                                className={styles.fieldWrapper}
                                ref={(element: HTMLDivElement | null) => {
                                    fieldRefs.current[index] = element;
                                }}
                            >
                                <RenderField
                                    field={field}
                                    removeField={removeField}
                                    isSelected={selectedFieldPosition === field.position}
                                    selectField={() => setSelectedFieldPosition(field.position)}
                                />
                            </div>
                        </Fragment>
                    ))}
                </>
            )}

            {orderedFields.length > 0 && dropIndex === orderedFields.length && (
                <div className={styles.dropIndicator} />
            )}
        </div>
    );
};

export default FormEditionSection;
