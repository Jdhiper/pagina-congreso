import AboutCongress from "@/components/sections/AboutCongress";
import Hero from "@/components/sections/Hero";
import Topics from "@/components/sections/Topics";
import QuickAccess from "@/components/sections/QuickAccess";
import Venues from "@/components/sections/Venues";
import FeaturedSpeakers from "@/components/sections/FeaturedSpeakers";
import RegistrationCTA from "@/components/sections/RegistrationCTA";
import FAQ from "@/components/sections/FAQ";
import FlyersCarousel from "@/components/sections/FlyersCarousel";
import PartnersCarousel from "@/components/sections/PartnersCarousel";

export default function Home() {
  return (
    <>

      <Hero />

      <QuickAccess />

      <AboutCongress />

      <FlyersCarousel />

      <Topics />

      <Venues />

      <FeaturedSpeakers />

      <RegistrationCTA />

      <PartnersCarousel />

      <FAQ />

    </>
  );
}