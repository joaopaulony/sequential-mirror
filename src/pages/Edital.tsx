import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const editaisData = [
  { titulo: "Edital Vestibular 2025/2", slug: "edital-vestibular-2025-2_assinado-2" },
  { titulo: "Edital Vestibular Social 2025/1", slug: "edital-vestibular-social-2025-1" },
  { titulo: "1º Aditivo ao Edital Vestibular Social 1º Semestre de 2025", slug: "1o-aditivo-ao-edital-vestibular-social-1o-semestre-de-2025" },
  { titulo: "Edital Vestibular Social 2º Semestre de 2024", slug: "edital-vestibular-social-2o-semestre-de-2024" },
  { titulo: "Edital Vestibular Social 2º Semestre de 2024 (2)", slug: "edital-vestibular-social-2o-semestre-de-2024-2" },
  { titulo: "Black Friday 2024", slug: "blackfriday2024" },
  { titulo: "Edital Vestibular Social 1º Semestre de 2023", slug: "edital-vestibular-social-1o-semestre-de-2023" },
  { titulo: "Edital Vestibular Social 2º Semestre de 2023", slug: "edital-vestibular-social-2o-semestre-de-2023" },
  { titulo: "Edital Vestibular Social 1º Semestre de 2022", slug: "edital-vestibular-social-1o-semestre-de-2022" },
  { titulo: "Edital Vestibular Social 2º Semestre de 2022", slug: "edital-vestibular-social-2o-semestre-de-2022" },
  { titulo: "Edital Vestibular Social 1º Semestre de 2021", slug: "edital-vestibular-social-1o-semestre-de-2021" },
  { titulo: "Edital Vestibular Social 2º Semestre de 2021", slug: "edital-vestibular-social-2o-semestre-de-2021" },
];

const Edital = () => (
  <PageLayout>
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold md:text-5xl">
          Editais
        </motion.h1>
        <p className="mt-4 text-lg text-primary-foreground/80">
          Confira nossos editais de vestibular e processos seletivos
        </p>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-3xl">
        <p className="mb-8 text-muted-foreground">
          A Diretoria Acadêmica da Faculdade Sequencial, no uso de suas atribuições legais, torna público os editais com diferentes processos seletivos para ingresso nos cursos de graduação.
        </p>
        <div className="space-y-3">
          {editaisData.map((e) => (
            <div key={e.slug} className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">{e.titulo}</span>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href={`/editais/${e.slug}`}>Ver</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Edital;
