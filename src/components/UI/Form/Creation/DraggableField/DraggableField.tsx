import type { DragEvent } from 'react';
import styles from './draggable-field.module.css';
import { useTranslation } from 'react-i18next';
import type { FieldType } from '@/utils.tsx';

export const PICKABLE_FIELD_FORMAT = 'application/formzy-field'; // MIME type custom

type PickableFieldProps = {
    field: FieldType;
};

const DraggableField = ({ field }: PickableFieldProps) => {
    const { t } = useTranslation();

    const handleDragStart = (event: DragEvent<HTMLDivElement>): void => {
        event.dataTransfer.setData(
            PICKABLE_FIELD_FORMAT,
            JSON.stringify({ label: t(field.text), type: field.type }),
        );
        event.dataTransfer.effectAllowed = 'copy';
    };

    return (
        <div className={styles.field} draggable onDragStart={handleDragStart}>
            {field.icon}
            <p>{t(field.text)}</p>
        </div>
    );
};

export default DraggableField;
