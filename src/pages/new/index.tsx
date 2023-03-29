import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useNewGameState } from "@/ui/state/newGame";
import PageContainer from "@/ui/components/page-container"
import { NewGameNav, StepOne, StepTwo, StepThree } from "@/ui/components/new-game";
import { type Step } from "@/ui/components/new-game/types";

const steps: Step[] = [
	{
		title: 'Step 1',
    number: 1,
    component: StepOne
	},
	{ title: 'Step 2',
    number: 2,
    component: StepTwo
	},
	{
		title: 'Step 3',
    number: 3,
    component: StepThree
	}
];

export default function NewGameLayout() {
  const { status } = useSession();
  const router = useRouter();
  const { currentStep } = useNewGameState();
  const StepComponent = steps.find(step => step.number === currentStep)?.component as React.FunctionComponent;

  if (status === 'unauthenticated') {
    void router.push('/auth/sign-in');
  }

	return (
    <PageContainer hasSidebar={true}>
      <NewGameNav steps={steps} />
			<main className="flex flex-col flex-1 w-full overflow-hidden">
				<div className="items-start grid gap-8">
					<div className="flex justify-between px-2">
						<div className="grid gap-1">
							<h1 className="text-2xl font-bold tracking-wide text-slate-900">New Game</h1>
							<p className="text-neutral-500">Create a new Gin Rummy game</p>
						</div>
					</div>
					<div className="grid gap-10">
            <StepComponent />
					</div>
				</div>
			</main>
		</PageContainer>
	);
}
