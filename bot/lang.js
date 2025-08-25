const translations = {
  ru: {
    ru: 'РУССКИЙ',
    ua: 'УКРАИНСКИЙ',
    en: 'АНГЛИЙСКИЙ',
    tr: 'ТУРЕЦКИЙ',
    de: 'НЕМЕЦКИЙ',
    es: 'ИСПАНСКИЙ',
  },
  ua: {
    ru: 'РОСІЙСЬКА',
    ua: 'УКРАЇНСЬКА',
    en: 'АНГЛІЙСЬКА',
    tr: 'ТУРЕЦЬКА',
    de: 'НІМЕЦЬКА',
    es: 'ІСПАНСЬКА',
  },
  en: {
    ru: 'RUSSIAN',
    ua: 'UKRAINIAN',
    en: 'ENGLISH',
    tr: 'TURKISH',
    de: 'GERMAN',
    es: 'SPANISH',
  },
  es: {
    ru: 'RUSO',
    ua: 'UCRANIANO',
    en: 'INGLÉS',
    tr: 'TURCO',
    de: 'ALEMÁN',
    es: 'ESPAÑOL',
  },
  tr: {
    ru: 'RUSÇA',
    ua: 'UKRAYNACA',
    en: 'İNGİLİZCE',
    tr: 'TÜRKÇE',
    de: 'ALMANCA',
    es: 'İSPANYOLCA',
  },
  de: {
    ru: 'RUSSISCH',
    ua: 'UKRAINISCH',
    en: 'ENGLISCH',
    tr: 'TÜRKISCH',
    de: 'DEUTSCH',
    es: 'SPANISCH',
  },
};

function findSelectedLang(text, language) {
  const dict = translations[language];
  if (!dict) return null;

  const entry = Object.entries(dict).find(([key, value]) => value === text);
  if (!entry) return null;

  return { key: entry[0], value: entry[1] };
}

const allLanguages = () => {
  return [
    'РУССКИЙ',
    'УКРАИНСКИЙ',
    'АНГЛИЙСКИЙ',
    'ТУРЕЦКИЙ',
    'НЕМЕЦКИЙ',
    'ИСПАНСКИЙ',

    'РОСІЙСЬКА',
    'УКРАЇНСЬКА',
    'АНГЛІЙСЬКА',
    'ТУРЕЦЬКА',
    'НІМЕЦЬКА',
    'ІСПАНСЬКА',

    'RUSSIAN',
    'UKRAINIAN',
    'ENGLISH',
    'TURKISH',
    'GERMAN',
    'SPANISH',

    'RUSO',
    'UCRANIANO',
    'INGLÉS',
    'TURCO',
    'ALEMÁN',
    'ESPAÑOL',

    'RUSÇA',
    'UKRAYNACA',
    'İNGİLİZCE',
    'TÜRKÇE',
    'ALMANCA',
    'İSPANYOLCA',

    'RUSSISCH',
    'UKRAINISCH',
    'ENGLISCH',
    'TÜRKISCH',
    'DEUTSCH',
    'SPANISCH',
  ];
};

module.exports = { findSelectedLang, allLanguages };
