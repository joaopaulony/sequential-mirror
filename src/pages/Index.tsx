import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import ModalityCards from "@/components/ModalityCards";
import CoursesCarousel from "@/components/CoursesCarousel";
import StatsBar from "@/components/StatsBar";
import Values from "@/components/Values";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroBanner />
        <ModalityCards />
        <CoursesCarousel />
        <StatsBar />
        <Values />
        <Testimonials />
        <CtaSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
