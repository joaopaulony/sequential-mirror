import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, GraduationCap } from "lucide-react";

const cursos = [
  { nome: "Gestão de Recursos Humanos", tipo: "Tecnólogo", duracao: "2 anos" },
  { nome: "Biomedicina", tipo: "Bacharel", duracao: "4 anos" },
  { nome: "Pedagogia", tipo: "Licenciatura", duracao: "4 anos" },
  { nome: "Farmácia", tipo: "Bacharel", duracao: "4 anos" },
  { nome: "Enfermagem", tipo: "Bacharel", duracao: "4 anos" },
];

const Graduacoes = () => (
  <PageLayout>
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold md:text-5xl">
          Graduação
        </motion.h1>
        <p className="mt-4 text-lg text-primary-foreground/80">Escolha o curso que vai transformar sua carreira</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cursos.map((curso, i) => (
            <motion.div
              key={curso.nome}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <GraduationCap className="h-7 w-7 text-primary" />
              </div>
              <span className="mb-1 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                {curso.tipo}
              </span>
              <h3 className="mt-2 text-xl font-bold text-foreground">{curso.nome}</h3>
              <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" /> {curso.duracao}
              </div>
              <Button className="mt-6 w-full" asChild>
                <a href={`/curso-detalhe?curso=${encodeURIComponent(curso.nome)}`}>Saiba Mais</a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Graduacoes;
