import {
  type IUserCreateRequest,
  type IUserReadRequest,
  type IUserUpdateRequest,
  userAPI
} from '@services/api'

class UserController {
  async create(data: IUserCreateRequest) {
    try {
      const user = await userAPI.create(data)
      return user
    } catch (error) {
      console.error('Не удалось создать пользователя:', error)
    }
  }

  async find(data: IUserReadRequest) {
    try {
      const response = await userAPI.find(data)
      return response
    } catch (error) {
      console.error('Пользователь не найден:', error)
    }
  }

  async update(data: IUserUpdateRequest) {
    try {
      const response = await userAPI.update(data)
      return response
    } catch (error) {
      console.error('Не удалось обновить пользователя:', error)
    }
  }
}

export default new UserController()
