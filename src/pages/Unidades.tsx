import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const unidades = [
  { nome: "Campo Limpo", tipo: "Faculdade + Escola Técnica", endereco: "São Paulo - SP", telefone: "(11) 5841-3012" },
  { nome: "Capão Redondo", tipo: "Escola Técnica", endereco: "São Paulo - SP", telefone: "(11) 5821-5065" },
  { nome: "Taboão da Serra", tipo: "Escola Técnica", endereco: "Taboão da Serra - SP", telefone: "(11) 4787-4545" },
  { nome: "Embu das Artes", tipo: "Escola Técnica", endereco: "Embu das Artes - SP", telefone: "(11) 4704-6556" },
  { nome: "Grajaú", tipo: "Escola Técnica", endereco: "São Paulo - SP", telefone: "(11) 5925-0222" },
  { nome: "Jardim Ângela", tipo: "Escola Técnica", endereco: "São Paulo - SP", telefone: "(11) 5834-5065" },
  { nome: "Itapecerica da Serra", tipo: "Escola Técnica", endereco: "Itapecerica da Serra - SP", telefone: "(11) 4666-1848" },
  { nome: "Santo Amaro", tipo: "Polo EAD", endereco: "São Paulo - SP", telefone: "(11) 5523-5065" },
  { nome: "Osasco", tipo: "Polo EAD", endereco: "Osasco - SP", telefone: "(11) 3652-5065" },
];

const Unidades = () => (
  <PageLayout>
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold md:text-5xl">
          Nossas Unidades
        </motion.h1>
        <p className="mt-4 text-lg text-primary-foreground/80">Encontre a unidade mais próxima de você</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {unidades.map((u, i) => (
            <motion.div
              key={u.nome}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-background p-6 shadow-sm"
            >
              <span className="mb-2 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                {u.tipo}
              </span>
              <h3 className="mt-2 text-xl font-bold text-foreground">{u.nome}</h3>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{u.endereco}</div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" />{u.telefone}</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />Seg a Sex: 8h às 22h</div>
              </div>
              <Button variant="outline" className="mt-4 w-full" size="sm">
                Ver Detalhes
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Unidades;
