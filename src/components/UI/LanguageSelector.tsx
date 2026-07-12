import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import toast from 'react-hot-toast';

const LanguageSelector = () => {
    const { t } = useTranslation();
    const languages: string[] = ['en', 'fr'];
    const currentLanguage: string = localStorage.getItem('i18nextLng') ?? 'fr';

    const handleChangeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        toast.success(i18n.t('languages.change_lang_message'));
    };

    return (
        <select
            onChange={(event) => handleChangeLanguage(event.target.value)}
            defaultValue={currentLanguage}
        >
            {languages.map((language: string) => (
                <option key={language} value={language}>
                    {t(`languages.${language}`)}
                </option>
            ))}
        </select>
    );
};

export default LanguageSelector;
