import { User } from "../models/index.js";

export const seedUser = async () => {
  await User.bulkCreate(
    [
      {
        firstName: "Jolly",
        lastName: "Guru",
        username: "JollyGuru",
        email: "jolly@guru.com", 
        password: "password" 
      },
      {
        firstName: "Sunny",
        lastName: "Scribe",
        username: "SunnyScribe",
        email: "sunny@scribe.com",
        password: "password",
      },
      {
        firstName: "Radiant",
        lastName: "Comet",
        username: "RadiantComet",
        email: "radiant@comet.com",
        password: "password",
      },
    ],
    { individualHooks: true },
  );
};
