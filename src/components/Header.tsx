import { useState } from "react";
import { Menu, GraduationCap, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  {
    label: "Sobre",
    children: [
      { label: "Nossa História", href: "/historia" },
      { label: "Objetivos", href: "/historia#objetivos" },
      { label: "Proposta Pedagógica", href: "/historia#proposta" },
      { label: "Infraestrutura", href: "/infraestrutura/ambientes-de-aprendizagem" },
      { label: "Avaliação Institucional", href: "/avaliacao-institucional" },
      { label: "Aviso de Privacidade", href: "/aviso-de-privacidade" },
    ],
  },
  {
    label: "Cursos",
    children: [
      { label: "Técnicos", href: "https://www.escolasequencial.com.br/cursos-tecnicos", external: true },
      { label: "Graduação", href: "/graduacoes" },
      { label: "Pós-Graduação", href: "/cursos-pos-graduacao" },
    ],
  },
  {
    label: "Matrícula",
    children: [
      { label: "Formas de Ingresso", href: "/formas_de_ingresso" },
      { label: "Editais", href: "/edital" },
      { label: "PROUNI", href: "/prouni" },
      { label: "Financiamento Estudantil", href: "/financiamento-estudantis" },
    ],
  },
  {
    label: "Unidades",
    href: "/unidades",
  },
  {
    label: "Serviços",
    children: [
      { label: "Ouvidoria", href: "/ouvidoria" },
      { label: "Convênios", href: "/convenios" },
      { label: "Downloads", href: "/downloads" },
      { label: "Depoimentos", href: "/depoimentos" },
      { label: "Notícias", href: "/noticias" },
    ],
  },
];

const externalLinks = [
  { label: "Portal do Aluno Faculdade", href: "https://faculdadesequencial.perseus.com.br/servicos/Autenticacao/Login?ReturnUrl=%2Fservicos%2Fportaleducacional%2F" },
  { label: "Professor Faculdade", href: "https://faculdadesequencial.perseus.com.br/Servicos/Autenticacao" },
  { label: "Aluno Técnico", href: "https://portal.gruposequencial.com.br/portaltec/aluno/login" },
  { label: "Professor Técnico", href: "https://portal.gruposequencial.com.br/portaltec/professor/login" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">
            Grupo<span className="text-primary">Sequencial</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary">
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {activeDropdown === item.label && (
                  <div className="absolute left-0 top-full z-50 min-w-[200px] rounded-lg border border-border bg-background py-2 shadow-lg">
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        {...("external" in child && child.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="block px-4 py-2 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("area")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80">
              Área Exclusiva <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {activeDropdown === "area" && (
              <div className="absolute right-0 top-full z-50 min-w-[220px] rounded-lg border border-border bg-background py-2 shadow-lg">
                {externalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <Button asChild>
            <a href="/matricule-se">Inscreva-se</a>
          </Button>
        </div>

        {/* Mobile Nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 overflow-y-auto">
            <div className="mt-8 flex flex-col gap-2">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        {...("external" in child && child.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        onClick={() => setOpen(false)}
                        className="block rounded-md px-6 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {item.label}
                  </a>
                )
              )}
              <hr className="my-2 border-border" />
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Área Exclusiva
              </p>
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block px-6 py-2 text-sm font-medium text-primary"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mx-3 mt-4">
                <a href="/matricule-se" onClick={() => setOpen(false)}>
                  Inscreva-se
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
