import { motion } from "framer-motion";
import { ShieldCheck, Heart, Target, Rocket } from "lucide-react";

const values = [
  { icon: ShieldCheck, title: "Qualidade", description: "Ensino de excelência com metodologias inovadoras e corpo docente altamente qualificado." },
  { icon: Heart, title: "Ética", description: "Compromisso com a transparência, integridade e respeito em todas as nossas relações." },
  { icon: Target, title: "Foco no Aluno", description: "O estudante é o centro de tudo. Cada decisão visa seu crescimento pessoal e profissional." },
  { icon: Rocket, title: "Inovação", description: "Investimento constante em tecnologia e metodologias de ensino contemporâneas." },
];

const Values = () => {
  return (
    <section id="sobre" className="bg-primary-dark py-20">
      <div className="container">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-3 font-heading text-3xl font-bold text-primary-foreground sm:text-4xl">
            Nossos Valores
          </h2>
          <p className="mx-auto max-w-lg text-primary-foreground/70">
            Princípios que guiam nossa missão educacional
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((val, i) => (
            <motion.div
              key={val.title}
              className="group flex flex-col items-center rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 text-center backdrop-blur transition-all duration-300 hover:bg-primary-foreground/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/20">
                <val.icon className="h-7 w-7 text-accent" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-bold text-primary-foreground">{val.title}</h3>
              <p className="text-sm leading-relaxed text-primary-foreground/70">{val.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
