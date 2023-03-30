type ContentChoice = {
  id: string;
  title: string;
  text: string;
  callback: () => void;
  isActive: boolean;
}

type ContentChoiceProps = {
  choice: ContentChoice;
}

type ContentChoicesProps = {
  choices: ContentChoice[];
}

export function ContentChoice({ choice }: ContentChoiceProps) {
  return (
    <button onClick={choice.callback} className="border-slate-200 border rounded-lg shadow p-3 md:p-4 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
        <h3 className="font-bold text-slate-900">{choice.title}</h3>
        <p className="text-slate-500">{choice.text}</p>
    </button>
  );
}

export function ContentChoices({ choices }: ContentChoicesProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {choices.map((choice: ContentChoice) => {
        return (
          <ContentChoice key={choice.id} choice={choice} />
        )
      })}
    </div>
  )
}
