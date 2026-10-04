import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import heroImages from "../../assets/hero-images/heroImages.json";
import ImageStream from "../ui/ImageStream";

const Hero = () => {
  const imageModules = import.meta.glob(
    "../../assets/hero-images/*.{jpg,jpeg,png,webp,avif}",
    {
      eager: true,
      query: "?url",
      import: "default",
    },
  );

  const streamImages = heroImages
    .map((image) => {
      const imagePath = `../../assets/hero-images/${image.file}`;

      return {
        src: imageModules[imagePath],
        alt: image.alt,
      };
    })
    .filter((image) => image.src);

  // Small twinkling stars
  const stars = Array.from({ length: 500 }).map((_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 1.8 + 0.5,
    delay: Math.random() * 6,
    duration: Math.random() * 4 + 2,
    opacity: Math.random() * 0.5 + 0.4,
  }));

  // Bright larger stars
  const brightStars = Array.from({ length: 50 }).map((_, i) => ({
    id: `bright-${i}`,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));

  // Colored stars — lime tints matching theme
  const coloredStars = Array.from({ length: 35 }).map((_, i) => {
    const colors = ["#a3e741", "#bef264", "#d9f99d", "#84cc16"];
    return {
      id: `color-${i}`,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 1.5 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  });

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* ── FIXED GALAXY BACKGROUND ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* 1. Deep space base — dark with lime tint */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, #0a1505 0%, #050a02 50%, #000000 100%)",
          }}
        />

        {/* 2. Milky Way diagonal band — LIME GREEN */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 120% 35% at 20% 30%, rgba(163, 231, 65, 0.45) 0%, transparent 55%),
              radial-gradient(ellipse 100% 30% at 45% 45%, rgba(190, 242, 100, 0.55) 0%, transparent 55%),
              radial-gradient(ellipse 110% 40% at 70% 60%, rgba(132, 204, 22, 0.40) 0%, transparent 60%),
              radial-gradient(ellipse 90% 25% at 90% 75%, rgba(101, 163, 13, 0.35) 0%, transparent 60%)
            `,
            transform: "rotate(-25deg) scale(1.4)",
            filter: "blur(30px)",
          }}
        />

        {/* 3. Warm core glow — lime yellow */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 60% 20% at 40% 40%, rgba(217, 249, 157, 0.35) 0%, transparent 60%),
              radial-gradient(ellipse 50% 18% at 55% 48%, rgba(254, 249, 195, 0.30) 0%, transparent 60%),
              radial-gradient(ellipse 40% 15% at 70% 55%, rgba(190, 242, 100, 0.30) 0%, transparent 60%)
            `,
            transform: "rotate(-25deg) scale(1.4)",
            filter: "blur(25px)",
          }}
        />

        {/* 4. Nebula colors — lime + soft green */}
        <div
          className="absolute inset-0 opacity-50 mix-blend-screen"
          style={{
            backgroundImage: `
              radial-gradient(circle 400px at 25% 35%, rgba(163, 231, 65, 0.30) 0%, transparent 70%),
              radial-gradient(circle 350px at 60% 50%, rgba(190, 242, 100, 0.25) 0%, transparent 70%),
              radial-gradient(circle 300px at 80% 65%, rgba(132, 204, 22, 0.22) 0%, transparent 70%),
              radial-gradient(circle 280px at 40% 70%, rgba(217, 249, 157, 0.18) 0%, transparent 70%)
            `,
          }}
        />

        {/* 5. Dust clouds — dark patches */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 300px 200px at 50% 42%, rgba(0, 0, 0, 0.7) 0%, transparent 70%),
              radial-gradient(ellipse 250px 180px at 35% 38%, rgba(0, 0, 0, 0.6) 0%, transparent 70%)
            `,
            transform: "rotate(-25deg)",
            filter: "blur(40px)",
          }}
        />

        {/* 6. Bright core glow — lime */}
        <div
          className="absolute top-[40%] left-[45%] w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(217, 249, 157, 0.4) 0%, rgba(163, 231, 65, 0.25) 30%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* 7. Small stars */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <span
              key={star.id}
              className="absolute rounded-full bg-white animate-star-twinkle"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
                opacity: star.opacity,
                boxShadow: "0 0 3px rgba(255,255,255,0.7)",
              }}
            />
          ))}
        </div>

        {/* 8. Bright stars */}
        <div className="absolute inset-0">
          {brightStars.map((star) => (
            <span
              key={star.id}
              className="absolute rounded-full bg-white animate-star-twinkle"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
                boxShadow:
                  "0 0 6px 2px rgba(255,255,255,0.9), 0 0 14px 4px rgba(163,231,65,0.5)",
              }}
            />
          ))}
        </div>

        {/* 9. Colored stars — lime tints */}
        <div className="absolute inset-0">
          {coloredStars.map((star) => (
            <span
              key={star.id}
              className="absolute rounded-full animate-star-twinkle"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
                backgroundColor: star.color,
                boxShadow: `0 0 5px ${star.color}`,
              }}
            />
          ))}
        </div>

        {/* ── 10. IMAGE STREAM (slides) — stars ke upar ── */}
        <div className="absolute inset-0 opacity-80 pointer-events-none">
          <ImageStream
            images={streamImages}
            cards={9}
            speed={18}
            className="absolute inset-0"
          />
        </div>

        {/* 11. Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* 12. Text overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative text-center max-w-4xl mx-auto"
        >
          {/* Subtle readability glow behind hero text */}
          <div
            className="absolute -inset-x-20 -inset-y-10 -z-10 rounded-[40%] bg-black/20 blur-3xl"
            aria-hidden="true"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/75 text-sm sm:text-base mb-6 font-medium tracking-[0.12em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          >
            Graphic & UI/UX Designer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-2xl"
          >
            Crafting Impactful Experiences.
            <br />
            <span className="text-accent">Designing With Purpose.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-[0_3px_14px_rgba(0,0,0,0.9)]"
          >
            A hero that leads with the images instead of describing them.
            Creating visual experiences that captivate and inspire.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="group px-8 py-4 bg-white hover:bg-accent-hover text-black font-bold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-glow hover:scale-105">
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="px-8 py-4 border-2 border-white/30 hover:border-accent text-white hover:text-accent font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm hover:bg-white/5">
              Contact Me
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-gray-400"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
