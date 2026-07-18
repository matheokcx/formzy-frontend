import { useTranslation } from 'react-i18next';
import { type ReactNode, useMemo } from 'react';
import {
    CalendarIcon,
    CaretCircleDownIcon,
    CheckSquareIcon,
    EnvelopeSimpleIcon,
    HashIcon,
    RadioButtonIcon,
    TextAlignLeftIcon,
    TextTIcon,
    UploadSimpleIcon,
} from '@phosphor-icons/react';
import PickableField from '@/components/UI/Form/Creation/PickableField.tsx';
import styles from './pickable-fields.module.css';

export type Field = {
    icon: ReactNode;
    text: string;
    type: string;
};

const PickableFields = () => {
    const { t } = useTranslation();
    const fields: Field[] = useMemo(
        (): Field[] => [
            {
                icon: <TextTIcon size={20} />,
                text: t('forms.fields.short_text'),
                type: 'text',
            },
            {
                icon: <TextAlignLeftIcon size={20} />,
                text: t('forms.fields.long_text'),
                type: 'textArea',
            },
            {
                icon: <RadioButtonIcon size={20} />,
                text: t('forms.fields.multiple_choice'),
                type: 'select',
            },
            {
                icon: <CheckSquareIcon size={20} />,
                text: t('forms.fields.checkbox'),
                type: 'checkbox',
            },
            {
                icon: <CaretCircleDownIcon size={20} />,
                text: t('forms.fields.list'),
                type: 'select',
            },
            {
                icon: <HashIcon size={20} />,
                text: t('forms.fields.number'),
                type: 'number',
            },
            {
                icon: <EnvelopeSimpleIcon size={20} />,
                text: t('forms.fields.email'),
                type: 'email',
            },
            {
                icon: <CalendarIcon size={20} />,
                text: t('forms.fields.date'),
                type: 'date',
            },
            {
                icon: <UploadSimpleIcon size={20} />,
                text: t('forms.fields.upload'),
                type: 'file',
            },
        ],
        [t],
    );

    return (
        <aside className={styles.sidebar}>
            <p>{t('forms.add_field').toUpperCase()}</p>
            <div className={styles.fields}>
                {fields.map((field: Field) => (
                    <PickableField key={field.text} field={field} />
                ))}
            </div>
        </aside>
    );
};

export default PickableFields;
