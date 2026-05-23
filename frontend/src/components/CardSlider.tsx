import { useRef, useState, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface CardSliderProps {
  children: ReactNode;
}

export default function CardSlider({ children }: CardSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [children]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 336; // card width + gap
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative group">
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
            w-10 h-10 items-center justify-center rounded-full
            bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10
            text-white transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label="Scroll left"
        >
          <IoChevronBack size={20} />
        </button>
      )}

      {/* Scrollable Container */}
      <motion.div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-1 items-stretch"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </motion.div>

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
            w-10 h-10 items-center justify-center rounded-full
            bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10
            text-white transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label="Scroll right"
        >
          <IoChevronForward size={20} />
        </button>
      )}
    </div>
  );
}
