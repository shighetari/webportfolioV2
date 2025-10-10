import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface StatCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  label: string;
  icon?: React.ReactElement;
  delay?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({
  end,
  duration = 2,
  suffix = '',
  label,
  icon,
  delay = 0
}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0
  });

  const display = useTransform(spring, (latest) => {
    if (suffix === '%' || suffix === '+') {
      return Math.floor(latest).toFixed(0) + suffix;
    }
    // For decimal numbers like 99.9%
    if (end % 1 !== 0) {
      return latest.toFixed(1) + suffix;
    }
    return Math.floor(latest).toFixed(0) + suffix;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isInView]);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        spring.set(end);
      }, delay);
    }
  }, [isInView, end, delay, spring]);

  return (
    <motion.div
      ref={ref}
      className="stat-counter"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      {icon && <div className="stat-icon">{icon}</div>}
      <motion.h3 className="stat-number">{display}</motion.h3>
      <p className="stat-label">{label}</p>
    </motion.div>
  );
};

export default React.memo(StatCounter);
