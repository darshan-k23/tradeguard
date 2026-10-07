import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 2 }: { value: number, prefix?: string, suffix?: string, decimals?: number }) {
  // Use spring for a sophisticated, premium countdown/up effect
  const spring = useSpring(value, { bounce: 0, duration: 1500 });
  
  const display = useTransform(spring, (current) => 
    `${prefix}${current.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}
