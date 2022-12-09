import axios from 'axios'

export const API_LOCAL_URL_PATH = '/api'
export const API_YANDEX_URL_BASE = 'https://ya-praktikum.tech'
export const API_YANDEX_URL_PATH = '/api/v2'

export const http = axios.create({
  baseURL: API_YANDEX_URL_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
