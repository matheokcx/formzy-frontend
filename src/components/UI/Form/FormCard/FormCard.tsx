import type { Form } from '@/types';
import styles from './form-card.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    DotsThreeVerticalIcon,
    EyeIcon,
    ListChecksIcon,
    LockSimpleOpenIcon,
    PencilSimpleIcon,
    ProhibitIcon,
    TrashIcon,
    UsersThreeIcon,
} from '@phosphor-icons/react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { FormService } from '@/services/formService.ts';

type FormCardProps = {
    form: Form;
    onFormUpdated: (form: Form) => void;
    onFormDeleted: (formId: number) => void;
};

const FormCard = ({ form, onFormUpdated, onFormDeleted }: FormCardProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const actionButtonsElement = useRef<HTMLDivElement>(null);

    const [areActionsVisible, setAreActionsVisible] = useState<boolean>(false);

    const handleFormStatus = useCallback((): string => {
        if (form.isPrivate) {
            return t('forms.status.private');
        }

        if (form.isClosed) {
            return t('forms.status.closed');
        }

        return t('forms.status.open');
    }, [form, t]);

    const handleFormStatusColor = useCallback(() => {
        if (form.isPrivate) {
            return '#e34b4b';
        }

        if (form.isClosed) {
            return '#1A1A1A';
        }

        return '#28cd19';
    }, [form]);

    const handleActionsDropdown = useCallback((): void => {
        setAreActionsVisible((areVisible) => !areVisible);
    }, []);

    const handleCloseActions = useCallback((): void => {
        setAreActionsVisible(false);
    }, []);

    const handleToggleClosing = async (): Promise<void> => {
        try {
            const updatedForm: Form = await FormService.updateForm(form.id, {
                isClosed: !form.isClosed,
            });

            onFormUpdated({ ...form, ...updatedForm });
            toast.success(form.isClosed ? t('actions.form_reopened') : t('actions.form_closed'));
            handleCloseActions();
        } catch {
            toast.error(t('actions.error'));
        }
    };

    const handleDelete = async (): Promise<void> => {
        try {
            await FormService.deleteForm(form.id);
            onFormDeleted(form.id);
            toast.success(t('actions.form_deleted'));
            handleCloseActions();
        } catch {
            toast.error(t('actions.error'));
        }
    };

    useEffect(() => {
        if (!areActionsVisible) {
            return;
        }

        const handleClickOutside = (event: MouseEvent): void => {
            if (!actionButtonsElement.current?.contains(event.target as Node)) {
                handleCloseActions();
            }
        };
        const handleEscape = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                handleCloseActions();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [areActionsVisible, handleCloseActions]);

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span
                    className={styles.statusChip}
                    style={{ backgroundColor: handleFormStatusColor() }}
                >
                    {handleFormStatus()}
                </span>

                <div className={styles.menu} ref={actionButtonsElement}>
                    <button
                        type="button"
                        className={styles.menuButton}
                        onClick={handleActionsDropdown}
                        aria-label={t('actions.menu_label')}
                        aria-haspopup="menu"
                        aria-expanded={areActionsVisible}
                    >
                        <DotsThreeVerticalIcon size={22} />
                    </button>

                    {areActionsVisible && (
                        <div className={styles.actions} role="menu">
                            <button
                                type="button"
                                role="menuitem"
                                className={styles.actionButton}
                                onClick={() => navigate(`/forms/${form.id}`)}
                            >
                                <EyeIcon size={18} />
                                {t('actions.visualize')}
                            </button>
                            <button
                                type="button"
                                role="menuitem"
                                className={styles.actionButton}
                                onClick={() => navigate(`/forms/${form.id}/update`)}
                            >
                                <PencilSimpleIcon size={18} />
                                {t('actions.edit')}
                            </button>
                            <button
                                type="button"
                                role="menuitem"
                                className={styles.actionButton}
                                onClick={() => handleToggleClosing()}
                            >
                                {form.isClosed ? (
                                    <LockSimpleOpenIcon size={18} />
                                ) : (
                                    <ProhibitIcon size={18} />
                                )}
                                {form.isClosed ? t('actions.reopen') : t('actions.close')}
                            </button>
                            <button
                                type="button"
                                role="menuitem"
                                className={`${styles.actionButton} ${styles.dangerButton}`}
                                onClick={() => handleDelete()}
                            >
                                <TrashIcon size={18} />
                                {t('actions.delete')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <h2>{form.name}</h2>
            <div className={styles.footer}>
                <div>
                    <ListChecksIcon size={24} />
                    <p>{t('questionWithCount', { count: Object.keys(form.fields).length })}</p>
                </div>
                <div>
                    <UsersThreeIcon size={24} />
                    <p>{t('replyWithCount', { count: form?.formReplies?.length ?? 0 })}</p>
                </div>
            </div>
        </div>
    );
};

export default FormCard;
