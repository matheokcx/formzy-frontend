import type { Field } from '@/components/UI/Form/Creation/PickableFields.tsx';
import styles from './pickable-field.module.css';

type PickableFieldProps = {
    field: Field;
};

const PickableField = ({ field }: PickableFieldProps) => {
    return (
        <div className={styles.field}>
            {field.icon}
            <p>{field.text}</p>
        </div>
    );
};

export default PickableField;
