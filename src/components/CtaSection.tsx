import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  "Corpo docente qualificado",
  "Infraestrutura moderna",
  "Parcerias com empresas",
  "Certificação reconhecida pelo MEC",
];

const CtaSection = () => {
  return (
    <section className="relative overflow-hidden bg-muted py-20">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Transforme seu futuro <span className="text-primary">agora mesmo</span>
            </h2>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Não espere mais para investir na sua carreira. Nossa instituição oferece tudo que você precisa para alcançar seus objetivos profissionais.
            </p>
            <ul className="mb-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-foreground">
                  <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold">
              <a href="#matricula" className="flex items-center gap-2">
                Matricule-se Agora <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-1">
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-primary-dark/50">
                <div className="text-center p-8">
                  <p className="font-heading text-6xl font-extrabold text-accent">+98%</p>
                  <p className="mt-2 text-lg font-medium text-primary-foreground/80">dos nossos alunos estão empregados</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
