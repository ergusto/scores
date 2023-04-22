import type { MouseEvent } from "react";
import { useRouter } from "next/router";
import type { Game } from "@prisma/client";
import GameItem from "./item";
import Skeleton from "./skeleton";

interface GameTableProps {
  games?: Game[];
  isLoading: boolean;
}

export default function GameTable({ games, isLoading }: GameTableProps) {
  const router = useRouter();

  if (!games || isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="mt-4 overflow-hidden rounded-md border border-slate-200">
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="border-b border-slate-200 bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="min-w-[200px] px-4 py-4">
                Title
              </th>
              <th scope="col" className="px-4 py-3">
                Players
              </th>
              <th scope="col" className="px-4 py-3">
                Active
              </th>
              <th scope="col" className="px-4 py-3">
                Last activity
              </th>
              <th scope="col" className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="">
            <>
              {games.map((game) => {
                const onClick = (event: MouseEvent) => {
                  event.preventDefault();
                  void router.push(`/games/${game.id}`);
                };
                return (
                  <tr
                    onClick={onClick}
                    className="cursor-pointer hover:bg-gray-50"
                    key={game.id}
                  >
                    <GameItem game={game} />
                  </tr>
                );
              })}
              {!!games?.[0] || (
                <tr>
                  <th scope="col" className="block p-5 font-normal">
                    No games found
                  </th>
                </tr>
              )}
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
}
