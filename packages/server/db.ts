import { Sequelize } from 'sequelize-typescript'
import { User } from './models'

export const sequelize = new Sequelize(
  'postgres',
  'postgres',
  'postgres',
  {
    host: '0.0.0.0', // @TODO Изменить на postgres
    port: 5432,
    dialect: 'postgres',
    models: [User],
  }
)

export const dbConnect = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true }) // @TODO
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
