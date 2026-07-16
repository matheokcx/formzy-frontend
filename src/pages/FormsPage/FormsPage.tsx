import { useTranslation } from 'react-i18next';
import FormList from '@/components/UI/Form/FormList/FormList.tsx';

const FormsPage = () => {
    const { t } = useTranslation();

    return (
        <main>
            <h1>{t('forms.your_forms')}</h1>
            <FormList />
        </main>
    );
};

export default FormsPage;
