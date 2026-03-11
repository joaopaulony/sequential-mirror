import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  { name: "Ana Silva", course: "Graduação em Administração", quote: "A qualidade do ensino superou todas as minhas expectativas. Consegui uma promoção no trabalho graças ao que aprendi." },
  { name: "Carlos Santos", course: "Técnico em Enfermagem", quote: "O curso me preparou de verdade para o mercado. Hoje trabalho em um dos melhores hospitais da região." },
  { name: "Maria Oliveira", course: "Pós-Graduação em Gestão", quote: "Excelente corpo docente e uma metodologia que faz a diferença. Recomendo para todos que buscam crescimento." },
  { name: "Pedro Costa", course: "Graduação em TI", quote: "A infraestrutura e os laboratórios são de ponta. Me senti preparado desde o primeiro estágio." },
];

const Testimonials = () => {
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
            O Que Nossos Alunos Dizem
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Histórias reais de quem transformou sua carreira conosco
          </p>
        </motion.div>

        <Carousel opts={{ align: "start", loop: true }} className="mx-auto w-full max-w-4xl">
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem key={t.name} className="basis-full md:basis-1/2">
                <Card className="border-0 bg-muted shadow-md">
                  <CardContent className="p-8">
                    <Quote className="mb-4 h-8 w-8 text-primary/30" />
                    <p className="mb-6 text-sm italic leading-relaxed text-foreground/80">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground">
                        {t.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-heading text-sm font-bold text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.course}</p>
                      </div>
                    </div>
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

export default Testimonials;
