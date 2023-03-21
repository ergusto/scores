import { useState } from "react";
import PageContainer from "@/ui/components/page-container"
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { cn } from "@/lib/utils"
import { StepOne, StepTwo } from "@/ui/components/new-game";

const steps = [
	{
		title: 'Step 1',
		stepCount: 0,
	},
	{ title: 'Step 2',
    stepCount: 1,
	},
	{
		title: 'Step 3',
    stepCount: 2,
	}
];

export default function NewGameLayout() {
  const [currentStep, setCurrentStep] = useState(1);
	const path = usePathname();

	return (
    <PageContainer>
			<aside className="hidden w-[200px] flex-col md:flex">
				<nav className="items-start grid gap-2">
					{steps.map(step => {
						return (
							<a key={step.title} onClick={() => setCurrentStep(step)}>
								<span className={cn(
									"flex items-center px-3 py-2 text-sm font-medium group rounded-md text-slate-800 hover:bg-slate-100 transparent",
									path === step.href ? "bg-slate-200" : "transparent",
								)}>{step.title}</span>
							</a>
						);
					})}
				</nav>
			</aside>
			<main className="flex flex-col flex-1 w-full overflow-hidden">
				<div className="items-start grid gap-8">
					<div className="flex justify-between px-2">
						<div className="grid gap-1">
							<h1 className="text-2xl font-bold tracking-wide text-slate-900">New Game</h1>
							<p className="text-neutral-500">Create a new Gin Rummy game</p>
						</div>
					</div>
					<div className="grid gap-10">
					</div>
				</div>
			</main>
		</PageContainer>
	);
}
