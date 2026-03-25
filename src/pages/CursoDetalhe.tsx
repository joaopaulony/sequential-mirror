import PageLayout from "@/components/PageLayout";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, BookOpen, Users } from "lucide-react";

const CursoDetalhe = () => {
  const [params] = useSearchParams();
  const cursoNome = params.get("curso") || "Curso";

  return (
    <PageLayout>
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <p className="mb-2 text-sm font-medium text-primary-foreground/70">Detalhes do Curso</p>
          <h1 className="text-4xl font-bold md:text-5xl">{cursoNome}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 mb-12">
            {[
              { icon: Clock, label: "Duração", value: "Consulte" },
              { icon: MapPin, label: "Modalidade", value: "Presencial" },
              { icon: BookOpen, label: "Turno", value: "Noturno" },
              { icon: Users, label: "Vagas", value: "Limitadas" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-border p-4 text-center">
                <item.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-bold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Sobre o Curso</h2>
              <p className="text-muted-foreground leading-relaxed">
                O curso de {cursoNome} da Faculdade Sequencial forma profissionais capacitados para atuar no mercado de trabalho com excelência. Com corpo docente qualificado e infraestrutura moderna, o aluno recebe formação teórica e prática de alto nível.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Diferenciais</h2>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Corpo docente com mestres e doutores</li>
                <li>Laboratórios e infraestrutura de ponta</li>
                <li>Convênios com empresas para estágio</li>
                <li>Programa de empregabilidade</li>
                <li>Valores acessíveis e formas de financiamento</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <a href="/inscricao">Inscreva-se Agora</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/formas-de-ingresso">Formas de Ingresso</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CursoDetalhe;
