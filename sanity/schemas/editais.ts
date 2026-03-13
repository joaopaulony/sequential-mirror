import { defineField, defineType } from "sanity";

export default defineType({
  name: "edital",
  title: "Edital",
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
        maxLength: 160,
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
      title: "Descrição breve",
      type: "text",
    }),
    defineField({
      name: "file",
      title: "Arquivo (PDF ou outro)",
      type: "file",
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});

