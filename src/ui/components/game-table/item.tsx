import { useSession } from "next-auth/react";
import { formatDistanceToNowStrict } from "date-fns";
import type { Game } from "@prisma/client";
import type { SimpleUser } from "@/types";
import { Icons } from "@/ui/primitives";

interface GameTableItemProps {
  game: Game;
}

function getUsernames(users: SimpleUser[], authUser: SimpleUser) {
  return users
    .filter((user) => user?.username !== authUser?.username)
    .map((user) => user?.username)
    .join(", ");
}

export default function GameTableItem({ game }: GameTableItemProps) {
  const { data: session } = useSession();

  return (
    <>
      <td className="px-4 py-3 text-base">{game.title}</td>
      <td className="px-4 py-3">{getUsernames(game.users, session?.user)}</td>
      <td className="px-4 py-3">
        {game.active ? (
          <Icons.checkCircle className="ml-3" size={18} />
        ) : (
          <Icons.slash className="ml-3" size={18} />
        )}
      </td>
      <td className="px-4 py-3">
        {game.lastActivity
          ? `${formatDistanceToNowStrict(game.lastActivity)} ago`
          : "-"}
      </td>
      <td className="px-4 py-3"></td>
    </>
  );
}
