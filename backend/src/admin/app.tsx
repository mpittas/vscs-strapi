import type { StrapiApp } from '@strapi/strapi/admin';

const blogPostTranslations = {
  title: {
    bg: 'Заглавие',
    en: 'Title',
  },
  slug: {
    bg: 'URL адрес',
    en: 'URL address',
  },
  content: {
    bg: 'Съдържание',
    en: 'Content',
  },
  featuredImage: {
    bg: 'Основно изображение',
    en: 'Featured image',
  },
  category: {
    bg: 'Категория',
    en: 'Category',
  },
};

const projectTranslations = {
  title: {
    bg: 'Заглавие',
    en: 'Title',
  },
  slug: {
    bg: 'URL адрес',
    en: 'URL address',
  },
  location: {
    bg: 'Локация',
    en: 'Location',
  },
  client: {
    bg: 'Клиент',
    en: 'Client',
  },
  year: {
    bg: 'Година',
    en: 'Year',
  },
  content: {
    bg: 'Съдържание',
    en: 'Content',
  },
  featuredImage: {
    bg: 'Основно изображение',
    en: 'Featured image',
  },
  gallery: {
    bg: 'Галерия',
    en: 'Gallery',
  },
  energy: {
    bg: 'Мощност',
    en: 'Capacity',
  },
  services: {
    bg: 'Услуги',
    en: 'Services',
  },
};

const careerTranslations = {
  title: {
    bg: 'Заглавие',
    en: 'Title',
  },
  slug: {
    bg: 'URL адрес',
    en: 'URL address',
  },
  location: {
    bg: 'Локация',
    en: 'Location',
  },
  main_content: {
    bg: 'Основно съдържание',
    en: 'Main content',
  },
  sidebar_info: {
    bg: 'Странична информация',
    en: 'Sidebar info',
  },
};

const createFieldTranslations = (
  contentTypeUid: string,
  translations: Record<string, { bg: string; en: string }>,
  locale: 'bg' | 'en'
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
    },
  },
  bootstrap(app: StrapiApp) {
    void app;
  },
};
