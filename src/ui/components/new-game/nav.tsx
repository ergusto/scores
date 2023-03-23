import { cn } from "@/lib/utils"
import { type Step } from "./types";
import { useNewGameState, useNewGameStepProgress } from "@/stores/newGame";

interface NewGameNavProps {
  steps: Step[];  
}

export default function NewGameNav({ steps }: NewGameNavProps) {
  const { currentStep, actions } = useNewGameState();
  const canContinueMap = useNewGameStepProgress();

  return (
    <aside className="hidden w-[200px] flex-col md:flex">
      <nav className="items-start grid gap-2">
        {steps.map(step => {
          const canContinue = step.number === 1 || canContinueMap[step.number];

          return (
            <button disabled={!canContinue} key={step.title} onClick={() => actions.setCurrentStep(step.number)} className={cn(
              "flex items-center px-3 py-2 text-sm font-medium group rounded-md text-slate-800 disabled:text-slate-500 transparent",
              currentStep === step.number ? "bg-slate-200 cursor-default" : "transparent enabled:hover:bg-slate-100 disabled:cursor-not-allowed",
            )}>
              {step.title}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
