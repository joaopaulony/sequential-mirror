import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";

const AvaliacaoInstitucional = () => (
  <PageLayout>
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold md:text-5xl">
          Avaliação Institucional
        </motion.h1>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
        <h2 className="text-2xl font-bold text-foreground">Comissão Própria de Avaliação (CPA)</h2>
        <p>
          A Comissão Própria de Avaliação (CPA) da Faculdade Sequencial visa concretizar de forma sistemática o processo avaliativo, com o intuito de reconhecer o perfil da instituição que temos e da que buscamos, oferecendo subsídios para que, nos momentos certos, decisões adequadas sejam tomadas.
        </p>
        <p>
          A CPA é responsável por conduzir os processos de avaliação interna da instituição, sistematizando e prestando informações solicitadas pelo INEP, seguindo as diretrizes e os princípios do SINAES.
        </p>
        <h3 className="text-xl font-bold text-foreground">Objetivos da CPA:</h3>
        <ul className="list-disc space-y-2 pl-6">
          <li>Coordenar e articular o processo interno de avaliação da instituição</li>
          <li>Sensibilizar a comunidade acadêmica para a importância da avaliação institucional</li>
          <li>Garantir a participação de todos os segmentos no processo avaliativo</li>
          <li>Assegurar a continuidade do processo de autoavaliação</li>
        </ul>
      </div>
    </section>
  </PageLayout>
);

export default AvaliacaoInstitucional;
