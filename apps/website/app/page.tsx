import HeroCarousel from "@/app/components/HeroCarousel";
import AboutSection from "@/app/components/AboutSection";
import { FeaturedProjects } from "@/app/components/FeaturedProjects";
import ServicesSection from "./components/ServicesSection";
import { ClientsMap } from "./components/ClientsMap";

export default function HomePage() {
  return (
    <div>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* About Section */}
      <AboutSection />

      {/* Recent Projects */}
      <FeaturedProjects />

      <ServicesSection />

      {/* Clients Map */}
      <ClientsMap />
    </div>
  );
}
