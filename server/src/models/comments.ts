import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js';

interface CommentsAttributes {
  id: number;
  username: string;
  description: string;
  UserId: number;

 
}

interface CommentsCreationAttributes extends Optional<CommentsAttributes, 'id'> {}

export class Comments extends Model<CommentsAttributes, CommentsCreationAttributes> implements CommentsAttributes {
  public id!: number;
  public username!: string;
  public description!: string;
  public UserId!: number;




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
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
