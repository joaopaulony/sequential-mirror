import PageLayout from "@/components/PageLayout";
import HeroBanner from "@/components/HeroBanner";
import ModalityCards from "@/components/ModalityCards";
import CoursesCarousel from "@/components/CoursesCarousel";
import StatsBar from "@/components/StatsBar";
import Values from "@/components/Values";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";
import NewsSection from "@/components/NewsSection";

const Index = () => {
  return (
    <PageLayout>
      <HeroBanner />
      <ModalityCards />
      <CoursesCarousel />
      <StatsBar />
      <Values />
      <Testimonials />
      <CtaSection />
      <NewsSection />
    </PageLayout>
  );
};

export default Index;
