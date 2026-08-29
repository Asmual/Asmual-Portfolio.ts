import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import Pojects from "@/components/sections/Projects";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <Pojects/>
      <About/>
      <Footer/>
    </main>
  );
}
