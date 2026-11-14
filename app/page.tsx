import type { Metadata } from "next";
import { canonical } from "./lib/siteUrl";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import BlogSection from "./components/BlogSection";
import Contact from "./components/Contact";

export const metadata: Metadata = {
  alternates: { canonical: canonical() },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <BlogSection />
      <Contact />
    </main>
  );
}
