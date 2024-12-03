import LangConfig, { TLang } from "@/lang/LangConfig";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";

const langLabels = {
  kk: "Қазақша",
  en: "English",
  ru: "Русский",
};

export default function LangSelect() {
  const [lang, setLang] = React.useState<TLang>("en");
  const [openDropdown, setOpenDropdown] = React.useState<boolean>(false);

  const handleLangChange = (event: any, val: TLang) => {
    event.preventDefault();
    setLang(val);
    LangConfig.setLang(val);
    window.location.reload();
  };
  React.useEffect(() => {
    const dLang = LangConfig.getLang();
    setLang(dLang);
  }, []);

  return (
    <li className="dropdown">
      <a
        onClick={(e) => {
          e.preventDefault();
          setOpenDropdown((openDropdown) => !openDropdown);
        }}
        className={openDropdown ? "active" : ""}
      >
        <span>{langLabels[lang]}</span>
        {openDropdown ? (
          <Icon path={mdiChevronDown} size={1} />
        ) : (
          <Icon path={mdiChevronUp} size={1} />
        )}
      </a>
      <ul className={openDropdown ? "dropdown-active" : ""}>
        {Object.keys(langLabels).map((lang, index) => {
          const langKey = lang as TLang;
          return (
            <li key={index}>
              <a onClick={(e) => handleLangChange(e, langKey)} href="#">
                {langLabels[langKey]}
              </a>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
