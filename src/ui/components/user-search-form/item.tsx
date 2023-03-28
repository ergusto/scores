import Image from "next/image";
import type { SimpleUser } from "@/types";
import { Icons } from "@/ui/primitives";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider, TooltipArrow } from "@/ui/primitives/tooltip";

export default function UserSearchFormItem({ user, onRemove }: { user: SimpleUser, onRemove: (user: SimpleUser) => void }) {
  const history = user.history;

  return (
    <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
            <Image width={40} height={40} className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.username}
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <p className="text-xs text-gray-500 truncate">
                    <span className="text-gren-700">{history?.gamesWon}</span>
                    <span> - </span>
                    <span className="text-red-700">{history?.gamesLost}</span>
                    <span> - </span>
                    <span>{history?.gamesPlayed}</span>
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <TooltipArrow />
                  Wins / Losses / Total Games Played
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900">
          <a onClick={() => onRemove(user)}>
            <Icons.close size="20" className="opacity-50 hover:opacity-100 cursor-pointer" />
          </a>
        </div>
    </div>
  );
}
