import { rootReducer } from '@services/store/reducers'
import * as toolkitRaw from '@reduxjs/toolkit';
const { configureStore } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})
