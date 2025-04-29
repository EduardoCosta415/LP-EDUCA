import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AdvantagesCarousel from "@/components/AdvantagesCarousel";
import CourseSection from "@/components/CourseSection";
import PricingPlans from "@/components/PricingPlans";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsCarousel from "@/components/NewsCarousel";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-opensans bg-neutral-100">
      <Header />
      <HeroSection />
      <AdvantagesCarousel />
      <CourseSection />
      <PricingPlans />
      <TestimonialsSection />
      <NewsCarousel />
      <CTASection />
      <Footer />
    </div>
  );
}
