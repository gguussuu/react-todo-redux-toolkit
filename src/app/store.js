import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import todoSlice from "../features/todo/todoSlice";

// export const store = createStore(todoSlice, applyMiddleware(logger));
export const store = configureStore({
  reducer: {  todo: todoSlice,},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// export const store = configureStore({
//   reducer: todoSlice,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//     serializableCheck: false,
//   }).concat(logger),
// });
