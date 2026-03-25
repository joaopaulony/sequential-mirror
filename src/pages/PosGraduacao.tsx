import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, Award } from "lucide-react";

const cursos = [
  "Farmácia Clínica e Atenção Farmacêutica",
  "Educação Especial e Inclusiva",
  "Psicopedagogia",
  "Unidade de Terapia Intensiva (UTI)",
  "Saúde Pública",
  "Estética Avançada",
  "ABA (Análise do Comportamento Aplicada) na Educação",
  "TEA (Transtorno do Espectro Autista)",
  "Urgência e Emergência",
];

const PosGraduacao = () => (
  <PageLayout>
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold md:text-5xl">
          Pós-Graduação
        </motion.h1>
        <p className="mt-4 text-lg text-primary-foreground/80">Especialize-se e avance na sua carreira</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cursos.map((nome, i) => (
            <motion.div
              key={nome}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Award className="h-7 w-7 text-primary" />
              </div>
              <span className="mb-1 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                Pós-Graduação - 1 ano
              </span>
              <h3 className="mt-2 text-xl font-bold text-foreground">{nome}</h3>
              <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" /> 1 ano
              </div>
              <Button className="mt-6 w-full" asChild>
                <a href={`/curso-detalhe?curso=${encodeURIComponent(nome)}`}>Saiba Mais</a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default PosGraduacao;
