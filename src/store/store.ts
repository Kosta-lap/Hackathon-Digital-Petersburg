import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import eventCategoriesReducer from './eventCategoriesSlice';
import locationReducer from './locationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    eventCategories: eventCategoriesReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;