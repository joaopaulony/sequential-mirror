import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const news = [
  { date: "10 Mar 2025", title: "Novo campus será inaugurado no próximo semestre", category: "Institucional" },
  { date: "05 Mar 2025", title: "Parceria com empresas garante estágios para alunos", category: "Parcerias" },
  { date: "28 Fev 2025", title: "Semana de tecnologia traz palestras com especialistas", category: "Eventos" },
  { date: "20 Fev 2025", title: "Cursos de pós-graduação com 30% de desconto", category: "Promoções" },
  { date: "15 Fev 2025", title: "Ex-alunos compartilham histórias de sucesso", category: "Depoimentos" },
];

const NewsSection = () => {
  return (
    <section className="bg-background py-20">
      <div className="container">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Acontece na Instituição
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Fique por dentro das últimas novidades e eventos
          </p>
        </motion.div>

        <Carousel opts={{ align: "start", loop: true }} className="mx-auto w-full max-w-5xl">
          <CarouselContent>
            {news.map((item) => (
              <CarouselItem key={item.title} className="basis-full sm:basis-1/2 lg:basis-1/3">
                <Card className="group cursor-pointer border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="h-40 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                      {item.category}
                    </span>
                  </div>
                  <CardContent className="p-5">
                    <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </div>
                    <h3 className="font-heading text-sm font-bold leading-snug text-foreground line-clamp-2">
                      {item.title}
                    </h3>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-12" />
          <CarouselNext className="-right-4 md:-right-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default NewsSection;
