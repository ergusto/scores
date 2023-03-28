import { cn } from "@/lib/utils"
import { type Step } from "./types";
import { useNewGameState, useNewGameStepProgress } from "@/state/newGame";

interface NewGameNavProps {
  steps: Step[];  
}

export default function NewGameNav({ steps }: NewGameNavProps) {
  const { currentStep, actions } = useNewGameState();
  const canContinueMap = useNewGameStepProgress();

  return (
    <aside>
      <nav className="md:hidden px-2 flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1">
          <li className="inline-flex items-center">
            <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700">
              <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
            Step 1
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <a href="#" className="ml-1 text-sm font-medium text-gray-700">Step 2</a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <span className="ml-1 text-sm font-medium text-gray-500">Step 3</span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="hidden w-[200px] flex-col md:flex">
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
      </div>
    </aside>
  );
}
