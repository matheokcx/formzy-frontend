import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Form, FormField } from '@/types';
import { FormService } from '@/services/formService.ts';
import toast from 'react-hot-toast';
import { PaperPlaneTiltIcon, ProhibitIcon, WarningCircleIcon } from '@phosphor-icons/react';
import styles from './form-visualize-page.module.css';
import { FormReplyService } from '@/services/formReplyService.ts';
import { AxiosError } from 'axios';

const FormVisualizePage = () => {
    const { t } = useTranslation();
    const { formId } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState<Form | null>(null);
    const canSubmit: boolean = form !== null;

    const parseFields = (fields: unknown): Record<string, FormField> => {
        if (typeof fields !== 'string') {
            return (fields ?? {}) as Record<string, FormField>;
        }

        try {
            return JSON.parse(fields) as Record<string, FormField>;
        } catch {
            return {};
        }
    };

    const fields: FormField[] = useMemo(
        (): FormField[] =>
            Object.values(parseFields(form?.fields)).sort(
                (a: FormField, b: FormField) => a.position - b.position,
            ),
        [form],
    );

    const renderField = (field: FormField): ReactNode => {
        const id: string = `field-${field.position}`;

        if (field.type === 'textArea') {
            return <textarea id={id} required={field.required} />;
        }

        if (field.type === 'select') {
            return (
                <select id={id} required={field.required} defaultValue="1">
                    <option value="1">{t('form.select_placeholder')}</option>
                </select>
            );
        }

        return <input id={id} name={id} type={field.type} required={field.required} />;
    };

    const handleSubmit = async (data: FormData): Promise<void> => {
        try {
            const labelsByInputName: Record<string, string> = Object.fromEntries(
                fields.map((field: FormField) => [`field-${field.position}`, field.label]),
            );
            const replies: Record<string, string> = {};

            for (const [name, value] of data.entries()) {
                const label: string | undefined = labelsByInputName[name];

                if (!label || typeof value !== 'string') {
                    continue;
                }

                replies[label] = value;
            }

            await FormReplyService.createFormReply({
                formId: Number(data.get('id')),
                replies: JSON.stringify(replies),
            });
            toast.success(t("Merci d'avoir répondu au formulaire !!"));
            navigate('/');
        } catch (error: unknown) {
            toast.error(
                error instanceof AxiosError ? error?.response?.data?.message : t('form.error'),
            );
        }
    };

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const form: Form | null = await FormService.getForm(Number(formId));

                if (form) {
                    setForm(form);
                } else {
                    toast.error(t('form.not_found'));
                }
            } catch {
                toast.error(t('form.not_found'));
            }
        };

        fetchForm();
    }, [formId]);

    if (!form) {
        return (
            <main className={styles.page}>
                <div className={styles.container}>
                    <div className={`${styles.header} ${styles.emptyState}`}>
                        <WarningCircleIcon size={40} />
                        <h1>{t('form.not_found')}</h1>
                        <p>{t('form.not_found_description')}</p>
                    </div>
                </div>
            </main>
        );
    }

    if (form.isClosed) {
        return (
            <div className={styles.closedBanner}>
                <ProhibitIcon size={24} />
                <div>
                    <h3>{t('form.closed')}</h3>
                    <p>{t('form.closed_description')}</p>
                </div>
            </div>
        );
    }

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <form className={styles.form} action={handleSubmit}>
                    <header className={styles.header}>
                        <h1 className={styles.title}>{form.name}</h1>
                        {form.description && <p>{form.description}</p>}
                    </header>

                    <div className={styles.fields}>
                        {fields.map((field: FormField, index: number) => (
                            <div key={field.position} className={styles.field}>
                                <label htmlFor={`field-${field.position}`}>
                                    <span className={styles.fieldPosition}>{index + 1}. </span>
                                    <span>
                                        {field.label}
                                        {field.required && (
                                            <span className={styles.requiredStar}>*</span>
                                        )}
                                    </span>
                                </label>
                                {renderField(field)}
                            </div>
                        ))}
                        <input type="hidden" value={form.id} name="id" />
                    </div>

                    <button type="submit" className={styles.submitButton} disabled={!canSubmit}>
                        <PaperPlaneTiltIcon size={24} />
                        {t('form.submit')}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default FormVisualizePage;
