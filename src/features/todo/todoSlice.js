import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todo: [],
};

// action + reducer = slice
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addtodo: (state, action) => {
      state.todo = [...state.todo, action.payload.todo];
    },
    deletetodo: (state, action) => {
      state.filter((todo) => todo.id !== action.payload.id);
    },
    edittodo: (state, action) => {
      
    },
  },
});

export const { addtodo, deletetodo, edittodo } = todoSlice.actions;

export const selectTodo = (state) => state.todo;

export default todoSlice.reducer;
