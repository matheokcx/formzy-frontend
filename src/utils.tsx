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
import type { ReactNode } from 'react';

export type FieldType = {
    icon: ReactNode;
    text: string;
    type: string;
};

export const getPickableFields = (): FieldType[] => [
    {
        icon: <TextTIcon size={20} />,
        text: 'forms.fields.short_text',
        type: 'text',
    },
    {
        icon: <TextAlignLeftIcon size={20} />,
        text: 'forms.fields.long_text',
        type: 'textArea',
    },
    {
        icon: <RadioButtonIcon size={20} />,
        text: 'forms.fields.multiple_choice',
        type: 'select',
    },
    {
        icon: <CheckSquareIcon size={20} />,
        text: 'forms.fields.checkbox',
        type: 'checkbox',
    },
    {
        icon: <CaretCircleDownIcon size={20} />,
        text: 'forms.fields.list',
        type: 'select',
    },
    {
        icon: <HashIcon size={20} />,
        text: 'forms.fields.number',
        type: 'number',
    },
    {
        icon: <EnvelopeSimpleIcon size={20} />,
        text: 'forms.fields.email',
        type: 'email',
    },
    {
        icon: <CalendarIcon size={20} />,
        text: 'forms.fields.date',
        type: 'date',
    },
    {
        icon: <UploadSimpleIcon size={20} />,
        text: 'forms.fields.upload',
        type: 'file',
    },
];
