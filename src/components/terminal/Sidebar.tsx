import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Cpu, 
  Briefcase, 
  ListOrdered, 
  FileText, 
  Activity 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SidebarProps {
  activeTab: string;
}

export function Sidebar({ activeTab }: SidebarProps) {
  const navigate = useNavigate();
  const navItems = [
    { id: 'command', icon: LayoutDashboard, label: 'Command Center' },
    { id: 'copilot', icon: Cpu, label: 'Copilot' },
    { id: 'portfolio', icon: Briefcase, label: 'Portfolio' },
    { id: 'orders', icon: ListOrdered, label: 'Orders' },
    { id: 'instructions', icon: FileText, label: 'Instructions' },
    { id: 'activity', icon: Activity, label: 'Activity' },
  ];

  return (
    <>
      {/* Desktop/Tablet Sidebar */}
      <aside className="hidden md:flex w-16 xl:w-64 border-r border-borderLight bg-surface/30 flex-col items-center xl:items-stretch py-6 gap-8 z-20 shrink-0">
        <div className="flex items-center justify-center xl:justify-start xl:px-6 gap-3">
          <span className="w-3 h-3 rounded-full bg-cyan-500 shadow-glow-cyan animate-pulse"></span>
          <span className="hidden xl:block font-bold text-xl tracking-widest text-text-primary">PS-04</span>
        </div>

        <nav className="flex-1 flex flex-col gap-2 xl:px-4 w-full">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button 
                key={item.id}
                onClick={() => navigate(`/terminal/${item.id}`)}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex items-center justify-center xl:justify-start gap-3 p-3 xl:px-4 xl:py-2.5 rounded-lg transition-colors text-sm font-medium group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50",
                  isActive ? "text-cyan-500 shadow-glow-cyan-sm" : "text-text-secondary hover:text-text-primary"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-cyan-900/20 border border-cyan-500/20 rounded-lg -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <div className="absolute inset-0 bg-surfaceHover opacity-0 group-hover:opacity-100 transition-opacity rounded-lg -z-10" />
                )}
                <item.icon size={18} className="relative z-10" />
                <span className="hidden xl:block relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[68px] bg-surface/90 backdrop-blur-xl border-t border-borderLight z-[60] flex items-center justify-around px-1 pb-safe">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button 
              key={item.id}
              onClick={() => navigate(`/terminal/${item.id}`)}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex flex-col items-center justify-center p-2 rounded-lg transition-colors text-[10px] font-medium group w-14 h-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50",
                isActive ? "text-cyan-500" : "text-text-secondary"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-sidebar-active"
                  className="absolute inset-0 bg-cyan-900/20 border-t-2 border-cyan-500 -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon size={20} className={cn("mb-1 transition-transform", isActive ? "-translate-y-0.5" : "")} />
              <span className="hidden sm:block text-[9px] tracking-wider uppercase">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
