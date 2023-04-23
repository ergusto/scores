import { api } from "@/lib/api";
import type { SimpleUser, GameWithUsersScoresHandsAndOrder } from "@/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button, Input } from "@/ui/primitives";
import { GameType, GameUserOrder } from "@prisma/client";
import { gameUserOrderSort } from "@/lib/utils";

interface HandFormProps {
  game: GameWithUsersScoresHandsAndOrder | undefined;
  isLoading: boolean;
}

interface FormValues {
  [key: string]: number;
}

const defaultFieldValueValidators = {
  negative: (value: number) => {
    if (value < 0) return "Value must be greater than 0";
  },
};

const firstToFieldValueValidators = {
  ...defaultFieldValueValidators,
  divisibleByFive: (value: number) => {
    if (value % 5 !== 0) return "Value must be divisible by five";
  },
};

const scoreAfterFieldValueValidators = {
  ...defaultFieldValueValidators,
  notMoreThan100: (value: number) => {
    if (value > 100) return "Value must not be more than 100";
  },
};

const getFieldValueValidators = (gameType: GameType) => {
  if (gameType === GameType.FIRST_TO) {
    return firstToFieldValueValidators;
  } else if (gameType === GameType.SCORE_AFTER) {
    return scoreAfterFieldValueValidators;
  }
};

export default function HandForm({ game }: HandFormProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const trpcUtils = api.useContext();

  const { mutate, isLoading } = api.game.recordHand.useMutation({
    onSuccess: () => {
      void trpcUtils.game.get.invalidate({ id: String(game && game.id) });
      reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (!game) {
    return <div />;
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate({
      id: game.id,
      dealer: game.ownerId,
      scores: Object.keys(data).map((userId) => {
        return {
          userId,
          score: data[userId] as number,
        };
      }),
    });
  };

  return (
    <div>
      <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
        <div className="grid auto-cols-auto grid-flow-col gap-4">
          {game.order.sort(gameUserOrderSort).map((order: GameUserOrder) => {
            const user = game.users.find(user => user.id === order.userId) as SimpleUser;
            const fieldKey = user?.id;
            const error = errors[fieldKey];
            const username = user?.username;

            return (
              <div key={fieldKey}>
                <Input
                  {...register(fieldKey, {
                    required: "This field is required",
                    valueAsNumber: true,
                    validate: getFieldValueValidators(game.gameType),
                  })}
                  type="number"
                  placeholder={username as string}
                  hasError={!!error}
                />

                {error && (
                  <span className="px-1 text-xs text-red-600">
                    {String(error?.message)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <Button disabled={!!isLoading} className="mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
}
