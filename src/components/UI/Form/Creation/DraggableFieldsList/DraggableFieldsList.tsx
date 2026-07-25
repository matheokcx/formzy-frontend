import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import DraggableField from '@/components/UI/Form/Creation/DraggableField/DraggableField.tsx';
import styles from './draggable-fields-list.module.css';
import { type FieldType, getPickableFields } from '@/utils.tsx';

const DraggableFieldsList = () => {
    const { t } = useTranslation();
    const fields: FieldType[] = useMemo((): FieldType[] => getPickableFields(), []);

    return (
        <aside className={styles.sidebar}>
            <p>{t('forms.add_field').toUpperCase()}</p>
            <div className={styles.fields}>
                {fields.map((field: FieldType) => (
                    <DraggableField key={field.text} field={field} />
                ))}
            </div>
        </aside>
    );
};

export default DraggableFieldsList;
