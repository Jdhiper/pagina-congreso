import AboutCongress from "@/components/sections/AboutCongress";
import Hero from "@/components/sections/Hero";
import Topics from "@/components/sections/Topics";
import QuickAccess from "@/components/sections/QuickAccess";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <QuickAccess />
      <AboutCongress />
      <Topics />
    </>
  );
}