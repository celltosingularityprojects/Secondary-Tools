import type { Snowflake } from "discord.js";
import type { UserReminder } from "./models/Reminder";

interface LeaderboardUser {
  userId: Snowflake;
  level: number;
  voteCount: number;
}

declare module '@prisma/client' {
  interface Leaderboard<T extends 'game' | 'vote' = 'game' | 'vote'> {
    type: T;
    users: Pick<LeaderboardUser, 'userId' & (T extends 'game' ? 'level' : 'voteCount')>[];
  }
  interface Reminder {
    userId: Snowflake;
    users: UserReminder[];
  }
}