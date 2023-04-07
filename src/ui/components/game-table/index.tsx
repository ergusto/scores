import type { MouseEvent } from "react";
import { useRouter } from "next/router";
import type { Game } from "@prisma/client";
import GameItem from "./item";

interface GameTableProps {
  games?: Game[];
  isLoading: boolean;
}

export default function GameTable({ games }: GameTableProps) {
  if (!games) {
    return null;
  }

  const router = useRouter();

  return (
    <div className="mt-4 overflow-hidden rounded-md border border-slate-200">
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-4 py-4">
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
        </tbody>
      </table>
    </div>
  );
}
