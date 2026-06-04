import type { Core } from '@strapi/strapi';

const PROJECT_CM_KEY =
  'plugin_content_manager_configuration_content_types::api::project.project';

const PROJECT_EDIT_LAYOUT = [
  [
    { name: 'title', size: 6 },
    { name: 'slug', size: 6 },
  ],
  [
    { name: 'excerpt', size: 6 },
    { name: 'category', size: 6 },
  ],
  [
    { name: 'location', size: 6 },
    { name: 'energy', size: 6 },
  ],
  [
    { name: 'projectStatus', size: 6 },
    { name: 'year', size: 6 },
  ],
  [
    { name: 'country', size: 6 },
    { name: 'services', size: 6 },
  ],
  [{ name: 'client', size: 12 }],
  [{ name: 'content', size: 12 }],
  [
    { name: 'featuredImage', size: 6 },
    { name: 'gallery', size: 6 },
  ],
];

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const view = await strapi.db.query('strapi::core-store').findOne({
      where: { key: PROJECT_CM_KEY },
    });

    if (!view?.value) return;

    const config = JSON.parse(view.value as string);
    if (!config.metadatas) config.metadatas = {};
    if (!config.metadatas.client) {
      config.metadatas.client = { edit: {}, list: {} };
    }

    config.metadatas.client.edit = {
      ...config.metadatas.client.edit,
      label: 'Клиент',
    };
    config.metadatas.client.list = {
      ...config.metadatas.client.list,
      label: 'Клиент',
    };

    if (!config.layouts) config.layouts = {};
    config.layouts.edit = PROJECT_EDIT_LAYOUT;

    await strapi.db.query('strapi::core-store').update({
      where: { id: view.id },
      data: { value: JSON.stringify(config) },
    });
  },
};
