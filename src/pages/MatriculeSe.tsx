import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GraduationCap, Wrench, Award } from "lucide-react";

const opcoes = [
  { icon: Wrench, title: "Curso Técnico", desc: "Formação rápida e prática para o mercado de trabalho", link: "https://www.escolasequencial.com.br/cursos-tecnicos", external: true },
  { icon: GraduationCap, title: "Faculdade", desc: "Graduação com qualidade e preço acessível", link: "/inscricao", external: false },
  { icon: Award, title: "Pós-Graduação", desc: "Especialize-se e avance na sua carreira", link: "/inscricao-pos", external: false },
];

const MatriculeSe = () => (
  <PageLayout>
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold md:text-5xl">
          Inscreva-se
        </motion.h1>
        <p className="mt-4 text-lg text-primary-foreground/80">Onde ingressar</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-4xl">
        <div className="grid gap-6 md:grid-cols-3">
          {opcoes.map((o) => (
            <div key={o.title} className="rounded-2xl border border-border bg-background p-8 text-center shadow-sm">
              <o.icon className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-bold text-foreground">{o.title}</h3>
              <p className="mb-6 text-sm text-muted-foreground">{o.desc}</p>
              <Button className="w-full" asChild>
                <a href={o.link} {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  Inscreva-se
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default MatriculeSe;
