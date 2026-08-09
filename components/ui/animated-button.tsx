'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AnimatedButtonInteraction = 'slide-arrow' | 'pulse';

interface AnimatedButtonProps {
  label: string;
  icon: LucideIcon;
  interaction?: AnimatedButtonInteraction;
  variant?: 'primary' | 'outline';
  size?: 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  onClick?: () => void;
}

const variantStyles = {
  primary:
    'bg-primary-container text-white hover:bg-primary hover:text-white shadow-sm',
  outline:
    'bg-white/50 backdrop-blur-sm border border-outline text-secondary hover:border-primary hover:text-primary',
};

const sizeStyles = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm',
};

export function AnimatedButton({
  label,
  icon: Icon,
  interaction = 'slide-arrow',
  variant = 'primary',
  size = 'lg',
  href,
  target,
  rel,
  className,
  onClick,
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setIsHovered(false);
    }
  };

  const content = (
    <>
      {interaction === 'slide-arrow' && (
        <>
          <AnimatePresence mode="popLayout" initial={false}>
            {!isHovered && (
              <motion.span
                key="icon-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ type: 'spring', stiffness: 600, damping: 25 }}
                className="flex items-center shrink-0"
              >
                <Icon className="w-4 h-4" />
              </motion.span>
            )}
          </AnimatePresence>
          <span className="whitespace-nowrap">{label}</span>
          <AnimatePresence mode="popLayout" initial={false}>
            {isHovered && (
              <motion.span
                key="icon-end"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ type: 'spring', stiffness: 600, damping: 25 }}
                className="flex items-center shrink-0"
              >
                <Icon className="w-4 h-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </>
      )}

      {interaction === 'pulse' && (
        <>
          <motion.span
            animate={isHovered ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex items-center shrink-0"
          >
            <Icon className="w-4 h-4" />
          </motion.span>
          <span className="whitespace-nowrap">{label}</span>
        </>
      )}
    </>
  );

  const motionProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleMouseEnter,
    onBlur: handleMouseLeave,
    onTouchStart: () => setIsHovered(true),
    onTouchEnd: () => setTimeout(() => setIsHovered(false), 500),
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 500, damping: 25 },
    className: cn(
      'inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-[0.05em] transition-colors duration-150 select-none cursor-pointer text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      variantStyles[variant],
      sizeStyles[size],
      className
    ),
  };

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} {...motionProps}>
      {content}
    </motion.button>
  );
}
