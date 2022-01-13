import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import todoReducer from "../features/todo/todoSlice";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  todo: todoReducer,
  //WHY? reducer name : 내가 지정한 리듀서 ,, ,를 해줘야 하는지?
  // 꼭 toolkit에서 사용한 name을,, 가져다 써야하는지?
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger],
});
