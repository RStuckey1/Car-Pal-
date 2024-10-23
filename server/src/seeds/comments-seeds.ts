import { Comments } from "../models/index.js";

export const seedComments = async () => {
  await Comments.bulkCreate(
    [
      { id: 1, username: "JollyGuru",
        description: "This is a comment",
        userId: 2,  },
      {
        id: 2, username: "SunnyScribe",
        description: "This is a comment too",
        userId: 1,
      },
    ],
    { individualHooks: true },
  );
};
