import styles from './form-creation-header.module.css';
import {
    ArrowClockwiseIcon,
    ArrowCounterClockwiseIcon,
    ArrowLeftIcon,
    EyeIcon,
    FloppyDiskIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { FormService } from '@/services/formService.ts';
import type { FormField } from '@/types';
import { useState } from 'react';

type FormCreationHeaderProps = {
    description: string;
    isPrivate: boolean;
    fields: FormField[];
};

const FormCreationHeader = ({ description, isPrivate, fields }: FormCreationHeaderProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [name, setName] = useState<string>('');

    const saveFormInformation = async (): Promise<void> => {
        console.log(fields);
        await FormService.createForm({
            name: name,
            description: description,
            isPrivate: isPrivate,
            //fields: fields,
            fields: {} as never,
        }).then(() => navigate('/forms'));
    };

    return (
        <div className={styles.header}>
            <div className={styles.leftHeader}>
                <button onClick={() => navigate('/forms')} className={styles.backButton}>
                    <ArrowLeftIcon size={24} />
                </button>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nom du formulaire"
                    className={styles.nameInput}
                />
            </div>
            <div>
                <button className={styles.moveActionButton}>
                    <ArrowCounterClockwiseIcon size={20} />
                </button>
                <button className={styles.moveActionButton}>
                    <ArrowClockwiseIcon size={20} />
                </button>
                <button className={styles.glimpseButton}>
                    <EyeIcon size={16} />
                    {t('glimpse')}
                </button>
                <button onClick={saveFormInformation} className={styles.saveButton}>
                    <FloppyDiskIcon size={16} />
                    {t('save')}
                </button>
            </div>
        </div>
    );
};

export default FormCreationHeader;
