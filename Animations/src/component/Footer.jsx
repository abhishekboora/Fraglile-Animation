import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState(null);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.footer 
      className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-center py-6 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#E43E5A] opacity-10"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.5, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Navigation Links */}
        <motion.nav 
          className="mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ul className="flex flex-wrap justify-center gap-4 md:gap-8">
            {links.map((link, index) => (
              <motion.li 
                key={link.name}
                className="relative"
                onHoverStart={() => setHoveredLink(index)}
                onHoverEnd={() => setHoveredLink(null)}
              >
                <Link 
                  to={link.path}
                  className="relative px-2 py-1 text-gray-300 hover:text-white text-sm md:text-base font-medium transition-colors duration-300"
                >
                  {link.name}
                  <AnimatePresence>
                    {hoveredLink === index && (
                      <motion.span 
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#E43E5A] to-[#CDBBA4]"
                        layoutId="footerLink"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        exit={{ width: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* Copyright */}
        <motion.div
          className="pt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-500 text-xs md:text-sm">
            &copy; {new Date().getFullYear()} Fragile Animations. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
