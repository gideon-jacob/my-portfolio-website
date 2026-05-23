import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMenu, IoClose } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import {
  SiLeetcode,
  SiCodechef,
  SiGithub,
} from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SECTION_IDS } from '../utils/constants';

const navLinks = [
  { id: SECTION_IDS.home, label: 'Home', icon: null },
  { id: SECTION_IDS.leetcode, label: 'LeetCode', icon: SiLeetcode },
  { id: SECTION_IDS.codechef, label: 'CodeChef', icon: SiCodechef },
  { id: SECTION_IDS.github, label: 'GitHub', icon: SiGithub },
  { id: SECTION_IDS.linkedin, label: 'LinkedIn', icon: FaLinkedin },
  { id: SECTION_IDS.twitter, label: 'Twitter', icon: FaXTwitter },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-end h-16">

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(link => (
              <Button
                key={link.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollTo(link.id)}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-muted-foreground hover:text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(link => (
                <Button
                  key={link.id}
                  variant="ghost"
                  onClick={() => scrollTo(link.id)}
                  className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
