import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { SiteTheme, User, UserTheme} from '../db/models'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: POSTGRES_PORT as unknown as number,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [SiteTheme, User, UserTheme]
}

export const sequelize = new Sequelize(sequelizeOptions)

export const dbConnect = async () => {
  try {
    console.log('########## TRYING TO AUTHENTICATE…')
    await sequelize.authenticate()
    console.log('########## TRYING TO SYNC…')
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
