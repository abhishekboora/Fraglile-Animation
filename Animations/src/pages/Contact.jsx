import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Contact.css'; // Custom animated background CSS

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const socialLinks = [
    { icon: 'fab fa-instagram', label: 'Instagram', href: 'https://www.instagram.com', color: '#E4405F' },
    { icon: 'fab fa-linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com', color: '#0077B5' },
    { icon: 'fab fa-facebook', label: 'Facebook', href: 'https://www.facebook.com', color: '#1877F2' },
    { icon: 'fab fa-twitter', label: 'Twitter', href: 'https://www.twitter.com', color: '#1DA1F2' },
    { icon: 'fab fa-youtube', label: 'YouTube', href: 'https://www.youtube.com', color: '#FF0000' },
     { icon: 'fas fa-envelope', label: 'Email', href: 'mailto:fragileaniamtion123@gmail.com', color: '#E43E5A' },
  ];

  const addressDetails = [
    { label: "Building", value: "Unit No 201, 203, 204, GD-ITL Northex Towers" },
    { label: "Floor", value: "2nd Floor" },
    { label: "Street/Road", value: "A9, Netaji Subhash Palace" },
    { label: "Locality", value: "Pitampura" },
  
    { label: "State", value: "Delhi" },
    { label: "PIN Code", value: "110034" }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-black text-white relative overflow-hidden animated-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-[#E43E5A] to-[#CDBBA4] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-40, 40, -40],
              x: [-25, 25, -25],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
        <motion.h2
          className="text-5xl md:text-7xl font-bold mb-16 text-center bg-gradient-to-r from-[#E43E5A] to-[#CDBBA4] bg-clip-text text-transparent"
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
            Contact Us
          </motion.span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Address */}
          <motion.div
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl shadow-2xl"
            initial={{ opacity: 0, x: -50, rotateY: -30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            whileHover={{ 
              scale: 1.02, 
              borderColor: "#E43E5A",
              boxShadow: "0 25px 50px rgba(228, 62, 90, 0.2)"
            }}
          >
            <motion.h3 
              className="text-3xl font-bold mb-8 text-[#E43E5A]"
              whileHover={{ 
                scale: 1.05,
                color: "#CDBBA4"
              }}
            >
              Our Location
            </motion.h3>
            <address className="space-y-6 not-italic">
              {addressDetails.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.6 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <motion.p 
                    className="font-semibold text-[#CDBBA4] group-hover:text-[#E43E5A] transition duration-300 mb-1"
                  >
                    {item.label}:
                  </motion.p>
                  <motion.p 
                    className="text-gray-300 group-hover:text-white transition duration-300 pl-2"
                  >
                    {item.value}
                  </motion.p>
                </motion.div>
              ))}
            </address>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.h3 
              className="text-3xl font-bold mb-8 text-[#CDBBA4]"
              whileHover={{ 
                scale: 1.05,
                color: "#E43E5A"
              }}
            >
              Get in Touch
            </motion.h3>
            
            <AnimatePresence>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-gradient-to-r from-[#E43E5A] to-[#CDBBA4] p-8 rounded-2xl text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="text-4xl mb-4"
                  >
                    ✨
                  </motion.div>
                  <h4 className="text-2xl font-bold mb-2">Thank You!</h4>
                  <p>We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <motion.form 
                  className="grid gap-6"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[
                    { name: 'name', placeholder: 'Your Name', type: 'text' },
                    { name: 'email', placeholder: 'Your Email', type: 'email' },
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                    >
                      <motion.input
                        name={field.name}
                        type={field.type}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        className="w-full p-4 bg-gray-900/80 backdrop-blur-sm border-2 border-gray-700 rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:border-[#E43E5A] focus:bg-gray-800"
                        placeholder={field.placeholder}
                        whileFocus={{ scale: 1.02 }}
                        animate={{
                          borderColor: focusedField === field.name ? '#E43E5A' : '#374151',
                          boxShadow: focusedField === field.name ? '0 0 20px rgba(228, 62, 90, 0.3)' : '0 0 0px rgba(0,0,0,0)'
                        }}
                        required
                      />
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#E43E5A]/20 to-[#CDBBA4]/20 opacity-0 pointer-events-none"
                        animate={{ opacity: focusedField === field.name ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                  
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                  >
                    <motion.textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-4 bg-gray-900/80 backdrop-blur-sm border-2 border-gray-700 rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:border-[#E43E5A] focus:bg-gray-800 resize-none"
                      placeholder="Your Message"
                      rows="5"
                      whileFocus={{ scale: 1.02 }}
                      animate={{
                        borderColor: focusedField === 'message' ? '#E43E5A' : '#374151',
                        boxShadow: focusedField === 'message' ? '0 0 20px rgba(228, 62, 90, 0.3)' : '0 0 0px rgba(0,0,0,0)'
                      }}
                      required
                    />
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#E43E5A]/20 to-[#CDBBA4]/20 opacity-0 pointer-events-none"
                      animate={{ opacity: focusedField === 'message' ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  
                  <motion.button
                    type="submit"
                    className="bg-gradient-to-r from-[#E43E5A] to-[#CDBBA4] text-white px-8 py-4 font-bold rounded-xl shadow-lg"
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 0 30px rgba(228, 62, 90, 0.5)",
                      y: -2
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                  >
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Let's Connect ✨
                    </motion.span>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-3xl md:text-4xl font-bold mb-10 text-[#CDBBA4]"
            whileHover={{ 
              scale: 1.05,
              color: "#E43E5A"
            }}
          >
            Follow Our Journey
          </motion.h3>
          
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.2, 
                  y: -10,
                  rotate: [0, -10, 10, 0]
                }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => setHoveredSocial(index)}
                onHoverEnd={() => setHoveredSocial(null)}
              >
                <motion.div
                  className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 flex items-center justify-center group-hover:border-[#E43E5A] transition-all duration-300"
                  animate={{
                    borderColor: hoveredSocial === index ? social.color : '#374151',
                    boxShadow: hoveredSocial === index ? `0 0 30px ${social.color}40` : '0 0 0px rgba(0,0,0,0)'
                  }}
                >
                  <motion.i 
                    className={`${social.icon} text-xl md:text-2xl text-gray-400 group-hover:text-white transition-colors duration-300`}
                    animate={{
                      color: hoveredSocial === index ? social.color : '#9CA3AF'
                    }}
                  />
                </motion.div>
                
                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredSocial === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: -5, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap"
                    >
                      {social.label}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
