import styles from './field-settings-sidebar.module.css';
import type { FormField } from '@/types';
import { XIcon } from '@phosphor-icons/react';
import { type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { type FieldType, getPickableFields } from '@/utils.tsx';

interface FieldEditionSidebarProps {
    currentField: FormField;
    updateField: (position: string, updates: Partial<FormField>) => void;
    close: () => void;
}

const FieldSettingsSidebar = ({ currentField, updateField, close }: FieldEditionSidebarProps) => {
    const { t } = useTranslation();

    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <h2>{t('forms.field_settings')}</h2>
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={close}
                    aria-label={t('forms.close')}
                >
                    <XIcon size={18} />
                </button>
            </div>

            <label className={styles.field}>
                <span>{t('forms.field_type')}</span>
                <select
                    value={currentField.type}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                        updateField(currentField.position.toString(), { type: event.target.value })
                    }
                >
                    {getPickableFields().map((fieldType: FieldType) => (
                        <option key={fieldType.type} value={fieldType.type}>
                            {t(fieldType.text)}
                        </option>
                    ))}
                </select>
            </label>

            <label className={styles.field}>
                <span>{t('forms.field_label')}</span>
                <input
                    type="text"
                    value={currentField.label}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        updateField(currentField.position.toString(), { label: event.target.value })
                    }
                />
            </label>

            <div className={styles.requiredCheckbox}>
                <label>{t('required')}</label>
                <input
                    type="checkbox"
                    checked={currentField.required}
                    onChange={(event) =>
                        updateField(currentField.position.toString(), {
                            required: event.target.checked,
                        })
                    }
                    id="required-checkbox"
                />
            </div>
        </div>
    );
};

export default FieldSettingsSidebar;
