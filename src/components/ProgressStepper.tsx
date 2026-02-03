import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressStepper({ currentStep, totalSteps }: ProgressStepperProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <div key={step} className="flex items-center">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300',
                isCompleted && 'bg-primary text-primary-foreground',
                isCurrent && 'bg-primary/20 border-2 border-primary text-primary',
                !isCompleted && !isCurrent && 'bg-muted text-muted-foreground'
              )}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : step}
            </div>
            {step < totalSteps && (
              <div
                className={cn(
                  'w-8 h-0.5 mx-1',
                  step < currentStep ? 'bg-primary' : 'bg-muted'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
