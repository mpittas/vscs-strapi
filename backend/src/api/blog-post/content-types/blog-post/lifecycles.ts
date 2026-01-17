import slugify from "slugify";

export default {
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.title) {
      data.slug = slugify(data.title, { lower: true, locale: "bg" });
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    if (data.title) {
      data.slug = slugify(data.title, { lower: true, locale: "bg" });
    }
  },
};
