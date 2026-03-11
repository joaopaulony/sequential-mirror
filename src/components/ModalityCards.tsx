import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const modalities = [
  {
    icon: BookOpen,
    title: "Cursos Técnicos",
    description: "Formação prática e rápida para ingressar no mercado de trabalho com diferenciais competitivos.",
    color: "from-primary to-primary-light",
  },
  {
    icon: GraduationCap,
    title: "Graduação",
    description: "Cursos superiores reconhecidos pelo MEC com corpo docente qualificado e infraestrutura moderna.",
    color: "from-primary-dark to-primary",
  },
  {
    icon: Award,
    title: "Pós-Graduação",
    description: "Especializações que valorizam seu currículo e ampliam suas oportunidades profissionais.",
    color: "from-primary to-primary-dark",
  },
];

const ModalityCards = () => {
  return (
    <section id="matricula" className="py-20 bg-background">
      <div className="container">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Inscreva-se Agora
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Escolha a modalidade ideal para o seu momento de carreira
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {modalities.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Card className="group relative overflow-hidden border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className={`h-2 bg-gradient-to-r ${mod.color}`} />
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                    <mod.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-3 font-heading text-xl font-bold text-foreground">{mod.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{mod.description}</p>
                  <Button className="w-full">Inscreva-se</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModalityCards;
