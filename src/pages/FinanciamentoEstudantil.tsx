import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FinanciamentoEstudantil = () => (
  <PageLayout>
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold md:text-5xl">
          Financiamento Estudantil
        </motion.h1>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
        <h2 className="text-2xl font-bold text-foreground">FIES</h2>
        <h3 className="text-xl font-bold text-foreground">Quem pode solicitar o FIES?</h3>
        <p>
          Podem solicitar o financiamento os estudantes de cursos presenciais de graduação não gratuitos com avaliação positiva no Sistema Nacional de Avaliação da Educação Superior (SINAES), oferecidos por instituições de ensino superior participantes do Programa, e que atendam às demais exigências estabelecidas nas normas do FIES.
        </p>
        <h3 className="text-xl font-bold text-foreground">Requisitos:</h3>
        <ul className="list-disc space-y-2 pl-6">
          <li>Ter participado de alguma edição do ENEM a partir de 2010</li>
          <li>Ter obtido média aritmética das notas nas provas igual ou superior a 450 pontos</li>
          <li>Nota superior a zero na redação</li>
          <li>Possuir renda familiar mensal bruta per capita de até 3 salários mínimos</li>
        </ul>
        <Button size="lg" asChild>
          <a href="https://fies.mec.gov.br/" target="_blank" rel="noopener noreferrer">
            Acesse o Portal do FIES
          </a>
        </Button>
      </div>
    </section>
  </PageLayout>
);

export default FinanciamentoEstudantil;
