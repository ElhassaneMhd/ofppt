import { Button, DropDown } from './ui';
import { useTranslation } from 'react-i18next';
import { IoChevronDownOutline, IoChevronUpOutline, IoLanguageOutline } from 'react-icons/io5';

export function LanguageSwitcher({ size, layout,iconDirection ='down'}) {
  const { t, i18n } = useTranslation();

  return (
    <DropDown
      toggler={
        layout === 'long' ? (
          <Button size={size} display='with-icon' color='tertiary'>
            <IoLanguageOutline />
            <span className='flex-1 text-start capitalize'>{t(`header.languages.${i18n.language}`)}</span>
            {iconDirection === 'down' ? <IoChevronDownOutline /> : <IoChevronUpOutline />}
          </Button>
        ) : (
          <Button size={size} shape='icon'>
            <IoLanguageOutline />
          </Button>
        )
      }
      options={{
        className : 'w-24'
      }}
    >
      {['en', 'fr', 'ar'].map((lang) => (
        <DropDown.Option key={lang} onClick={() => i18n.changeLanguage(lang)} isCurrent={i18n.language === lang}>
          <span>{t(`header.languages.${lang}`)}</span>
        </DropDown.Option>
      ))}
    </DropDown>
  );
}
