import { Sequelize } from 'sequelize-typescript'
import { SiteTheme, User, UserTheme} from '../db/models'

export const sequelize = new Sequelize(
  'postgres',
  'postgres',
  'postgres',
  {
    host: 'postgres',
    port: 5432,
    dialect: 'postgres',
    models: [SiteTheme, User, UserTheme],
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
