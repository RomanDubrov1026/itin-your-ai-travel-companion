import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

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
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-300",
                isCompleted && "bg-primary text-primary-foreground",
                isCurrent && "border-2 border-primary bg-primary/20 text-primary",
                !isCompleted && !isCurrent && "bg-muted text-muted-foreground",
              )}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : step}
            </div>
            {step < totalSteps && (
              <div
                className={cn("mx-1 h-0.5 w-8", step < currentStep ? "bg-primary" : "bg-muted")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
