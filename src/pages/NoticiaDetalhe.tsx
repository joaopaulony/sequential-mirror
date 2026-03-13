import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getNoticiaBySlug, Noticia } from "@/lib/content";

const NoticiaDetalhe = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, error } = useQuery<Noticia | null>({
    queryKey: ["noticia", slug],
    queryFn: () => getNoticiaBySlug(slug || ""),
    enabled: !!slug,
  });

  if (!slug) {
    return <div className="container py-10">Slug não informado.</div>;
  }

  if (isLoading) {
    return <div className="container py-10">Carregando notícia...</div>;
  }

  if (error) {
    return <div className="container py-10 text-red-600">Erro ao carregar notícia.</div>;
  }

  if (!data) {
    return <div className="container py-10">Notícia não encontrada.</div>;
  }

  return (
    <div className="min-h-screen">
      <main className="container py-10 max-w-3xl">
        <h1 className="mb-4 text-3xl font-bold">{data.title}</h1>
        {data.date && (
          <p className="mb-6 text-sm text-gray-500">
            {new Date(data.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}
          </p>
        )}
        {data.summary && <p className="mb-4 text-lg text-gray-700">{data.summary}</p>}
        <p className="text-gray-500 text-sm">Conteúdo rico ainda não está renderizado (body do Sanity).</p>
      </main>
    </div>
  );
};

export default NoticiaDetalhe;

