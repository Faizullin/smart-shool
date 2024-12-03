import English from "./en.json";
import Kazakh from "./kk.json";
import Russian from "./ru.json";

export type TLang = "en" | "kk" | "ru";
const messages = {
  en: English,
  kk: Kazakh,
  ru: Russian,
};

export interface ILangOption {
  code: TLang;
  name: string;
}

export default class LangConfig {
  static getLang(): TLang {
    const dLang = localStorage.getItem("lang") || "en";
    return dLang as TLang;
  }
  static setLang(dLang: string) {
    if (Object.keys(messages).includes(dLang)) {
      localStorage.setItem("lang", dLang);
    }
  }
  static getLangConfig() {
    const lang = this.getLang();
    return { lang, messages: messages[lang] };
  }
}
