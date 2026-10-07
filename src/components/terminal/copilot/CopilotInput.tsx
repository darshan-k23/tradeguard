import { useState } from 'react';
import { Send, Command } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface CopilotInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

const SUGGESTIONS = [
  "What's my P&L?",
  "Show losing positions",
  "Buy 10 TCS at market",
  "Alert me when RELIANCE falls 5%"
];

export function CopilotInput({ onSend, disabled }: CopilotInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-4 border-t border-borderLight bg-surface/80 backdrop-blur-xl flex flex-col gap-4">
      {/* Suggestions */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {SUGGESTIONS.map((suggestion, idx) => (
          <button 
            key={idx}
            onClick={() => onSend(suggestion)}
            disabled={disabled}
            aria-label={`Suggestion: ${suggestion}`}
            className="flex-none px-3 py-1.5 rounded-full bg-surface border border-borderLight text-xs text-text-secondary hover:text-cyan-500 hover:border-cyan-500/50 hover:bg-cyan-900/10 transition-colors whitespace-nowrap font-mono disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute top-4 left-4 text-cyan-500/50 group-focus-within:text-cyan-500 transition-colors">
          <Command size={18} />
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask Sentinel anything..."
          aria-label="Message Sentinel AI"
          className="w-full bg-background border border-borderLight rounded-xl pl-12 pr-14 py-4 text-sm text-text-primary focus:outline-none focus:border-cyan-500/50 focus-visible:ring-2 focus-visible:ring-cyan-500/50 resize-none font-sans min-h-[60px] shadow-inner transition-colors disabled:opacity-50"
          rows={1}
        />
        <button 
          type="submit"
          disabled={disabled || !input.trim()}
          aria-label="Send message"
          className={cn(
            "absolute bottom-4 right-4 p-2 rounded-lg transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
            input.trim() && !disabled ? "bg-cyan-500 text-background shadow-glow-cyan" : "bg-surfaceHover text-text-tertiary"
          )}
        >
          <Send size={16} className={input.trim() && !disabled ? "translate-x-[1px] -translate-y-[1px]" : ""} />
        </button>
      </form>
    </div>
  );
}
