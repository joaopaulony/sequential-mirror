import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Edital, getEditais } from "@/lib/content";

const EditaisList = () => {
  const { data, isLoading, error } = useQuery<Edital[]>({
    queryKey: ["editais"],
    queryFn: getEditais,
  });

  if (isLoading) {
    return <div className="container py-10">Carregando editais...</div>;
  }

  if (error) {
    return <div className="container py-10 text-red-600">Erro ao carregar editais.</div>;
  }

  const editais = data ?? [];

  return (
    <div className="min-h-screen">
      <main className="container py-10">
        <h1 className="mb-6 text-3xl font-bold">Editais</h1>
        {editais.length === 0 && <p>Não há editais cadastrados ainda.</p>}
        <ul className="space-y-4">
          {editais.map((e) => (
            <li key={e._id} className="border-b pb-4">
              <Link to={`/editais/${e.slug.current}`} className="text-lg font-semibold text-blue-600 hover:underline">
                {e.title}
              </Link>
              {e.summary && <p className="text-sm text-gray-600 mt-1">{e.summary}</p>}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default EditaisList;

