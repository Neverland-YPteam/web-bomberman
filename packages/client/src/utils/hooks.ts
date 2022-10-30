import {
  useSelector as useSelectorHook,
  TypedUseSelectorHook,
  useDispatch as useDispatchHook,
} from 'react-redux'
import { AppDispatch, AppThunk, RootState } from '../types/store'

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorHook

export const useDispatch = useDispatchHook<AppDispatch>
