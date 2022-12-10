import { Sequelize } from 'sequelize-typescript'
import { User } from './models'

export const sequelize = new Sequelize(
  process.env.POSTGRES_DB as string || 'postgres',
  process.env.POSTGRES_USER as string || 'postgres',
  process.env.POSTGRES_PASSWORD as string || 'postgres',
  {
    host: 'postgres',
    port: 5432,
    dialect: 'postgres',
    models: [User],
  }
)

export const dbConnect = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
