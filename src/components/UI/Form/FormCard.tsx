import type { Form } from '@/types';

type FormCardProps = {
    form: Form;
};

const FormCard = ({ form }: FormCardProps) => {
    return (
        <div style={{ backgroundColor: 'var(--background)' }}>
            <h3>{form.name}</h3>
            <p>{form.description}</p>
        </div>
    );
};

export default FormCard;
