import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, BookOpen, TrendingUp, MapPin } from "lucide-react";

const stats = [
  { icon: Users, value: 100000, label: "Alunos Formados", prefix: "+", suffix: "" },
  { icon: BookOpen, value: 50, label: "Cursos Disponíveis", prefix: "+", suffix: "" },
  { icon: TrendingUp, value: 98, label: "Empregabilidade", prefix: "", suffix: "%" },
  { icon: MapPin, value: 9, label: "Unidades", prefix: "", suffix: "" },
];

function AnimatedCounter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-heading text-4xl font-extrabold text-primary-foreground md:text-5xl">
      {prefix}{count.toLocaleString("pt-BR")}{suffix}
    </span>
  );
}

const StatsBar = () => {
  return (
    <section id="unidades" className="relative bg-primary py-16">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <stat.icon className="mb-3 h-8 w-8 text-accent" />
              <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <span className="mt-2 text-sm font-medium text-primary-foreground/80">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
