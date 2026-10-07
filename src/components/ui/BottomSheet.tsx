import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function BottomSheet({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: ReactNode }) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] md:hidden"
          />
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed bottom-0 left-0 right-0 z-[101] bg-surface border-t border-borderLight rounded-t-3xl p-4 pb-8 md:hidden shadow-[0_-10px_50px_rgba(0,0,0,0.6)] max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-center mb-6 cursor-pointer py-2" onClick={onClose}>
              <div className="w-12 h-1.5 bg-borderLight rounded-full" />
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
