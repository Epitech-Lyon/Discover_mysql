// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  const response = await prisma.events.findUnique({
    where: { id: 1 },
  });
  const players = await prisma.players.findMany({
    where: { event_id: 1 },
  });
  const scores = await prisma.scores.findMany({
    where: { event_id: 1 },
    orderBy: { score: "desc" },
  });
  console.log(players);
  console.log(scores);
  var test = 1;
  for (const score of scores) {
    for (const player of players) {
      if (score.player_id === player.id) {
        console.log(test, ":", player.name, "with", score.score);
        test++;
      }
    }
  }
  console.log(response);
  res.status(200).json(response);
};
