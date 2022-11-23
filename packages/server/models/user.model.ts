import {
  AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table
} from 'sequelize-typescript'

type TTheme = 'light' | 'dark'

export interface IUser {
  id?: number
  theme?: TTheme
}

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user'
})
class User extends Model<IUser> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    override id: number

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: 'theme',
  })
    theme: TTheme
}

export default User
