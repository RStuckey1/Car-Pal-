import { Comments } from "../models/index.js";

export const seedComments = async () => {
  await Comments.bulkCreate(
    [
      { id: 1, 
        name: "JollyGuru",
        description: "This is a comment",
        assignedUserId: 1,
        
            },
      {
        id: 2, name: "SunnyScribe",
        description: "This is a comment too",
        assignedUserId: 2,
      },
    ],
    { individualHooks: true },
  );
};
