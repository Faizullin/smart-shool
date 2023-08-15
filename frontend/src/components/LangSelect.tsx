import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import Icon from '@mdi/react';
import * as React from 'react';
import LangConfig, { Lang } from '../lang/LangConfig';

export interface ILangSelectProps {
}


const langLabels = {
  'kk': 'Қазақша',
  'en': 'English',
  'ru': 'Русский',
}

export default function LangSelect(_: ILangSelectProps) {
  const [lang, setLang] = React.useState<Lang>("en")
  const [openDropdown, setOpenDropdown] = React.useState<boolean>(false);

  const handleLangChange = (event: any, val: Lang) => {
    event.preventDefault()
    setLang(val)
    new LangConfig().setLang(val)
    window.location.reload()
  }
  React.useEffect(() => {
    const dLang = new LangConfig().getLang()
    setLang(dLang)
  }, [])

  return (
    <li className="dropdown">
      <a onClick={e => {
        e.preventDefault()
        setOpenDropdown(openDropdown => !openDropdown)
      }} className={openDropdown ? 'active' : ''}>
        <span>{langLabels[lang]}</span>
        {openDropdown ? (
          <Icon path={mdiChevronDown} className="h-5 w-5 md:hidden" />
        ) : (
          <Icon path={mdiChevronUp} className="h-5 w-5 md:hidden" />
        )}
      </a>
      <ul className={openDropdown ? 'dropdown-active' : ''}>
      {
          Object.keys(langLabels).map((lang, index) => {
            const langKey = lang as Lang
            return (
              <li key={index}>
                <a onClick={(e) => handleLangChange(e, langKey)} href='#'>
                  {langLabels[langKey]}
                </a>
              </li>
            )
          })
        }
      </ul>
    </li>
  );
}
