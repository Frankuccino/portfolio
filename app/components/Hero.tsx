import { GrainGradient } from "@paper-design/shaders-react";

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Background Ambient Gradient */}
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

      {/* Clean Native HTML Typography with Metallic Gradient & Overflow Padding */}
      <div className="relative z-10 flex flex-col items-center text-center select-none px-8 py-6">
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-normal pb-2 drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
          style={{
            background:
              "linear-gradient(135deg, #f8fafc 0%, #94a3b8 35%, #ffffff 50%, #475569 65%, #cbd5e1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Frank Angelo A. Malubag
        </h1>
        <p className=" text-2xl md:text-3xl font-medium tracking-wide text-slate-400">
          /Frankuccino Software Engineer
        </p>
      </div>
    </div>
  );
}
