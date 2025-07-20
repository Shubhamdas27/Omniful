import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './slices/todoSlice'
import teamReducer from './slices/teamSlice'

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    team: teamReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
