import { api } from "@/lib/api";

export function getUsersByUsername(usernames: string[]) {
  return api.useQueries(t => usernames.map(username => t.user.getByUsername({ username })));
}
