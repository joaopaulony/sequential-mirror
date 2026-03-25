import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Target, BookOpen, Building2, Eye } from "lucide-react";

const Historia = () => (
  <PageLayout>
    {/* Hero */}
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold md:text-5xl">
          Sobre o Grupo Sequencial
        </motion.h1>
      </div>
    </section>

    {/* História */}
    <section className="py-16">
      <div className="container max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold text-foreground">História</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Em 2003 surgiu o Centro Técnico Profissionalizante Sequencial na cidade de São Paulo, uma iniciativa para promover a educação e, ao mesmo tempo, alavancar a carreira de jovens e adultos que procuravam novas oportunidades.
          </p>
          <p>
            A escola tornou-se referência na região do Campo Limpo, evoluindo o conceito de educação técnica com qualidade e acessibilidade. Com o passar dos anos, o Grupo Sequencial expandiu suas operações, inaugurando novas unidades e ampliando sua oferta de cursos.
          </p>
          <p>
            Hoje, o Grupo Sequencial conta com escolas técnicas, faculdade e polos de ensino a distância, atendendo milhares de alunos em diversas áreas do conhecimento, sempre com foco na empregabilidade e na transformação social pela educação.
          </p>
        </div>
      </div>
    </section>

    {/* Objetivos */}
    <section id="objetivos" className="bg-secondary py-16">
      <div className="container max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold text-foreground">Objetivos</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { icon: Target, title: "Missão", text: "Proporcionar educação de qualidade, acessível e voltada para o mercado de trabalho, contribuindo para o desenvolvimento social e profissional dos nossos alunos." },
            { icon: Eye, title: "Visão", text: "Ser referência em educação técnica e superior no Brasil, formando profissionais capacitados e cidadãos comprometidos com a sociedade." },
            { icon: BookOpen, title: "Valores", text: "Ética, qualidade, inovação, respeito, compromisso com o aluno e responsabilidade social." },
            { icon: Building2, title: "Compromisso", text: "Investir continuamente em infraestrutura, tecnologia e formação docente para oferecer a melhor experiência educacional." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl bg-background p-6 shadow-sm">
              <item.icon className="mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-lg font-bold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Proposta Pedagógica */}
    <section id="proposta" className="py-16">
      <div className="container max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold text-foreground">Proposta Pedagógica</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            A proposta pedagógica do Grupo Sequencial é fundamentada na formação integral do aluno, aliando teoria e prática para preparar profissionais competentes e cidadãos conscientes.
          </p>
          <p>
            Nossos cursos são estruturados com base nas demandas do mercado de trabalho, com corpo docente qualificado e infraestrutura moderna, proporcionando uma experiência educacional completa.
          </p>
        </div>
      </div>
    </section>

    {/* Infraestrutura */}
    <section id="infraestrutura" className="bg-secondary py-16">
      <div className="container max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold text-foreground">Infraestrutura</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {["Laboratórios equipados", "Biblioteca atualizada", "Salas multimídia", "Auditório", "Espaço de convivência", "Acessibilidade completa"].map((item) => (
            <div key={item} className="rounded-lg bg-background p-4 text-center shadow-sm">
              <p className="font-medium text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Historia;
