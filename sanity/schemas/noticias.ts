import { defineField, defineType } from "sanity";

export default defineType({
  name: "noticia",
  title: "Notícia",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 120,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Data",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Resumo",
      type: "text",
    }),
    defineField({
      name: "thumbnail",
      title: "Imagem de capa",
      type: "image",
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  orderings: [
    {
      title: "Mais recentes",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});

