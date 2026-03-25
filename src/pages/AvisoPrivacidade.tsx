import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";

const AvisoPrivacidade = () => (
  <PageLayout>
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold md:text-5xl">
          Aviso de Privacidade
        </motion.h1>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
        <h2 className="text-2xl font-bold text-foreground">Lei Geral de Proteção de Dados Pessoais (LGPD)</h2>
        <p>
          O Grupo Sequencial tem como um dos seus valores garantir a proteção dos dados pessoais e a privacidade dos seus clientes e parceiros, identificados como titulares de dados, a quem se referem os dados pessoais coletados por esta página.
        </p>
        <p>
          Para tanto, seguimos as diretrizes da Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais - LGPD), assegurando o tratamento adequado dos dados pessoais sob nossa responsabilidade.
        </p>
        <h3 className="text-xl font-bold text-foreground">Dados que coletamos:</h3>
        <ul className="list-disc space-y-2 pl-6">
          <li>Dados de identificação (nome, CPF, RG)</li>
          <li>Dados de contato (e-mail, telefone, endereço)</li>
          <li>Dados acadêmicos (matrícula, notas, frequência)</li>
          <li>Dados de navegação (cookies, IP)</li>
        </ul>
        <h3 className="text-xl font-bold text-foreground">Seus direitos:</h3>
        <ul className="list-disc space-y-2 pl-6">
          <li>Confirmação da existência de tratamento</li>
          <li>Acesso aos dados</li>
          <li>Correção de dados incompletos ou desatualizados</li>
          <li>Eliminação de dados desnecessários</li>
          <li>Portabilidade dos dados</li>
          <li>Revogação do consentimento</li>
        </ul>
      </div>
    </section>
  </PageLayout>
);

export default AvisoPrivacidade;
