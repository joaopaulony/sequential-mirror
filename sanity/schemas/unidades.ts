import { defineField, defineType } from "sanity";

export default defineType({
  name: "unidade",
  title: "Unidade",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nome",
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
      name: "tipo",
      title: "Tipo",
      type: "string",
      options: {
        list: [
          { title: "Faculdade", value: "faculdade" },
          { title: "Escola técnica", value: "escola-tecnica" },
          { title: "Polo", value: "polo" },
        ],
      },
    }),
    defineField({
      name: "bairro",
      title: "Bairro",
      type: "string",
    }),
    defineField({
      name: "municipio",
      title: "Município",
      type: "string",
    }),
    defineField({
      name: "endereco",
      title: "Endereço",
      type: "string",
    }),
    defineField({
      name: "telefone",
      title: "Telefone",
      type: "string",
    }),
    defineField({
      name: "thumbnail",
      title: "Imagem principal",
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

