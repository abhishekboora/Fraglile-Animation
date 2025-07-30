import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function About() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const teamMembers = [
    {
      name: "Creative Director",
      role: "Visionary Leader",
      description: "Leading our creative vision with passion and innovation.",
      icon: ""
    },
    {
      name: "Animation Lead",
      role: "Master Animator",
      description: "Bringing characters to life with fluid, expressive motion.",
      icon: ""
    },
    {
      name: "Story Developer",
      role: "Narrative Architect",
      description: "Crafting compelling stories that resonate with audiences.",
      icon: ""
    },
    {
      name: "Technical Director",
      role: "Innovation Expert",
      description: "Pushing the boundaries of animation technology.",
      icon: ""
    }
  ];

  const values = [
    {
      title: "Creativity",
      description: "We believe in the power of imagination to transform ideas into magical experiences.",
      icon: ""
    },
    {
      title: "Quality",
      description: "Every frame, every movement, every detail is crafted with meticulous attention.",
      icon: ""
    },
    {
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible in animation.",
      icon: ""
    },
    {
      title: "Collaboration",
      description: "Great animations are born from the synergy of talented minds working together.",
      icon: ""
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-[#E43E5A] to-[#CDBBA4] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-50, 50, -50],
              x: [-30, 30, -30],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20"
          style={{ y, opacity }}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-[#E43E5A] to-[#CDBBA4] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -50, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.span
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 30px rgba(228, 62, 90, 0.8)"
              }}
            >
              About Us
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            We are a passionate team dedicated to creating stunning and performant animations. 
            Our mission is to bring digital experiences to life through creative and innovative visual effects, 
            crafting stories that captivate and inspire audiences worldwide.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {["10+ Years", "500+ Projects", "50+ Awards", "Global Reach"].map((stat, index) => (
              <motion.div
                key={stat}
                className="bg-gradient-to-r from-[#E43E5A]/20 to-[#CDBBA4]/20 backdrop-blur-sm border border-[#E43E5A]/30 rounded-full px-6 py-3"
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: "rgba(228, 62, 90, 0.1)",
                  borderColor: "#E43E5A"
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              >
                <span className="text-[#CDBBA4] font-semibold">{stat}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Our Values Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#CDBBA4]"
            whileHover={{ 
              scale: 1.05,
              color: "#E43E5A"
            }}
          >
            Our Values
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center group cursor-pointer"
                initial={{ opacity: 0, y: 50, rotateY: -45 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  borderColor: "#E43E5A",
                  boxShadow: "0 20px 40px rgba(228, 62, 90, 0.2)"
                }}
                onHoverStart={() => setHoveredCard(`value-${index}`)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <motion.div 
                  className="text-4xl mb-4"
                  animate={{ 
                    rotate: hoveredCard === `value-${index}` ? 360 : 0,
                    scale: hoveredCard === `value-${index}` ? 1.2 : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {value.icon}
                </motion.div>
                <motion.h4 
                  className="text-xl font-bold mb-3 text-[#E43E5A] group-hover:text-[#CDBBA4]"
                  transition={{ duration: 0.3 }}
                >
                  {value.title}
                </motion.h4>
                <motion.p 
                  className="text-gray-400 text-sm group-hover:text-gray-300"
                  transition={{ duration: 0.3 }}
                >
                  {value.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#E43E5A]"
            whileHover={{ 
              scale: 1.05,
              color: "#CDBBA4"
            }}
          >
            Our Team
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-gradient-to-br from-[#E43E5A]/10 to-[#CDBBA4]/10 backdrop-blur-sm border border-[#E43E5A]/30 rounded-2xl p-6 text-center group cursor-pointer"
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  borderColor: "#CDBBA4",
                  boxShadow: "0 20px 40px rgba(205, 187, 164, 0.2)"
                }}
                onHoverStart={() => setHoveredCard(`team-${index}`)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <motion.div 
                  className="text-5xl mb-4"
                  animate={{ 
                    rotate: hoveredCard === `team-${index}` ? [0, -10, 10, 0] : 0,
                    scale: hoveredCard === `team-${index}` ? 1.2 : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {member.icon}
                </motion.div>
                <motion.h4 
                  className="text-xl font-bold mb-2 text-[#CDBBA4] group-hover:text-[#E43E5A]"
                  transition={{ duration: 0.3 }}
                >
                  {member.name}
                </motion.h4>
                <motion.p 
                  className="text-[#E43E5A] font-semibold mb-3 group-hover:text-[#CDBBA4]"
                  transition={{ duration: 0.3 }}
                >
                  {member.role}
                </motion.p>
                <motion.p 
                  className="text-gray-400 text-sm group-hover:text-gray-300"
                  transition={{ duration: 0.3 }}
                >
                  {member.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-xl md:text-2xl font-bold mb-4 text-white"
            whileHover={{ scale: 1.05 }}
          >
            Ready to Bring Your Vision to Life?
          </motion.h3>
          <motion.p 
            className="text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Let's collaborate to create something extraordinary. Our team is ready to transform your ideas into captivating animated experiences.
          </motion.p>
          <motion.button
            className="bg-gradient-to-r from-[#E43E5A] to-[#CDBBA4] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 30px rgba(228, 62, 90, 0.5)",
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}