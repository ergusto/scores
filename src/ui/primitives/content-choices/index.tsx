import { cn } from "@/lib/utils";

type ContentChoice = {
  id: string;
  title: string;
  text: string;
  callback: () => void;
  isActive: boolean;
}

type ContentChoiceProps = {
  choice: ContentChoice;
  isSelected: boolean;
}

type ContentChoicesProps = {
  choices: ContentChoice[];
  selectedChoice: string | null;
}

export function ContentChoice({ choice, isSelected }: ContentChoiceProps) {
  const className = cn("border-slate-200 border rounded-lg shadow p-3 md:p-4 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2", {
    'ring-2': !!isSelected,
    'ring-offset-2': !!isSelected,
    'ring-slate-400': !!isSelected,
  });

  return (
    <button onClick={choice.callback} className={className}>
        <h3 className="font-bold text-slate-900">{choice.title}</h3>
        <p className="text-slate-500">{choice.text}</p>
    </button>
  );
}

export function ContentChoices({ choices, selectedChoice }: ContentChoicesProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {choices.map((choice: ContentChoice) => {
        return (
          <ContentChoice key={choice.id} choice={choice} isSelected={choice.id === selectedChoice} />
        )
      })}
    </div>
  )
}
