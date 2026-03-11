import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-primary-dark pt-16 pb-8">
      <div className="container">
        {/* Newsletter */}
        <div className="mb-12 rounded-2xl bg-primary/30 p-8 text-center md:p-12">
          <h3 className="mb-2 font-heading text-2xl font-bold text-primary-foreground">
            Receba Nossas Novidades
          </h3>
          <p className="mb-6 text-sm text-primary-foreground/70">
            Cadastre-se e fique por dentro de cursos, eventos e promoções
          </p>
          <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50"
            />
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0">
              Cadastrar
            </Button>
          </form>
        </div>

        {/* Links */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <GraduationCap className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="font-heading text-lg font-bold text-primary-foreground">
                EduGroup
              </span>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/60">
              Educação de qualidade para transformar vidas e construir carreiras de sucesso.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-primary-foreground">
              Institucional
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="#sobre" className="transition-colors hover:text-accent">Sobre Nós</a></li>
              <li><a href="#" className="transition-colors hover:text-accent">Trabalhe Conosco</a></li>
              <li><a href="#parceiro" className="transition-colors hover:text-accent">Seja Parceiro</a></li>
              <li><a href="#" className="transition-colors hover:text-accent">Política de Privacidade</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-primary-foreground">
              Cursos
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="#cursos" className="transition-colors hover:text-accent">Técnicos</a></li>
              <li><a href="#cursos" className="transition-colors hover:text-accent">Graduação</a></li>
              <li><a href="#cursos" className="transition-colors hover:text-accent">Pós-Graduação</a></li>
              <li><a href="#cursos" className="transition-colors hover:text-accent">Extensão</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-primary-foreground">
              Contato
            </h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" /> (11) 0000-0000
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" /> contato@edugroup.com.br
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-accent" /> Rua Exemplo, 123 - São Paulo, SP
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/60 transition-colors hover:bg-accent hover:text-accent-foreground">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-8 border-primary-foreground/10" />
        <p className="text-center text-xs text-primary-foreground/40">
          © 2025 EduGroup. Todos os direitos reservados. Conteúdo placeholder para demonstração.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
