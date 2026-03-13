import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getNoticias, Noticia } from "@/lib/content";

const NoticiasList = () => {
  const { data, isLoading, error } = useQuery<Noticia[]>({
    queryKey: ["noticias"],
    queryFn: getNoticias,
  });

  if (isLoading) {
    return <div className="container py-10">Carregando notícias...</div>;
  }

  if (error) {
    return <div className="container py-10 text-red-600">Erro ao carregar notícias.</div>;
  }

  const noticias = data ?? [];

  return (
    <div className="min-h-screen">
      <main className="container py-10">
        <h1 className="mb-6 text-3xl font-bold">Notícias</h1>
        {noticias.length === 0 && <p>Não há notícias cadastradas ainda.</p>}
        <ul className="space-y-4">
          {noticias.map((n) => (
            <li key={n._id} className="border-b pb-4">
              <Link to={`/noticias/${n.slug.current}`} className="text-lg font-semibold text-blue-600 hover:underline">
                {n.title}
              </Link>
              {n.summary && <p className="text-sm text-gray-600 mt-1">{n.summary}</p>}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default NoticiasList;

