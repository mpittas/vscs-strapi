import type { StrapiApp } from '@strapi/strapi/admin';

const blogPostTranslations = {
  title: {
    bg: 'Заглавие',
    en: 'Title',
    fr: 'Titre',
  },
  slug: {
    bg: 'URL адрес',
    en: 'URL address',
    fr: 'Adresse URL',
  },
  content: {
    bg: 'Съдържание',
    en: 'Content',
    fr: 'Contenu',
  },
  featuredImage: {
    bg: 'Основно изображение',
    en: 'Featured image',
    fr: 'Image mise en avant',
  },
  category: {
    bg: 'Категория',
    en: 'Category',
    fr: 'Catégorie',
  },
};

const projectTranslations = {
  title: {
    bg: 'Заглавие',
    en: 'Title',
    fr: 'Titre',
  },
  slug: {
    bg: 'URL адрес',
    en: 'URL address',
    fr: 'Adresse URL',
  },
  location: {
    bg: 'Локация',
    en: 'Location',
    fr: 'Emplacement',
  },
  client: {
    bg: 'Клиент',
    en: 'Client',
    fr: 'Client',
  },
  year: {
    bg: 'Година',
    en: 'Year',
    fr: 'Année',
  },
  content: {
    bg: 'Съдържание',
    en: 'Content',
    fr: 'Contenu',
  },
  featuredImage: {
    bg: 'Основно изображение',
    en: 'Featured image',
    fr: 'Image mise en avant',
  },
  gallery: {
    bg: 'Галерия',
    en: 'Gallery',
    fr: 'Galerie',
  },
  energy: {
    bg: 'Мощност',
    en: 'Capacity',
    fr: 'Capacité',
  },
  services: {
    bg: 'Услуги',
    en: 'Services',
    fr: 'Services',
  },
};

const careerTranslations = {
  title: {
    bg: 'Заглавие',
    en: 'Title',
    fr: 'Titre',
  },
  slug: {
    bg: 'URL адрес',
    en: 'URL address',
    fr: 'Adresse URL',
  },
  location: {
    bg: 'Локация',
    en: 'Location',
    fr: 'Emplacement',
  },
  main_content: {
    bg: 'Основно съдържание',
    en: 'Main content',
    fr: 'Contenu principal',
  },
  sidebar_info: {
    bg: 'Странична информация',
    en: 'Sidebar info',
    fr: 'Infos de la barre latérale',
  },
};

const createFieldTranslations = (
  contentTypeUid: string,
  translations: Record<string, { bg: string; en: string; fr: string }>,
  locale: 'bg' | 'en' | 'fr'
) =>
  Object.fromEntries(
    Object.entries(translations).map(([fieldName, labels]) => [
      `content-manager.content-types.${contentTypeUid}.${fieldName}`,
      labels[locale],
    ])
  );

export default {
  config: {
    locales: ['bg'],
    translations: {
      bg: {
        'Blog Post': 'Блог публикация',
        'Проект': 'Проект',
        'Кариера': 'Кариера',
        ...createFieldTranslations('api::blog-post.blog-post', blogPostTranslations, 'bg'),
        ...createFieldTranslations('api::project.project', projectTranslations, 'bg'),
        ...createFieldTranslations('api::career.career', careerTranslations, 'bg'),
      },
      en: {
        'Blog Post': 'Blog Post',
        'Проект': 'Project',
        'Кариера': 'Career',
        ...createFieldTranslations('api::blog-post.blog-post', blogPostTranslations, 'en'),
        ...createFieldTranslations('api::project.project', projectTranslations, 'en'),
        ...createFieldTranslations('api::career.career', careerTranslations, 'en'),
      },
      fr: {
        'Blog Post': 'Article de Blog',
        'Проект': 'Projet',
        'Кариера': 'Carrière',
        ...createFieldTranslations('api::blog-post.blog-post', blogPostTranslations, 'fr'),
        ...createFieldTranslations('api::project.project', projectTranslations, 'fr'),
        ...createFieldTranslations('api::career.career', careerTranslations, 'fr'),
      },
    },
  },
  bootstrap(app: StrapiApp) {
    void app;
  },
};
