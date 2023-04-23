import type { SimpleUser, HandWithScoresAndUsers } from "@/types";
import type { GameUserOrder, GameWithUsersScoresHandsAndOrder } from "@/types";
import { GameScore, HandScore } from "@prisma/client";
import { gameUserOrderSort } from "@/lib/utils";

export default function HandList({
  game,
  isLoading,
}: {
  game: GameWithUsersScoresHandsAndOrder | undefined;
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
            {game.order.sort(gameUserOrderSort).map((order: GameUserOrder) => {
              const user = game.users.find(user => user.id === order.userId) as SimpleUser;

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
          {game.hands.length ? (
            game.hands.map((hand) => {
              return (
                <tr
                  key={hand.id}
                  className="only:!bg-transparent odd:bg-gray-50 "
                >
                  {game.order.sort(gameUserOrderSort).map((order: GameUserOrder) => {
                    const score = hand.scores.find(score => score.userId === order.userId) as HandScore;

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
        {!!game.hands.length && (
          <tfoot className="rounded-b-lg border-t border-slate-300 bg-gray-50">
            <tr>
              {game.order.sort(gameUserOrderSort).map((order: GameUserOrder) => {
                const gameScore = game.scores.find(score => score.user.id === order.userId) as GameScore;

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
