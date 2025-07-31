import { useEffect, useState } from "react";
import { AnimatePresence, motion,useTransform, useScroll } from "framer-motion";
import { useMediaQuery } from 'react-responsive';
import chars1 from "../assets/img35.jpg";
import chars2 from "../assets/img36.jpg";
import chars3 from "../assets/img37.jpg";
import chars4 from "../assets/img38.jpg";
import chars5 from "../assets/img39.jpg";
import chars6 from "../assets/img40.jpg";
import livingRoom from "../assets/img41.jpg";
import bathroom from "../assets/img42.jpg";
import mountain from "../assets/img43.jpg";

// Enhanced 3D Carousel Component with scroll and drag functionality
function Enhanced3DCarousel({ items }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [current, setCurrent] = useState(0);
  
  const CARD_SIZE = isMobile ? 200 : 280;
  const SPACING = isMobile ? 30 : 50;
  const VISIBLE_CARDS = isMobile ? 1 : 3;
  
  // Calculate positions for 3D effect
  const radius = isMobile ? 250 : 320;
  const center = Math.floor(items.length / 2);
  
  // Auto-rotate with pause on hover
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrent(prev => (prev + 1) % items.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [items.length, isHovered]);

  // Calculate 3D positions
  const getCardStyle = (index) => {
    const relativeIndex = (index - current + items.length) % items.length;
    const angle = (relativeIndex / items.length) * Math.PI * 2;
    
    if (isMobile) {
      return {
        x: relativeIndex === 0 ? 0 : relativeIndex < items.length / 2 ? -300 : 300,
        rotateY: 0,
        z: 0,
        opacity: relativeIndex === 0 ? 1 : 0,
        scale: 1,
      };
    }
    
    const z = Math.cos(angle) * radius;
    const x = Math.sin(angle) * radius;
    const rotateY = (angle * 180) / Math.PI;
    
    return {
      x: x,
      z: z,
      rotateY: rotateY,
      opacity: Math.abs(relativeIndex - center) <= 2 ? 1 : 0.3,
      scale: z > 0 ? 1 + z / 1000 : 0.7 + z / 800,
    };
  };

  return (
    <div 
      className="relative w-full h-[450px] md:h-[500px] flex items-center justify-center overflow-hidden perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Stage */}
      <div className="relative w-full h-full transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
        {items.map((item, index) => {
          const style = getCardStyle(index);
          const isActive = index === current;
          
          return (
            <motion.div
              key={item.name}
              className={`absolute w-[200px] md:w-[280px] h-[300px] md:h-[380px] cursor-pointer ${
                isActive ? 'z-20' : 'z-10'
              }`}
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: 'center center',
              }}
              animate={{
                x: style.x,
                z: style.z,
                rotateY: style.rotateY,
                opacity: style.opacity,
                scale: style.scale,
                marginLeft: -(CARD_SIZE / 2),
                marginTop: -(190),
              }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.25, 0.25, 1],
                type: "spring",
                stiffness: 100,
                damping: 30,
              }}
              whileHover={{
                scale: style.scale * 1.05,
                rotateY: style.rotateY * 0.8,
                z: style.z + 50,
                transition: { duration: 0.3 }
              }}
              onClick={() => setCurrent(index)}
            >
              {/* Card Container */}
              <motion.div
                className="w-full h-full bg-gradient-to-br from-white via-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden relative"
                style={{
                  boxShadow: isActive 
                    ? '0 25px 50px -12px rgba(228, 62, 90, 0.4), 0 0 30px rgba(228, 62, 90, 0.3)' 
                    : '0 20px 40px -12px rgba(0, 0, 0, 0.3)',
                }}
                whileHover={{
                  boxShadow: '0 35px 70px -12px rgba(228, 62, 90, 0.5), 0 0 40px rgba(228, 62, 90, 0.4)',
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
                
                {/* Character Image */}
                <motion.div 
                  className="relative w-full h-3/4 overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    style={{
                      filter: isActive ? 'brightness(1.1) contrast(1.1)' : 'brightness(0.9)',
                    }}
                    animate={{
                      filter: isActive ? 'brightness(1.1) contrast(1.1)' : 'brightness(0.9)',
                    }}
                  />
                  
                  {/* Floating Elements */}
                  {isActive && (
                    <motion.div
                      className="absolute top-4 right-4 w-3 h-3 bg-[#E43E5A] rounded-full"
                      animate={{
                        y: [-5, 5, -5],
                        opacity: [0.7, 1, 0.7],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.div>

                {/* Character Info */}
                <motion.div 
                  className="relative z-20 p-3 md:p-4 h-1/4 flex flex-col justify-center"
                  animate={{
                    y: isActive ? 0 : 10,
                    opacity: isActive ? 1 : 0.8,
                  }}
                >
                  <motion.h3 
                    className="text-lg md:text-xl font-bold mb-1 bg-gradient-to-r from-[#E43E5A] to-[#CDBBA4] bg-clip-text text-transparent"
                    animate={{
                      scale: isActive ? 1 : 0.95,
                    }}
                  >
                    {item.name}
                  </motion.h3>
                  <motion.p 
                    className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3"
                    animate={{
                      opacity: isActive ? 1 : 0.7,
                    }}
                  >
                    {item.description}
                  </motion.p>
                </motion.div>

                {/* Interactive Elements */}
                {isActive && (
                  <motion.div
                    className="absolute top-4 left-4"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-[#E43E5A]/20 to-[#CDBBA4]/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <motion.div
                        className="w-2 h-2 bg-[#E43E5A] rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-30">
        {/* Previous Button */}
        <motion.button
          className="w-10 h-10 bg-gradient-to-r from-[#E43E5A] to-[#CDBBA4] rounded-full flex items-center justify-center text-white font-bold shadow-lg"
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(228, 62, 90, 0.5)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrent((current - 1 + items.length) % items.length)}
        >
          ←
        </motion.button>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {items.map((_, index) => (
            <motion.button
              key={index}
              className={`h-2 rounded-full transition-all ${
                current === index 
                  ? 'w-6 bg-gradient-to-r from-[#E43E5A] to-[#CDBBA4]' 
                  : 'w-2 bg-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          className="w-10 h-10 bg-gradient-to-r from-[#CDBBA4] to-[#E43E5A] rounded-full flex items-center justify-center text-white font-bold shadow-lg"
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(205, 187, 164, 0.5)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrent((current + 1) % items.length)}
        >
          →
        </motion.button>
      </div>
    </div>
  );
}

// Floating Scene Card Component
function FloatingSceneCard({ scene, index, hoveredScene, setHoveredScene }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  return (
    <motion.div
      className="bg-gradient-to-br from-[#fff] via-[#fff] to-gray-50 rounded-2xl shadow-xl overflow-hidden cursor-pointer group relative"
      initial={{ opacity: 0, y: 100, rotateX: -45 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        delay: index * 0.15, 
        duration: 0.8,
        type: "spring",
        stiffness: 100 
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ 
        scale: 1.03,
        rotateY: mousePos.x * 0.1,
        rotateX: -mousePos.y * 0.1,
        boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.3 }
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePos({ x, y });
      }}
      onHoverStart={() => setHoveredScene(index)}
      onHoverEnd={() => setHoveredScene(null)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-56">
        <motion.img
          src={scene.image}
          alt={scene.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.2, rotate: 2 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredScene === index ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Floating Particles */}
        {hoveredScene === index && (
          <div className="absolute inset-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#fff] rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 30}%`,
                }}
                animate={{
                  y: [-10, -20, -10],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <motion.div 
        className="p-6"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h3 
          className="text-xl font-bold mb-3 bg-gradient-to-r from-[#E43E5A] to-[#CDBBA4] bg-clip-text text-transparent"
          animate={{
            backgroundPosition: hoveredScene === index ? ["0% 50%", "100% 50%"] : "0% 50%",
          }}
          transition={{ duration: 1, repeat: hoveredScene === index ? Infinity : 0 }}
          style={{ backgroundSize: "200% 200%" }}
        >
          {scene.name}
        </motion.h3>
        <motion.p 
          className="text-gray-600 leading-relaxed"
          animate={{
            color: hoveredScene === index ? "#374151" : "#6B7280",
          }}
        >
          {scene.description}
        </motion.p>
      </motion.div>

      {/* Hover Effect Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent"
        animate={{
          borderImage: hoveredScene === index 
            ? "linear-gradient(45deg, #E43E5A, #CDBBA4, #E43E5A) 1"
            : "none",
        }}
        style={{
          borderImageSource: hoveredScene === index 
            ? "linear-gradient(45deg, #E43E5A, #CDBBA4, #E43E5A)"
            : "none",
        }}
      />
    </motion.div>
  );
}

const characters = [
  {
    name: "Leo",
    image: chars1,
    description: "A friendly and playful boy with a love for adventure and endless curiosity about the world around him.",
  },
  {
    name: "Brushy",
    image: chars2,
    description: "A cheerful and energetic toothbrush character who makes dental hygiene fun and exciting for children.",
  },
  {
    name: "Zyggy",
    image: chars3,
    description: "A whimsical and friendly monster who teaches kids that being different is something to celebrate.",
  },
  {
    name: "Ginger",
    image: chars4,
    description: "A curious and friendly orange tabby cat with a knack for getting into delightful mischief.",
  },
  {
    name: "Lily",
    image: chars5,
    description: "A sweet and cheerful girl with a love for flowers and the magical beauty of nature.",
  },
];

const scenes = [
  {
    name: "Dreamy Bedroom",
    image: chars6,
    description: "A cozy and imaginative bedroom with a pastel palette that sparks creativity and peaceful dreams.",
  },
  {
    name: "Vibrant Living Room",
    image: livingRoom,
    description: "A playful modern living room with cheerful tones that brings families together for memorable moments.",
  },
  {
    name: "Serene Bathroom",
    image: bathroom,
    description: "A clean, calming bathroom with earthy colors that makes daily routines feel like spa experiences.",
  },
  {
    name: "Tooth-Top Mountain",
    image: mountain,
    description: "A whimsical landscape with a giant molar mountain that makes dental health an adventure to explore.",
  },
];

export default function Services() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [hoveredScene, setHoveredScene] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { scrollYProgress } = useScroll();
  
  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <motion.div 
      className="min-h-screen w-full py-16 px-4 md:px-8 bg-gradient-to-br from-[#2a1a1a] via-[#3a223a] to-[#1a1a2a] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Enhanced Animated Background */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        {/* Primary Particles */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              backgroundColor: Math.random() > 0.6 ? '#E43E5A' : '#CDBBA4',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-50, 50, -50],
              x: [-30, 30, -30],
              opacity: [0.2, 0.9, 0.2],
              scale: [0.5, 2.5, 0.5],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Geometric Shapes */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            className="absolute border border-white/10"
            style={{
              width: Math.random() * 120 + 60,
              height: Math.random() * 120 + 60,
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              borderRadius: Math.random() > 0.5 ? '50%' : '10px',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.4, 0.1],
              borderColor: ['rgba(255,255,255,0.1)', 'rgba(228,62,90,0.3)', 'rgba(205,187,164,0.3)', 'rgba(255,255,255,0.1)'],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            animate={{
              textShadow: [
                "0 0 20px rgba(228, 62, 90, 0.5)",
                "0 0 40px rgba(205, 187, 164, 0.5)",
                "0 0 20px rgba(228, 62, 90, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-[#E43E5A] via-[#CDBBA4] to-[#E43E5A] bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 200%" }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Meet Our Characters
            </motion.span>
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Discover the magical world of our beloved characters, each crafted with love and brought to life through stunning animation.
          </motion.p>
        </motion.div>

        {/* Enhanced 3D Carousel */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <Enhanced3DCarousel items={characters} />
        </motion.div>

        {/* Character Modal with Enhanced Animations */}
        <AnimatePresence>
          {selectedCharacter && (
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCharacter(null)}
            >
              <motion.div
                className="bg-gradient-to-br from-white via-white to-gray-50 rounded-3xl p-8 max-w-lg w-full mx-4 relative overflow-hidden"
                initial={{ scale: 0.3, rotateY: -180, opacity: 0 }}
                animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                exit={{ scale: 0.3, rotateY: 180, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Animated Background */}
                <div className="absolute inset-0">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-[#E43E5A] to-[#CDBBA4] rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>

                <motion.img
                  src={selectedCharacter.image}
                  alt={selectedCharacter.name}
                  className="w-full h-80 object-cover rounded-2xl mb-6 relative z-10"
                  initial={{ scale: 0.8, opacity: 0, rotateX: -30 }}
                  animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                />
                
                <motion.h3 
                  className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#E43E5A] to-[#CDBBA4] bg-clip-text text-transparent relative z-10"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {selectedCharacter.name}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-700 mb-8 leading-relaxed relative z-10"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {selectedCharacter.description}
                </motion.p>
                
                <motion.button
                  className="w-full bg-gradient-to-r from-[#E43E5A] to-[#CDBBA4] text-white py-4 rounded-2xl font-bold text-lg relative z-10"
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(228, 62, 90, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCharacter(null)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Scenes Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-center text-white mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-[#CDBBA4] via-[#E43E5A] to-[#CDBBA4] bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 200%" }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Explore Our Scenes
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-300 text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Step into beautifully crafted environments where stories come alive and imagination knows no bounds.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {scenes.map((scene, index) => (
              <FloatingSceneCard
                key={index}
                scene={scene}
                index={index}
                hoveredScene={hoveredScene}
                setHoveredScene={setHoveredScene}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}