import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Folder,  Mail, ArrowUpRight, Sparkles } from 'lucide-react';

const EnhancedNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Scroll tracking & Active Section logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / totalHeight) * 100;
      setScrollProgress(progress);

      const sections = ['home', 'about', 'resume', 'portfolio', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const navItems = [
    { name: 'Home', href: '#home', id: 'home', icon: Home },
    { name: 'About', href: '#about', id: 'about', icon: User },
    { name: 'Resume', href: '#resume', id: 'resume', icon: Briefcase },
    { name: 'Portfolio', href: '#portfolio', id: 'portfolio', icon: Folder },
    { name: 'Contact', href: '#contact', id: 'contact', icon: Mail },
  ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, scale: 0.92, y: -30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.34, 1.56, 0.64, 1],
        staggerChildren: 0.1,
        delayChildren: 0.1
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.92, 
      y: -30, 
      transition: { duration: 0.3 } 
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 10 },
  };

  return (
    <>
      {/* ── Animated Scroll Progress Bar ── */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 z-[60] origin-left"
        style={{ 
          scaleX: scrollProgress / 100,
          background: 'linear-gradient(90deg, #c0c0c0, #f5f5f5)'
        }}
      />

      {/* ── Main Navbar ── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handleMouseMove}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-gradient-to-b from-[#111111]/95 to-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#262626]/40 shadow-2xl' 
            : 'bg-gradient-to-b from-[#1a1a1a]/20 to-transparent border-b border-transparent'
        }`}
      >
        {/* Animated Glow Effect */}
        {scrolled && (
          <motion.div
            className="absolute inset-0 opacity-0"
            animate={{
              boxShadow: [
                'inset 0 1px 0 rgba(192, 192, 192, 0.1)',
                'inset 0 1px 0 rgba(192, 192, 192, 0.2)',
                'inset 0 1px 0 rgba(192, 192, 192, 0.1)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* ── Logo / Brand Name ── */}
            <motion.a 
              href="#home" 
              className="flex-shrink-0 flex items-center gap-2 group relative"
              whileHover="hover"
              initial="rest"
            >
              {/* Animated Background Glow */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-[#c0c0c0]/20 to-[#f5f5f5]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />

              <motion.div 
                whileHover={{ scale: 1.1, rotate: 8 }}
                whileTap={{ scale: 0.92 }}
                className="relative w-10 h-10 bg-gradient-to-br from-[#c0c0c0] to-[#d4d4d4] rounded-2xl flex items-center justify-center shadow-xl shadow-[#c0c0c0]/20 transition-all duration-300"
              >
                <span className="text-[#0a0a0a] font-bold text-xl font-display">Y</span>
              </motion.div>

              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-tight group-hover:text-[#c0c0c0] transition-colors duration-300 font-display">
                  Yash
                </span>
                <motion.span 
                  className="text-xs text-[#737373] font-medium tracking-widest"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Creative
                </motion.span>
              </div>
            </motion.a>

            {/* ── Desktop Navigation Links ── */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <motion.a
                      href={item.href}
                      className="relative px-4 py-2.5 text-sm font-semibold transition-colors duration-300 rounded-xl flex items-center gap-2 group"
                      whileHover="hover"
                      initial="rest"
                      variants={{
                        rest: { y: 0 },
                        hover: { y: -2 }
                      }}
                    >
                      {/* Animated Active Background */}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-active-pill"
                          className="absolute inset-0 bg-gradient-to-r from-[#c0c0c0]/15 to-[#f5f5f5]/10 rounded-xl border border-[#c0c0c0]/30 -z-10"
                          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                        />
                      )}

                      {/* Icon */}
                      <motion.div
                        variants={iconVariants}
                        initial="rest"
                        whileHover="hover"
                      >
                        <Icon className={`w-4 h-4 transition-colors duration-300 ${
                          isActive ? 'text-[#c0c0c0]' : 'text-[#737373] group-hover:text-[#c0c0c0]'
                        }`} />
                      </motion.div>

                      {/* Text */}
                      <span className={`relative z-10 transition-all duration-300 ${
                        isActive 
                          ? 'text-[#c0c0c0]' 
                          : 'text-[#e5e5e5] group-hover:text-[#c0c0c0]'
                      }`}>
                        {item.name}
                      </span>

                      {/* Hover Underline */}
                      <motion.div
                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-[#c0c0c0]/0 via-[#c0c0c0] to-[#c0c0c0]/0"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  </motion.div>
                );
              })}
            </div>

            {/* ── Premium CTA Button ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden md:flex"
            >
              <motion.a
                href="#contact"
                whileHover="hover"
                initial="rest"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.05 }
                }}
                whileTap={{ scale: 0.92 }}
                className="relative px-6 py-2.5 bg-gradient-to-r from-[#c0c0c0] to-[#d4d4d4] hover:from-[#d4d4d4] hover:to-[#f5f5f5] text-[#0a0a0a] text-sm font-bold rounded-xl transition-all duration-300 shadow-xl shadow-[#c0c0c0]/20 hover:shadow-2xl hover:shadow-[#c0c0c0]/40 flex items-center gap-2 group overflow-hidden"
              >
                {/* Animated Background Shine */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['0%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Hire Me
                </span>
                <motion.div
                  variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="w-4 h-4 relative z-10" />
                </motion.div>
              </motion.a>
            </motion.div>

            {/* ── Mobile Menu Button ── */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl text-[#e5e5e5] hover:text-[#c0c0c0] hover:bg-[#262626]/50 transition-all duration-300"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Navigation Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-lg z-30 md:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-24 left-4 right-4 z-40 bg-gradient-to-b from-[#1a1a1a]/95 to-[#111111]/95 backdrop-blur-2xl border border-[#262626]/60 rounded-3xl shadow-2xl md:hidden overflow-hidden"
            >
              <div className="p-6 space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <motion.a
                      key={item.name}
                      variants={menuItemVariants}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-[#c0c0c0]/20 to-[#f5f5f5]/10 border border-[#c0c0c0]/30 text-[#c0c0c0]' 
                          : 'text-[#e5e5e5] hover:text-[#c0c0c0] hover:bg-[#262626]/40'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.15, rotate: 10 }}
                        >
                          <Icon className={`w-5 h-5 transition-colors duration-300 ${
                            isActive ? 'text-[#c0c0c0]' : 'text-[#737373] group-hover:text-[#c0c0c0]'
                          }`} />
                        </motion.div>
                        <span className="font-semibold text-base">{item.name}</span>
                      </div>
                      {isActive && (
                        <motion.div 
                          layoutId="mobile-active-dot" 
                          className="w-2.5 h-2.5 bg-[#c0c0c0] rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.a>
                  );
                })}
                
                <motion.div variants={menuItemVariants} className="pt-4 mt-4 border-t border-[#262626]/50">
                  <motion.a
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-gradient-to-r from-[#c0c0c0] to-[#d4d4d4] hover:from-[#d4d4d4] hover:to-[#f5f5f5] text-[#0a0a0a] font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-[#c0c0c0]/20 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['0%', '200%'] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Hire Me
                    </span>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedNavbar;