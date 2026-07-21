import styles from './render-field.module.css';
import { TrashIcon } from '@phosphor-icons/react';
import { type FormField } from '@/types';
import { type ReactNode, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getPickableFields, type FieldType } from '@/utils.tsx';

interface FieldProps {
    field: FormField;
    removeField: (position: number) => void;
}

const RenderField = ({ field, removeField }: FieldProps) => {
    const { t } = useTranslation();
    const fields: FieldType[] = useMemo((): FieldType[] => getPickableFields(), []);

    const handleFieldDisplay = useCallback((field: FormField): ReactNode => {
        if (field.type === 'select') {
            return (
                <>
                    <select>
                        <option>Choix 1</option>
                        <option>Choix 2</option>
                        <option>Choix 3</option>
                    </select>
                </>
            );
        }

        if (field.type === 'textArea') {
            return <textarea></textarea>;
        }

        return <input type={field.type} />;
    }, []);

    return (
        <div className={styles.fieldCard}>
            <div className={styles.header}>
                <div className={styles.typeChip}>
                    {fields.find((f: FieldType) => f.type === field.type)?.icon}
                    {t(`forms.fields.${field.type}`)}
                </div>
                <button
                    onClick={() => removeField(field.position)}
                    className={styles.removeFieldButton}
                >
                    <TrashIcon size={18} />
                </button>
            </div>

            <h2>
                {field.position}. {field.label}{' '}
                <span style={{ color: '#dc6627' }}>{field.required && '*'}</span>
            </h2>
            {handleFieldDisplay(field)}
        </div>
    );
};

export default RenderField;
