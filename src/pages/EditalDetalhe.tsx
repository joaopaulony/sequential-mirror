import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Edital, getEditalBySlug } from "@/lib/content";

const EditalDetalhe = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, error } = useQuery<Edital | null>({
    queryKey: ["edital", slug],
    queryFn: () => getEditalBySlug(slug || ""),
    enabled: !!slug,
  });

  if (!slug) {
    return <div className="container py-10">Slug não informado.</div>;
  }

  if (isLoading) {
    return <div className="container py-10">Carregando edital...</div>;
  }

  if (error) {
    return <div className="container py-10 text-red-600">Erro ao carregar edital.</div>;
  }

  if (!data) {
    return <div className="container py-10">Edital não encontrado.</div>;
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
        {data.fileUrl && (
          <a
            href={data.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Abrir arquivo do edital
          </a>
        )}
        {!data.fileUrl && <p className="text-gray-500 text-sm mt-4">Nenhum arquivo anexado a este edital.</p>}
      </main>
    </div>
  );
};

export default EditalDetalhe;

