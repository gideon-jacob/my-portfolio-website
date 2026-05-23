import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowUp } from 'react-icons/io5';
import {
  SiGithub,
  SiLeetcode,
  SiCodechef,
} from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { TooltipProvider } from '@/components/ui/tooltip';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LeetCodeSection from './components/sections/LeetCode';
import CodeChefSection from './components/sections/CodeChef';
import GitHubSection from './components/sections/GitHub';
import LinkedInSection from './components/sections/LinkedIn';
import TwitterSection from './components/sections/Twitter';
import { SOCIAL_LINKS } from './utils/constants';

const footerSocials = [
  { icon: SiGithub, url: SOCIAL_LINKS.github, label: 'GitHub' },
  { icon: SiLeetcode, url: SOCIAL_LINKS.leetcode, label: 'LeetCode' },
  { icon: SiCodechef, url: SOCIAL_LINKS.codechef, label: 'CodeChef' },
  { icon: FaLinkedin, url: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
  { icon: FaXTwitter, url: SOCIAL_LINKS.twitter, label: 'Twitter' },
];

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full
            bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10
            flex items-center justify-center text-white
            shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]
            transition-all duration-300 cursor-pointer"
          aria-label="Back to top"
        >
          <IoArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          {footerSocials.map(({ icon: Icon, url, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10
                text-white/50 hover:text-white transition-all duration-200
                border border-white/5 hover:border-white/10"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
        <p className="text-sm text-white/30">
          Gideon Jacob &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
        <Navbar />
        
        <main className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl pb-24 space-y-24">
          <Hero />
          <LeetCodeSection />
          <CodeChefSection />
          <GitHubSection />
          <LinkedInSection />
          <TwitterSection />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </TooltipProvider>
  );
}
