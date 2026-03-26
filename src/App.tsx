import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NoticiasList from "./pages/NoticiasList";
import NoticiaDetalhe from "./pages/NoticiaDetalhe";
import EditaisList from "./pages/EditaisList";
import EditalDetalhe from "./pages/EditalDetalhe";
import Historia from "./pages/Historia";
import Graduacoes from "./pages/Graduacoes";
import PosGraduacao from "./pages/PosGraduacao";
import CursoDetalhe from "./pages/CursoDetalhe";
import Unidades from "./pages/Unidades";
import FormasIngresso from "./pages/FormasIngresso";
import Convenios from "./pages/Convenios";
import Ouvidoria from "./pages/Ouvidoria";
import Downloads from "./pages/Downloads";
import Prouni from "./pages/Prouni";
import FinanciamentoEstudantil from "./pages/FinanciamentoEstudantil";
import AvaliacaoInstitucional from "./pages/AvaliacaoInstitucional";
import AvisoPrivacidade from "./pages/AvisoPrivacidade";
import Depoimentos from "./pages/Depoimentos";
import Inscricao from "./pages/Inscricao";
import InscricaoPos from "./pages/InscricaoPos";
import MatriculeSe from "./pages/MatriculeSe";
import Edital from "./pages/Edital";
import Infraestrutura from "./pages/Infraestrutura";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Institucional */}
          <Route path="/historia" element={<Historia />} />
          <Route path="/avaliacao-institucional" element={<AvaliacaoInstitucional />} />
          <Route path="/aviso-de-privacidade" element={<AvisoPrivacidade />} />
          <Route path="/convenios" element={<Convenios />} />
          <Route path="/ouvidoria" element={<Ouvidoria />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/depoimentos" element={<Depoimentos />} />
          <Route path="/prouni" element={<Prouni />} />
          <Route path="/financiamento-estudantis" element={<FinanciamentoEstudantil />} />
          <Route path="/infraestrutura/ambientes-de-aprendizagem" element={<Infraestrutura />} />

          {/* Cursos */}
          <Route path="/graduacoes" element={<Graduacoes />} />
          <Route path="/cursos-pos-graduacao" element={<PosGraduacao />} />
          <Route path="/curso-detalhe" element={<CursoDetalhe />} />
          <Route path="/faculdade-detalhe" element={<CursoDetalhe />} />

          {/* Unidades */}
          <Route path="/unidades" element={<Unidades />} />

          {/* Ingresso */}
          <Route path="/formas_de_ingresso" element={<FormasIngresso />} />
          <Route path="/formas-de-ingresso" element={<FormasIngresso />} />
          <Route path="/matricule-se" element={<MatriculeSe />} />
          <Route path="/inscricao" element={<Inscricao />} />
          <Route path="/inscricao-pos" element={<InscricaoPos />} />

          {/* Editais */}
          <Route path="/edital" element={<Edital />} />
          <Route path="/editais" element={<EditaisList />} />
          <Route path="/editais/:slug" element={<EditalDetalhe />} />

          {/* Notícias */}
          <Route path="/noticias" element={<NoticiasList />} />
          <Route path="/noticias/:slug" element={<NoticiaDetalhe />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
