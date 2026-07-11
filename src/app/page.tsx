import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { HomeShell } from "@/components/HomeShell";
import { getExperienceData } from "@/lib/content/loaders";

export default async function Home() {
  // Server-side data load: experience entries in both languages so the
  // client shell can switch languages without a roundtrip.
  const [experiencesEn, experiencesEs] = await Promise.all([
    getExperienceData("en"),
    getExperienceData("es"),
  ]);

  return (
    <HomeShell experiencesEn={experiencesEn} experiencesEs={experiencesEs}>
      <Navbar />
      <Hero />
      <About />
      <Stack />
      <Contact />
      <Footer />
    </HomeShell>
  );
}