import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const cursosPos = [
  "Farmácia Clínica e Atenção Farmacêutica",
  "Educação Especial e Inclusiva",
  "Psicopedagogia",
  "Unidade de Terapia Intensiva (UTI)",
  "Saúde Pública",
  "Estética Avançada",
  "ABA na Educação",
  "TEA (Transtorno do Espectro Autista)",
  "Urgência e Emergência",
];

const InscricaoPos = () => {
  const [curso, setCurso] = useState("");

  return (
    <PageLayout>
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold md:text-5xl">
            Inscrição Pós-Graduação
          </motion.h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-2xl">
          <div className="rounded-2xl border border-border bg-background p-8 shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Curso de Pós-Graduação</label>
                <select
                  value={curso}
                  onChange={(e) => setCurso(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground"
                >
                  <option value="">Escolher curso</option>
                  {cursosPos.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Nome Completo</label>
                <input type="text" placeholder="Seu nome completo" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">E-mail</label>
                <input type="email" placeholder="seu@email.com" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Telefone / WhatsApp</label>
                <input type="tel" placeholder="(11) 99999-9999" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground" />
              </div>

              <Button size="lg" className="w-full">
                Enviar Inscrição
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default InscricaoPos;
