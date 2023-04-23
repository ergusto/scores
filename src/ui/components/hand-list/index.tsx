import type { SimpleUser, HandWithScoresAndUsers } from "@/types";
import type { Game } from "@prisma/client";

export default function HandList({
  hands,
  users,
  game,
  isLoading,
}: {
  hands: HandWithScoresAndUsers[];
  users: SimpleUser[];
  game: Game;
  isLoading: boolean;
}) {
  if (!game) {
    return <div />;
  }

  return (
    <div className="mt-5 w-full rounded-lg border border-slate-300 text-left text-sm text-gray-500 shadow-sm">
      <table className="w-full table-fixed border-collapse border-spacing-0">
        <thead className="rounded-t-lg border-b border-slate-300 bg-gray-50">
          <tr className="rounded-t-lg">
            {users.map((user: SimpleUser) => {
              return (
                <th
                  className="py-3 px-4 first:rounded-tl-lg last:rounded-tr-lg"
                  key={`hand-list-user-list-${user.id}`}
                >
                  {user.username}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {hands.length ? (
            hands.map((hand) => {
              return (
                <tr
                  key={hand.id}
                  className="only:!bg-transparent odd:bg-gray-50 "
                >
                  {hand.scores.map((score) => {
                    return (
                      <td className="py-3 px-4" key={`hand-list-${score.id}`}>
                        {score.score}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="py-3 px-4">No hands found</td>
            </tr>
          )}
        </tbody>
        {!!hands.length && (
          <tfoot className="rounded-b-lg border-t border-slate-300 bg-gray-50">
            <tr>
              {game.scores.map((gameScore) => {
                return (
                  <td
                    key={`tfoot-total-${gameScore.id}`}
                    className="py-2 px-4 text-sm font-bold first:rounded-bl-lg last:rounded-br-lg"
                  >
                    {gameScore.score}
                  </td>
                );
              })}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
