import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import bgVideo from "../assets/animation.mp4";
import chars1 from "../assets/img35.jpg";
import chars2 from "../assets/img36.jpg";
import chars3 from "../assets/img37.jpg";
import chars4 from "../assets/img38.jpg";
import chars5 from "../assets/img39.jpg";

// 3D Carousel Component for Characters
function CharacterCarousel({ items }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [current, setCurrent] = useState(0);
  const width = isMobile ? 250 : 300;
  const gap = isMobile ? 15 : 30;

  // Auto-rotate the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % items.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [items.length]);

  const currentItem = items[current];
  const prevItem = items[(current - 1 + items.length) % items.length];
  const nextItem = items[(current + 1) % items.length];

  const visibleItems = isMobile 
    ? [currentItem] 
    : [prevItem, currentItem, nextItem];

  return (
    <div className="relative w-full h-[400px] md:h-[450px] flex items-center justify-center overflow-hidden">
      {visibleItems.map((item, index) => {
        const isCenter = index === (isMobile ? 0 : 1);
        
        return (
          <motion.div
            key={item.name}
            className="absolute bg-white/95 rounded-2xl shadow-2xl overflow-hidden cursor-pointer"
            style={{
              width: isMobile ? width : (isCenter ? width : width * 0.8),
              height: isMobile ? 350 : (isCenter ? 380 : 300),
              x: isMobile ? 0 : (index - 1) * (width * 0.7),
              zIndex: isCenter ? 10 : 5,
            }}
            initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
            animate={{ 
              opacity: isMobile ? 1 : (isCenter ? 1 : 0.7),
              scale: isMobile ? 1 : (isCenter ? 1 : 0.85),
              rotateY: isMobile ? 0 : (isCenter ? 0 : (index === 0 ? -15 : 15))
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              zIndex: 20,
              rotateY: 0,
              transition: { duration: 0.3 }
            }}
            onClick={() => {
              if (!isMobile && !isCenter) {
                setCurrent((current + index - 1 + items.length) % items.length);
              }
            }}
          >
            <div className="relative w-full h-full">
              <motion.img
                src={item.image}
                alt={item.name}
                className="w-full h-4/5 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h3 className="text-lg md:text-xl font-bold text-[#E43E5A] mb-1 drop-shadow-lg">
                  {item.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-700 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
      
      {/* Mobile navigation dots */}
      {isMobile && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                current === index ? 'bg-[#E43E5A] w-6' : 'bg-white/60'
              }`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      )}

      {/* Desktop navigation arrows */}
      {!isMobile && (
        <>
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#E43E5A]/80 hover:bg-[#E43E5A] text-white rounded-full w-12 h-12 flex items-center justify-center z-20 transition-all"
            onClick={() => setCurrent((current - 1 + items.length) % items.length)}
          >
            ←
          </button>
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#E43E5A]/80 hover:bg-[#E43E5A] text-white rounded-full w-12 h-12 flex items-center justify-center z-20 transition-all"
            onClick={() => setCurrent((current + 1) % items.length)}
          >
            →
          </button>
        </>
      )}
    </div>
  );
}

const characters = [
  {
    name: "Leo",
    image: chars1,
    description: "A friendly and playful boy with a love for adventure.",
  },
  {
    name: "Brushy",
    image: chars2,
    description: "A cheerful and energetic toothbrush character.",
  },
  {
    name: "Zyggy",
    image: chars3,
    description: "A whimsical and friendly monster.",
  },
  {
    name: "Ginger",
    image: chars4,
    description: "A curious and friendly orange tabby cat.",
  },
  {
    name: "Lily",
    image: chars5,
    description: "A sweet and cheerful girl with a love for flowers.",
  },
];

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);
  const ySpring = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPct = (clientX - innerWidth / 2) / innerWidth;
      const yPct = (clientY - innerHeight / 2) / innerHeight;
      x.set(xPct * 20);
      ySpring.set(yPct * 20);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, ySpring]);

  return (
    <>
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="relative h-[100vh] overflow-hidden bg-gradient-to-br from-[#2a1a1a] via-[#3a223a] to-[#1a1a2a]"
        style={{ y, opacity, scale }}
      >
        <div className="absolute inset-0 z-5">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#E43E5A] rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-15, 15, -15],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.video
          autoPlay
          loop
          muted
          preload="auto"
          className="absolute w-full h-full object-cover z-0 opacity-60"
          src={bgVideo}
          style={{ x, y: ySpring }}
        />

        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-radial from-[#E43E5A]/20 to-transparent pointer-events-none z-5"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white bg-black/60 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.h1
              className="text-4xl md:text-7xl font-extrabold mb-4 drop-shadow-lg bg-gradient-to-r from-[#E43E5A] to-[#CDBBA4] bg-clip-text text-transparent" 
              style={{
                lineHeight: 1.1, 
                paddingBottom: '0.2em',
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Welcome to Fragile Animations
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 50, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            className="text-lg md:text-2xl text-gray-200 max-w-2xl drop-shadow mb-8"
          >
            Crafting charming stories and worlds through the magic of animation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              onClick={() => navigate("/services")}
              className="px-8 py-4 bg-gradient-to-r from-[#E43E5A] to-[#CDBBA4] text-white font-bold rounded-full shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(228, 62, 90, 0.5)",
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Work
            </motion.button>

            <motion.button
              onClick={() => navigate("/contact")}
              className="px-8 py-4 border-2 border-[#E43E5A] text-[#E43E5A] font-bold rounded-full hover:bg-[#E43E5A] hover:text-white transition-all duration-300"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#E43E5A",
                color: "white",
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Characters Section */}
      <motion.div 
        className="min-h-screen w-full py-20 px-4 md:px-8 bg-gradient-to-br from-[#1a1a2a] via-[#2a1a1a] to-[#3a223a] relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: "-200px" }}
      >
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                backgroundColor: Math.random() > 0.5 ? '#E43E5A' : '#CDBBA4',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-40, 40, -40],
                x: [-30, 30, -30],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 2.5, 0.5],
                rotate: [0, 360, 0],
              }}
              transition={{
                duration: Math.random() * 6 + 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute border-2 border-[#E43E5A]/20"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 90}%`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0%',
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 8,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-center text-white mb-16"
            initial={{ opacity: 0, y: -50, rotateX: -90 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-[#E43E5A] to-[#CDBBA4] bg-clip-text "
              style={{
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 30px rgba(228, 62, 90, 0.8)"
              }}
            >
              Just Rolled Out 🚀
            </motion.span>
          </motion.h2>

          {/* Character Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <CharacterCarousel items={characters} />
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => navigate("/services")}
              className="px-10 py-4 bg-gradient-to-r from-[#CDBBA4] to-[#E43E5A] text-white font-bold rounded-full shadow-xl text-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(205, 187, 164, 0.5)",
                y: -3,
              }}
              whileTap={{ scale: 0.95 }}
            >
              Discover More Characters
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}