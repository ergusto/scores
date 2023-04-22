import { useSession } from "next-auth/react";
import type { UserWithOpponents } from "@/types";
import { Icons } from "@/ui/primitives";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
  TooltipArrow,
} from "@/ui/primitives/tooltip";

export default function UserSearchFormItem({
  user,
  onRemove,
}: {
  user: UserWithOpponents;
  onRemove: (user: UserWithOpponents) => void;
}) {
  const { data: session } = useSession();
  const histories = user?.reverseOpponentHistories;
  let history = null;

  if (histories) {
    history = histories.find((history) => history.userId === session?.user?.id);
  }

  return (
    <div className="border-grey-200 flex items-center space-x-4 rounded-md border py-3 px-4 shadow">
      <div className="flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-10 w-10 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
          alt="Neil image"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900">
          {user?.username}
        </p>
        <div className="flex w-20 flex-row items-center justify-between text-xs text-gray-500">
          <span className="text-gren-700">{history?.gamesWon || 0}</span>
          <span>/</span>
          <span className="text-red-700">{history?.gamesLost || 0}</span>
          <span>/</span>
          <span className="mr-0.5">{history?.gamesPlayed || 0}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Icons.help
                  size={14}
                  className="opacity-45 inline hover:opacity-100"
                />
              </TooltipTrigger>
              <TooltipContent>
                <TooltipArrow />
                <p className="text-center text-xs font-semibold">
                  History against {user?.username}
                </p>
                <p className="text-xs">Wins / Losses / Total Games Played</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="inline-flex items-center text-base font-semibold text-gray-900">
        <a onClick={() => onRemove(user)}>
          <Icons.closeCircle
            size="20"
            className="cursor-pointer opacity-25 hover:opacity-100"
          />
        </a>
      </div>
    </div>
  );
}
