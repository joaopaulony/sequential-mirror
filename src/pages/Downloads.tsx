import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const docs = [
  { nome: "Regimento Institucional Faculdade Sequencial", tipo: "PDF" },
  { nome: "Calendário Acadêmico 2025", tipo: "PDF" },
];

const Downloads = () => (
  <PageLayout>
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold md:text-5xl">
          Downloads
        </motion.h1>
        <p className="mt-4 text-lg text-primary-foreground/80">Acesse todos os informativos institucionais</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-3xl">
        <div className="space-y-4">
          {docs.map((doc) => (
            <div key={doc.nome} className="flex items-center justify-between rounded-xl border border-border bg-background p-5">
              <div className="flex items-center gap-3">
                <FileDown className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{doc.nome}</p>
                  <p className="text-xs text-muted-foreground">{doc.tipo}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Baixar</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Downloads;
