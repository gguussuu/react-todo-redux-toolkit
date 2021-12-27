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
    setEdit: (state, action) => {
      const { id } = action.payload;
      state.todo = state.todo.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isEditing: true,
          };
        } else {
          return item;
        }
      });
    },
    edittodo: (state, action) => {
      const { id, title } = action.payload;
      state.todo = state.todo.map((item) => {
        if (item.id === id) {
          return { ...item, isEditing: false, title };
        } else {
          return item;
        }
      });
    },
    completedtodo: (state, action) => {
      state.todo = state.todo.map((item) =>
        item.id === action.payload
          ? { ...item, is_completed: !item.is_completed }
          : item
      );
    },
  },
});

export const { addtodo, deletetodo, edittodo, completedtodo, setEdit } =
  todoSlice.actions;

export const selectTodo = (state) => state.todo;

export default todoSlice.reducer;
