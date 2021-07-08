// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  const response = await prisma.events.findMany({
    orderBy: { id: "desc" },
  });
  const players = await prisma.players.findMany({
    where: { event_id: response[0].id },
  });
  const scores = await prisma.scores.findMany({
    where: { event_id: response[0].id },
    orderBy: { score: "desc" },
  });

  var test = 1,
    first = 1,
    second = 1,
    third = 1;
  for (const score of scores) {
    for (const player of players) {
      if (score.player_id === player.id) {
        if (test === 1) {
          first = player.name;
        } else if (test === 2) {
          second = player.name;
        } else if (test === 3) {
          third = player.name;
        }
        test++;
      }
    }
  }
  res.status(200).json({
    first: first,
    second: second,
    third: third,
    eventName: response[0].name,
    eventDate: response[0].start_date,
  });
};
