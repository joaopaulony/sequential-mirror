import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const depoimentos = [
  { nome: "Raquel Cruz", curso: "Técnica de Farmácia", texto: "Me chamo Raquel Cruz, e a Sequencial mudou minha vida. Consegui uma excelente colocação no mercado de trabalho graças à formação de qualidade que recebi." },
  { nome: "Carlos Silva", curso: "Enfermagem", texto: "A Faculdade Sequencial me proporcionou uma formação completa, com professores dedicados e infraestrutura de ponta. Recomendo a todos!" },
  { nome: "Ana Santos", curso: "Pedagogia", texto: "Escolhi a Sequencial pela qualidade e pelo preço acessível. Não me arrependo! Os professores são excelentes e a estrutura é ótima." },
  { nome: "Pedro Oliveira", curso: "Gestão de RH", texto: "O curso de RH na Sequencial abriu portas que eu nem imaginava. Hoje trabalho em uma grande empresa graças à formação que recebi." },
  { nome: "Maria Fernanda", curso: "Biomedicina", texto: "Os laboratórios da Sequencial são incríveis! A prática constante durante o curso me preparou muito bem para o mercado." },
  { nome: "João Mendes", curso: "Eletrotécnica", texto: "Fiz o técnico em Eletrotécnica e já saí empregado. A Sequencial tem convênios com empresas que facilitam muito a inserção no mercado." },
];

const Depoimentos = () => (
  <PageLayout>
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold md:text-5xl">
          Depoimentos
        </motion.h1>
        <p className="mt-4 text-lg text-primary-foreground/80">O que nossos alunos dizem!</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {depoimentos.map((d, i) => (
            <motion.div
              key={d.nome}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-background p-6 shadow-sm"
            >
              <Quote className="mb-4 h-8 w-8 text-primary/30" />
              <p className="mb-4 text-muted-foreground italic">"{d.texto}"</p>
              <p className="font-bold text-foreground">{d.nome}</p>
              <p className="text-sm text-primary">{d.curso}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Depoimentos;
