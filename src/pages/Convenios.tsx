import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Handshake } from "lucide-react";

const convDesconto = [
  "Allpark Empreendimentos Participações e Serviços SA",
  "Alstom Brasil Energia e Transporte Ltda",
];

const convEstagio = [
  "ACGT Associação dos Colaboradores do Grupo Tejofran",
];

const Convenios = () => (
  <PageLayout>
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold md:text-5xl">
          Convênios
        </motion.h1>
        <p className="mt-4 text-lg text-primary-foreground/80">Conheça nossos parceiros</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-4xl">
        <p className="mb-12 text-lg text-muted-foreground">
          Você sabia que o Grupo Sequencial tem convênio com uma série de empresas para oferecer descontos e oportunidades de estágio? Ficou interessado? Entre em contato conosco!
        </p>

        <div className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
            <Handshake className="h-6 w-6 text-primary" /> Convênios de Desconto
          </h2>
          <ul className="space-y-2">
            {convDesconto.map((c) => (
              <li key={c} className="rounded-lg border border-border bg-background px-4 py-3 text-foreground">{c}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
            <Handshake className="h-6 w-6 text-primary" /> Convênios de Estágio
          </h2>
          <ul className="space-y-2">
            {convEstagio.map((c) => (
              <li key={c} className="rounded-lg border border-border bg-background px-4 py-3 text-foreground">{c}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">*Convênio sujeito a disponibilidade</p>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Convenios;
