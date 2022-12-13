import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  automock: false,
  testMatch: ['<rootDir>/src/**/?(*.)test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@pages/(.*)$": "<rootDir>/src/components/pages/$1",
    "^@organisms/(.*)$": "<rootDir>/src/components/organisms/$1",
    "^@molecules/(.*)$": "<rootDir>/src/components/molecules/$1",
    "^@atoms/(.*)$": "<rootDir>/src/components/atoms/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@fonts/(.*)$": "<rootDir>/src/assets/fonts/$1",
    "^@images/(.*)$": "<rootDir>/src/assets/images/$1",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  transform: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileTransformer.cjs"
  }
}

