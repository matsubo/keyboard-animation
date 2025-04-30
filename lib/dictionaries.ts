import 'server-only' // Ensure this runs only on the server

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  ja: () => import('../dictionaries/ja.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
  // Ensure locale is a valid key, fallback to 'en'
  const validLocale = locale in dictionaries ? locale as keyof typeof dictionaries : 'en';
  const loader = dictionaries[validLocale];
  return loader();
}

// Define the type for the dictionary based on the return type of getDictionary
export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
