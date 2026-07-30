import { GrainGradient } from "@paper-design/shaders-react";
import Hero from "./components/Hero";
import About from "./components/About";

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
      <Hero />
      <About />
    </>
  );
}
