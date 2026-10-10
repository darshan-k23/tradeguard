import { motion, useTransform, MotionValue, useReducedMotion } from 'framer-motion';

const TICKERS = [
  { symbol: "NIFTY 50", x: 10, y: 15, speed: 2, scale: 1 },
  { symbol: "TCS", x: 80, y: 25, speed: -1, scale: 0.8 },
  { symbol: "RELIANCE", x: 20, y: 80, speed: 1.5, scale: 0.9 },
  { symbol: "INFY", x: 70, y: 75, speed: -2, scale: 0.7 },
  { symbol: "BANKNIFTY", x: 45, y: 10, speed: 0.5, scale: 0.85 }
];

function TickerItem({ t, mouse, prefersReducedMotion }: { t: any, mouse: { x: MotionValue<number>, y: MotionValue<number> }, prefersReducedMotion: boolean | null }) {
  const moveX = useTransform(mouse.x, [-1, 1], [-t.speed * 15, t.speed * 15]);
  const moveY = useTransform(mouse.y, [-1, 1], [-t.speed * 15, t.speed * 15]);
  
  return (
    <motion.div
      className="absolute font-mono text-[10px] text-text-tertiary tracking-widest opacity-20"
      style={{
        left: `${t.x}%`,
        top: `${t.y}%`,
        scale: t.scale,
        x: prefersReducedMotion ? 0 : moveX,
        y: prefersReducedMotion ? 0 : moveY
      }}
    >
      {t.symbol}
    </motion.div>
  );
}

export function FloatingTickers({ mouse }: { mouse: { x: MotionValue<number>, y: MotionValue<number> } }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block overflow-hidden">
      {TICKERS.map((t) => (
        <TickerItem key={t.symbol} t={t} mouse={mouse} prefersReducedMotion={prefersReducedMotion} />
      ))}
    </div>
  );
}
