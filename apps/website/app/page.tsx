import HeroCarousel from "@/app/components/HeroCarousel";
import AboutSection from "@/app/components/AboutSection";
import { FeaturedProjects } from "@/app/components/FeaturedProjects";
import ServicesSection from "./components/ServicesSection";

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

      <section className="py-32 px-6 bg-[#F2F2F2]">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-[#212121]">Section 2</h2>
          <p className="text-lg mb-4 text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className="text-lg text-gray-700">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
      </section>
    </div>
  );
}
