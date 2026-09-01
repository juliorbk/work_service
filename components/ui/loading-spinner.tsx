'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  label?: string;
  color?: string;
}

export function LoadingSpinner({
  className,
  label = 'Cargando...',
  color = '#d99414',
}: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div className="relative w-12 h-12 flex items-center justify-center" role="status" aria-label={label}>
        <div className="absolute w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 rounded-full"
            style={{ border: `1.5px solid ${color}` }}
            initial={{ scale: 0.3, opacity: 0.8 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: i * 0.7 }}
          />
        ))}
      </div>
      {label ? <p className="text-sm text-secondary">{label}</p> : null}
    </div>
  );
}
