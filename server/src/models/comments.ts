import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js';

interface CommentsAttributes {
  id: number;
  username: string;
  description: string;
  userId: number;

 
}

interface CommentsCreationAttributes extends Optional<CommentsAttributes, 'id'> {}

export class Comments extends Model<CommentsAttributes, CommentsCreationAttributes> implements CommentsAttributes {
  public id!: number;
  public username!: string;
  public description!: string;
  public userId!: number;



  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function CommentsFactory(sequelize: Sequelize): typeof Comments {
  Comments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: User, key: 'id'},
      },
    },
    {
      tableName: 'comments',
      sequelize,
    }
  );

  return Comments;
}
