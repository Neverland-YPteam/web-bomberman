import {
  AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table
} from 'sequelize-typescript'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme'
})
class User extends Model<User> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER, field: 'id' })
    override id: number

  @AllowNull(false)
  @Column({ type: DataType.INTEGER, field: 'login' })
    login: string

  @AllowNull(false)
  @Column({ type: DataType.STRING, field: 'first_name' })
    firstName: string

  @AllowNull(false)
  @Column({ type: DataType.STRING, field: 'second_name' })
    secondName: string

  @AllowNull(true)
  @Column({ type: DataType.STRING, field: 'display_name' })
    displayName: string

  @AllowNull(false)
  @Column({ type: DataType.STRING, field: 'email' })
    email: string

  @AllowNull(false)
  @Column({ type: DataType.STRING, field: 'phone' })
    phone: string

  @AllowNull(true)
  @Column({ type: DataType.STRING, field: 'avatar' })
    avatar: string
}

export default User
