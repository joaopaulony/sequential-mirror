import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Monitor, BookOpen, FlaskConical, Users, Accessibility, Wifi } from "lucide-react";

const ambientes = [
  { icon: FlaskConical, title: "Laboratórios", desc: "Laboratórios equipados com tecnologia de ponta para aulas práticas em todas as áreas." },
  { icon: BookOpen, title: "Biblioteca", desc: "Acervo atualizado com livros, periódicos e acesso a bases de dados digitais." },
  { icon: Monitor, title: "Salas Multimídia", desc: "Ambientes com projetores, som e recursos audiovisuais para uma experiência imersiva." },
  { icon: Users, title: "Auditório", desc: "Espaço amplo para eventos, palestras, seminários e atividades culturais." },
  { icon: Wifi, title: "Conectividade", desc: "Wi-Fi de alta velocidade em toda a instituição para alunos e professores." },
  { icon: Accessibility, title: "Acessibilidade", desc: "Estrutura completa de acessibilidade com rampas, elevadores e sinalização adequada." },
];

const Infraestrutura = () => (
  <PageLayout>
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold md:text-5xl">
          Infraestrutura
        </motion.h1>
        <p className="mt-4 text-lg text-primary-foreground/80">Ambientes de Aprendizagem</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ambientes.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-background p-6 shadow-sm"
            >
              <a.icon className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-bold text-foreground">{a.title}</h3>
              <p className="text-sm text-muted-foreground">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Infraestrutura;
