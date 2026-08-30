import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import Pojects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <Pojects/>
      <Skills/>
      <About/>
      <Contact/>
      <Footer/>
    </main>
  );
}
