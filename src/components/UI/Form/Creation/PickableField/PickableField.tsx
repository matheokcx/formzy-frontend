import type { DragEvent } from 'react';
import type { Field } from '@/components/UI/Form/Creation/PickableFields/PickableFields.tsx';
import styles from './pickable-field.module.css';

export const PICKABLE_FIELD_FORMAT = 'application/formzy-field'; // MIME type custom

type PickableFieldProps = {
    field: Field;
};

const PickableField = ({ field }: PickableFieldProps) => {
    const handleDragStart = (event: DragEvent<HTMLDivElement>): void => {
        event.dataTransfer.setData(
            PICKABLE_FIELD_FORMAT,
            JSON.stringify({ label: field.text, type: field.type }),
        );
        event.dataTransfer.effectAllowed = 'copy';
    };

    return (
        <div className={styles.field} draggable onDragStart={handleDragStart}>
            {field.icon}
            <p>{field.text}</p>
        </div>
    );
};

export default PickableField;
