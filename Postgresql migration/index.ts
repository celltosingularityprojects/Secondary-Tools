import { PrismaClient } from "@prisma/client";
import type { InformationFormat } from "models/Information";
import { connect as connectMongo } from "mongoose";

const prisma = new PrismaClient();

import { BoosterRewards, Game, Information, Leaderboard, Reminder, Report, UserData, Votes } from './models';

// migrate each mongoose model to prisma model
async function main() {
  await prisma.$queryRaw`CREATE SCHEMA IF NOT EXISTS public;`;

  const boosterRewards = await BoosterRewards.find();
  const games = await Game.find();
  const information = await Information.find();
  const leaderboards = await Leaderboard.find();
  const reminders = await Reminder.find();
  const reports = await Report.find();
  const userData = await UserData.find();
  const votes = await Votes.find();

  await prisma.boosterReward.createMany({ data: boosterRewards.map(b => {
    return {
      userId: b.userId,
      rewardingDate: new Date(b.rewardingDate),
    }
  }) });
  await prisma.game.createMany({
    data: games.map(g => {
      return {
        player: g.player,
        money: g.money,
        percentIncrease: g.percentIncrease,
        cost: g.cost,
        level: g.level,
        checkedLevel: g.checkedLevel,
        lastCollected: new Date(g.idleCollection),
        profitRate: g.idleProfit
      }
    })
  });
  await prisma.information.createMany({ data: information.filter(i => i.infoType != 'boostercodes')
    .map(i => {
      return {
        type: i.infoType,
        value: i.info,
        expired: i.expired,
        footer: i.footer,
      }
    })
  });
  await prisma.boosterCodes.createMany({ data: (information.find(i => i.infoType === 'boostercodes') as InformationFormat<'boostercodes'>).list
    .map(b => { 
      return {
        code: b,
      }
    }) 
  });
  await prisma.leaderboard.create({ data: {
    type: 'game',
    users: {
      create: leaderboards.find(i => i.type == 'game').list
      .map(u => {
        return {
          userId: u.user,
          level: u.level,
        }
      }),
    }
  }
  });
  await prisma.leaderboard.create({ data: {
    type: 'vote',
    users: {
      create: leaderboards.find(i => i.type == 'vote').list
      .map(u => {
        return {
          userId: u.user,
          voteCount: u.voteCount,
        }
      }),
    }
  }
  });
  await prisma.reminder.createMany({ data: reminders.map(r => {
      return {
        userId: r.userId,
        reminders: r.reminders as object,
      }
    }) 
  });
  await prisma.report.createMany({ data: reports.map(r => {
    return {
      bugId: r.bugId,
      userId: r.User,
      messageId: r.messageId,
      channelId: r.channelId,
    }
  }) });
  await prisma.userData.createMany({ data: userData.map(u => {
    return {
      token: u.token,
      discord_id: u.discordId,
      metabits: u.metabits,
      dino_rank: u.dino_rank,
      prestige_rank: u.prestige_rank,
      singularity_speedrun_time: u.singularity_speedrun_time,
      all_sharks_obtained: u.all_sharks_obtained,
      all_hidden_achievements_obtained: u.all_hidden_achievements_obtained,
      beta_tester: u.betaTester,
    }
  }) });
  await prisma.vote.createMany({ data: votes.map(v => {
    return {
      userId: v.user,
      voteCount: v.voteCount,
    }
  }) });
}



(async () => {
  await connectMongo(process.env.MONGOOSE_URL);
  await main().catch(async e => {
    // delete all postgres data
    console.error(e);
    await prisma.boosterReward.deleteMany({});
    await prisma.game.deleteMany({});
    await prisma.information.deleteMany({});
    await prisma.boosterCodes.deleteMany({});
    await prisma.leaderboard.deleteMany({});
    await prisma.reminder.deleteMany({});
    await prisma.report.deleteMany({});
    await prisma.userData.deleteMany({});
    await prisma.vote.deleteMany({});
  }).finally(async () => {
    await prisma.$disconnect();
    console.log('migration complete');
    process.exit();
  });
})();