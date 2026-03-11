import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, HeartPulse, Scale, Monitor, Calculator, Palette } from "lucide-react";

const courses = [
  { name: "Administração", icon: Briefcase, area: "Gestão" },
  { name: "Enfermagem", icon: HeartPulse, area: "Saúde" },
  { name: "Direito", icon: Scale, area: "Ciências Jurídicas" },
  { name: "Tecnologia da Informação", icon: Monitor, area: "Tecnologia" },
  { name: "Contabilidade", icon: Calculator, area: "Ciências Contábeis" },
  { name: "Design Gráfico", icon: Palette, area: "Criatividade" },
];

const CoursesCarousel = () => {
  return (
    <section id="cursos" className="bg-muted py-20">
      <div className="container">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Explore Nossos Cursos
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Descubra o curso ideal para sua carreira entre nossas diversas opções
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Carousel opts={{ align: "start", loop: true }} className="mx-auto w-full max-w-5xl">
            <CarouselContent>
              {courses.map((course) => (
                <CarouselItem key={course.name} className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card className="group cursor-pointer border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <CardContent className="flex flex-col items-center p-8 text-center">
                      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-primary">
                        <course.icon className="h-10 w-10 text-primary transition-colors group-hover:text-primary-foreground" />
                      </div>
                      <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                        {course.area}
                      </span>
                      <h3 className="font-heading text-lg font-bold text-foreground">{course.name}</h3>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12" />
            <CarouselNext className="-right-4 md:-right-12" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesCarousel;
