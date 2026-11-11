import { GrainGradient } from "@paper-design/shaders-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import BlogSection from "./components/BlogSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <GrainGradient
        className="fixed inset-0 w-full h-full object-cover pointer-events-none -z-10"
        colors={["#3e6274"]}
        colorBack="#0e0d16"
        softness={1}
        intensity={1}
        noise={1}
        shape="corners"
        speed={0}
        scale={0.88}
        rotation={88}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <BlogSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
