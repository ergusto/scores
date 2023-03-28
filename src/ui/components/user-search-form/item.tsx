import { useSession } from "next-auth/react";
import type { ExtendedUser } from "@/types";
import { Icons } from "@/ui/primitives";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider, TooltipArrow } from "@/ui/primitives/tooltip";

export default function UserSearchFormItem({ user, onRemove }: { user: ExtendedUser, onRemove: (user: ExtendedUser) => void }) {
  const { data: session } = useSession();
  const histories = user.reverseOpponentHistories;
  let history = null;

  if (histories) {
    history = histories.find(history => history.userId === session?.user?.id);
  }

  return (
    <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.username}
            </p>
            <div className="flex flex-row justify-between items-center w-20 text-xs text-gray-500">
              <span className="text-gren-700">{history?.gamesWon}</span>
              <span> - </span>
              <span className="text-red-700">{history?.gamesLost}</span>
              <span> - </span>
              <span className="mr-1">{history?.gamesPlayed}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Icons.help size={16} className="inline" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <TooltipArrow />
                    Wins / Losses / Total Games Played
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900">
          <a onClick={() => onRemove(user)}>
            <Icons.close size="20" className="opacity-50 hover:opacity-100 cursor-pointer" />
          </a>
        </div>
    </div>
  );
}
