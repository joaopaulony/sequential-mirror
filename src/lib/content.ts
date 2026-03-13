import { sanityClient } from "./sanityClient";

export type Noticia = {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  summary?: string;
};

export type Edital = {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  summary?: string;
  fileUrl?: string;
};

export async function getNoticias(): Promise<Noticia[]> {
  const query = `*[_type == "noticia"] | order(date desc){
    _id,
    title,
    slug,
    date,
    summary
  }`;

  return sanityClient.fetch<Noticia[]>(query);
}

export async function getNoticiaBySlug(slug: string): Promise<Noticia | null> {
  const query = `*[_type == "noticia" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    date,
    summary
  }`;

  return sanityClient.fetch<Noticia | null>(query, { slug });
}

export async function getEditais(): Promise<Edital[]> {
  const query = `*[_type == "edital"] | order(date desc){
    _id,
    title,
    slug,
    date,
    summary,
    "fileUrl": file.asset->url
  }`;

  return sanityClient.fetch<Edital[]>(query);
}

export async function getEditalBySlug(slug: string): Promise<Edital | null> {
  const query = `*[_type == "edital" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    date,
    summary,
    "fileUrl": file.asset->url
  }`;

  return sanityClient.fetch<Edital | null>(query, { slug });
}

