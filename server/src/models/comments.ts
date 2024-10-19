import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user';

interface CommentsAttributes {
  id: number;
  name: string;
  description: string;
  assignedUserId?: number;
  assignedUser?: User;
}

interface CommentsCreationAttributes extends Optional<CommentsAttributes, 'id'> {}

export class Comments extends Model<CommentsAttributes, CommentsCreationAttributes> implements CommentsAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public assignedUserId!: number;
  public assignedUser!: User;



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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assignedUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      assignedUser: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'comments',
      sequelize,
    }
  );

  return Comments;
}
