import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';

interface SectionWrapperProps {
  id: string;
  title: string;
  platformColor: string;
  platformIcon: IconType;
  children: ReactNode;
}

export default function SectionWrapper({
  id,
  title,
  platformColor,
  platformIcon: Icon,
  children,
}: SectionWrapperProps) {
  return (
    <section id={id} className="py-8 md:py-12">
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Icon className="text-3xl md:text-4xl" style={{ color: platformColor }} />
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">{title}</h2>
        </div>
        <div
          className="h-1 w-20 rounded-full ml-1"
          style={{ backgroundColor: platformColor }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
