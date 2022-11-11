import {
  AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table
} from 'sequelize-typescript'
import { SiteTheme, User } from './'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme'
})
class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    override id: number

  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column(DataType.INTEGER)
    themeId: string

  @Column(DataType.STRING)
    device: string

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id'
  })
    ownerId: string
}

export default UserTheme
