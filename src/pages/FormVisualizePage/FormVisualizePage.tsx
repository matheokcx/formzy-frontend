import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useEffect, useState, type ReactNode } from 'react';
import type { Form, FormField } from '@/types';
import { FormService } from '@/services/formService.ts';
import toast from 'react-hot-toast';
import { PaperPlaneTiltIcon, ProhibitIcon, WarningCircleIcon } from '@phosphor-icons/react';
import styles from './form-visualize-page.module.css';
import { FormReplyService } from '@/services/formReplyService.ts';

const FormVisualizePage = () => {
    const { t } = useTranslation();
    const { formId } = useParams();

    const [form, setForm] = useState<Form | null>(null);
    const canSubmit: boolean = form !== null;

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
        console.log(data);

        try {
            const replies: Record<string, string | number> = {};
            for (const f in data) {
                replies[f[0]] = f[1];
            }
            await FormReplyService.createFormReply(replies, data.get('id') as string);
            toast.error(t("Merci d'avoir répondu au formulaire !!"));
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : t('form.error'));
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

    const fields: FormField[] = Object.values(form.fields).sort(
        (a: FormField, b: FormField) => a.position - b.position,
    );

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
