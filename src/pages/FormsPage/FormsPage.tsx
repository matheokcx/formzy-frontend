import { useTranslation } from 'react-i18next';
import FormList from '@/components/UI/Form/FormList.tsx';

const FormsPage = () => {
    const { t } = useTranslation();

    return (
        <main>
            <h2>{t('forms.your_forms')}</h2>
            <FormList />
        </main>
    );
};

export default FormsPage;
