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
      state.todo = state.todo.filter((item) => item.id !== action.payload);
    },
    edittodo: (state, action) => {},
    completedtodo: (state, action) => {
      state.todo = state.todo.map((item) => 
        item.id === action.payload
          ? { ...item, is_completed: !item.is_completed }
          : item
      );
    },
  },
});

export const { addtodo, deletetodo, edittodo,completedtodo } = todoSlice.actions;

export const selectTodo = (state) => state.todo;

export default todoSlice.reducer;
