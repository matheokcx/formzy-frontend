import styles from './field.module.css';
import { TrashIcon } from '@phosphor-icons/react';
import { type FormField } from '@/types';
import { type ReactNode, useCallback } from 'react';

interface FieldProps {
    field: FormField;
    removeField: (position: number) => void;
}

const Field = ({ field, removeField }: FieldProps) => {
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
            <h2>
                {field.position}. {field.label} {field.required && '*'}
            </h2>
            {handleFieldDisplay(field)}
            <button
                onClick={() => removeField(field.position)}
                className={styles.removeFieldButton}
            >
                <TrashIcon size={18} />
            </button>
        </div>
    );
};

export default Field;
