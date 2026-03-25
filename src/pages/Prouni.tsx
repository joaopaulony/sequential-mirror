import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Prouni = () => (
  <PageLayout>
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold md:text-5xl">
          PROUNI
        </motion.h1>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
        <h2 className="text-2xl font-bold text-foreground">Quem pode solicitar o PROUNI?</h2>
        <p>
          Podem se inscrever os candidatos que não possuam diploma de curso superior, que tenham participado do último ENEM e obtido no mínimo 450 pontos e nota superior a zero na redação.
        </p>
        <h3 className="text-xl font-bold text-foreground">As bolsas podem ser:</h3>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>De 100%</strong> – para estudantes com renda bruta familiar de até 1,5 salário mínimo per capita.</li>
          <li><strong>De 50%</strong> – para estudantes com renda bruta familiar de até 3 salários mínimos per capita.</li>
        </ul>
        <Button size="lg" asChild>
          <a href="https://prouniportal.mec.gov.br/" target="_blank" rel="noopener noreferrer">
            Acesse o Portal do PROUNI
          </a>
        </Button>
      </div>
    </section>
  </PageLayout>
);

export default Prouni;
