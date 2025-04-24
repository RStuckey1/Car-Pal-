import { DataTypes, type Sequelize, Model, type Optional } from "sequelize";
import bcrypt from "bcrypt";
import { Vehicle } from "./vehicle.js"

interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<IUser, "id"> {}

export class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  public readonly vehicles?: Vehicle[];

  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}

export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },      
    },
    {
      tableName: "users",
      sequelize,
      timestamps: false,
      hooks: {
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password);
        },
        beforeUpdate: async (user: User) => {
          if (user.changed("password")) {
            await user.setPassword(user.password);
          }
        },
      },
    },
  );

  return User;
}
