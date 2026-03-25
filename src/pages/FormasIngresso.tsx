import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Star, ArrowRightLeft, GraduationCap } from "lucide-react";

const formas = [
  { icon: FileText, title: "Vestibular Social", desc: "Processo seletivo com condições especiais de ingresso e bolsas de estudo." },
  { icon: Star, title: "Nota do ENEM", desc: "Use sua nota do ENEM para ingressar diretamente na graduação." },
  { icon: ArrowRightLeft, title: "Transferência", desc: "Transfira seu curso de outra instituição para a Sequencial." },
  { icon: GraduationCap, title: "Segunda Graduação", desc: "Já é graduado? Ingresse com condições especiais para segunda graduação." },
];

const FormasIngresso = () => (
  <PageLayout>
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold md:text-5xl">
          Formas de Ingresso
        </motion.h1>
        <p className="mt-4 text-lg text-primary-foreground/80">
          Descubra o seu caminho para o sucesso educativo na Sequencial
        </p>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-4xl">
        <p className="mb-12 text-center text-lg text-muted-foreground">
          No Grupo Sequencial, acreditamos que o acesso à educação de qualidade deve ser descomplicado. Oferecemos diversas opções de ingresso para atender às necessidades de cada aluno.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {formas.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-background p-6 shadow-sm"
            >
              <f.icon className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-bold text-foreground">{f.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{f.desc}</p>
              <Button asChild>
                <a href="/inscricao">Quero me inscrever!</a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default FormasIngresso;
