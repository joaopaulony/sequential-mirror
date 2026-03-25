import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { MessageSquare, Mail, Phone } from "lucide-react";

const Ouvidoria = () => (
  <PageLayout>
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold md:text-5xl">
          Ouvidoria
        </motion.h1>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-3xl">
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <MessageSquare className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            O objetivo da Ouvidoria é oferecer à comunidade acadêmica e à sociedade, um espaço de comunicação, recebendo reclamações, críticas, elogios e sugestões.
          </p>
          <h2 className="text-xl font-bold text-foreground">Quais são as nossas atribuições enquanto Ouvidoria?</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Ouvir e registrar as demandas atuando como mediadora nas questões</li>
            <li>Encaminhar as manifestações aos setores responsáveis</li>
            <li>Acompanhar o andamento e providências adotadas</li>
            <li>Responder ao manifestante sobre as providências tomadas</li>
            <li>Sugerir melhorias nos processos institucionais</li>
          </ul>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-6">
            <Mail className="mb-3 h-6 w-6 text-primary" />
            <p className="font-bold text-foreground">E-mail</p>
            <p className="text-sm text-muted-foreground">ouvidoria@gruposequencial.com.br</p>
          </div>
          <div className="rounded-xl border border-border p-6">
            <Phone className="mb-3 h-6 w-6 text-primary" />
            <p className="font-bold text-foreground">Telefone</p>
            <p className="text-sm text-muted-foreground">(11) 5841-3012</p>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Ouvidoria;
