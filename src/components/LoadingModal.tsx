import { useEffect, useState } from 'react';
import { GlassCard } from './GlassCard';

interface LoadingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export function LoadingModal({ isOpen, onComplete }: LoadingModalProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <GlassCard className="max-w-md w-full mx-4 text-center">
        <div className="space-y-6">
          <div className="flex justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-primary animate-dot-bounce"
                style={{ animationDelay: `${i * 0.16}s` }}
              />
            ))}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Analizujemy transport, noclegi i atrakcje…
            </h3>
            <p className="text-muted-foreground text-sm">
              Optymalizujemy plan pod Twój styl podróżowania.
            </p>
          </div>

          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
