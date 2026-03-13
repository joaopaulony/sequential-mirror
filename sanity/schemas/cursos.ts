import { defineField, defineType } from "sanity";

export default defineType({
  name: "curso",
  title: "Curso",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nome do curso",
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
      name: "modalidade",
      title: "Modalidade",
      type: "string",
      options: {
        list: [
          { title: "Graduação", value: "graduacao" },
          { title: "Técnico", value: "tecnico" },
          { title: "Pós-graduação", value: "pos-graduacao" },
          { title: "Outro", value: "outro" },
        ],
      },
    }),
    defineField({
      name: "area",
      title: "Área",
      type: "string",
    }),
    defineField({
      name: "cargaHoraria",
      title: "Carga horária",
      type: "string",
    }),
    defineField({
      name: "summary",
      title: "Resumo",
      type: "text",
    }),
    defineField({
      name: "thumbnail",
      title: "Imagem de destaque",
      type: "image",
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});

