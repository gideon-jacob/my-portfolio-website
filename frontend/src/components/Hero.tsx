import { motion } from 'framer-motion';
import {
  SiLeetcode,
  SiCodechef,
  SiGithub,
} from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { SOCIAL_LINKS, SECTION_IDS } from '../utils/constants';

const socialIcons = [
  { icon: SiGithub, url: SOCIAL_LINKS.github, label: 'GitHub', color: '#fff' },
  { icon: SiLeetcode, url: SOCIAL_LINKS.leetcode, label: 'LeetCode', color: '#FFA116' },
  { icon: SiCodechef, url: SOCIAL_LINKS.codechef, label: 'CodeChef', color: '#5B4638' },
  { icon: FaLinkedin, url: SOCIAL_LINKS.linkedin, label: 'LinkedIn', color: '#0A66C2' },
  { icon: FaXTwitter, url: SOCIAL_LINKS.twitter, label: 'Twitter', color: '#1DA1F2' },
];

export default function Hero() {
  return (
    <section
      id={SECTION_IDS.home}
      className="relative min-h-[80vh] flex items-center justify-center pt-20"
    >
      <div className="text-center max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center relative group"
        >
          {/* Animated Outer Glowing Border */}
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 via-green-400 to-teal-500 rounded-[2rem] blur-2xl opacity-30 group-hover:opacity-55 transition-opacity duration-500" />
          
          {/* Stylish Container */}
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative w-36 h-36 md:w-44 md:h-44 p-[3px] rounded-[2rem] bg-gradient-to-tr from-emerald-500 via-green-400 to-teal-500 shadow-2xl overflow-hidden cursor-pointer"
          >
            {/* Inner frame */}
            <div className="w-full h-full rounded-[1.8rem] bg-background overflow-hidden relative flex items-center justify-center">
              <img 
                src="/profile-image.png" 
                alt="Gideon Jacob" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>

        <div className="space-y-4">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Gideon Jacob S
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Software Developer · Obsessed with Great User and Developer Experience
          </motion.p>
        </div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {socialIcons.map(({ icon: Icon, url, label, color }) => (
            <Button
              key={label}
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 hover:bg-muted"
              asChild
            >
              <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon className="w-5 h-5" style={{ color }} />
              </a>
            </Button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
