import English from '../lang/en.json';
import Kazakh from '../lang/kk.json';
import Russian from '../lang/ru.json';

export type Lang = 'en' | 'kk' | 'ru'
const messages = {
    'en': English,
    'kk': Kazakh,
    'ru': Russian,
};

export default class LangConfig {
    getLang(): Lang {
        const dLang = localStorage.getItem('lang') || 'en'
        return dLang as Lang
    }
    setLang(dLang: string) {
        if (Object.keys(messages).includes(dLang)) {
            localStorage.setItem('lang', dLang)
        }
    }
    getLangConfig() {
        const lang = this.getLang()
        return { lang, messages: messages[lang] }
    }
}