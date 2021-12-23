import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addtodo,
  deletetodo,
  edittodo,
  selectTodo,
  completedtodo,
} from "./todoSlice";
import TodoList from "../../TodoList";

export function Todo() {
  // useSelector로 리덕스의 상태 조회..
  const { todo } = useSelector(selectTodo);
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [list, setList] = useState([]); // 해야할일 객체를 모아놓은 배열
  const [id, setId] = useState(0);

  useEffect(() => {
    setText("");
  }, [todo]);

  const AddTodoItem = () => {
    dispatch(
      addtodo({
        todo: {
          id: id,
          title: text,
          is_completed: false,
          is_edit_button: false,
        },
      })
    );
    setId(id + 1);
  };
  const AddKeyPress = (e) => {
    if (e.key === "Enter") {
      AddTodoItem();
    }
  };
  const onDelete = (id) => {
    dispatch(deletetodo(id));
  };
  const onComplete = (id) => {
    dispatch(completedtodo(id));
  };

  //수정 기능
  // [ ] 수정버튼을 누르면 input 창이 나타난다
  // [ ] input 창은 기존의 내용이 담겨있어야 한다
  // [ ] input에 새로운 값을 넣고 버튼을 누르면 todo.title이 바뀐다

  const onEdit = (id) => {
    //list.text = todo
    //list의 li가 input으로 ...
    //바뀐 input의 value = newtodo 로
    setList(
      list.map((item) => {
        if (item.id === id) {
          item.is_edit_button = !item.is_edit_button;
        }
        return item;
      })
    );
  };

  const handleUpdate = (id, text) => {
    const newTodos = list.map((todo) => {
      if (todo.id === id) {
        todo.text = text;
      }
      return todo;
    });
    setList(newTodos);
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "100px auto",
        padding: "20px 40px",
        borderRadius: "10px",
        boxShadow: "5px 5px 25px #ccc",
        backgroundColor: "#fff",
      }}
    >
      <h1 style={{ textAlign: "center" }}>What's the task for Today?</h1>
      <div style={{ display: "flex" }}>
        <input
          style={{ flex: 1, padding: "10px 20px", fontSize: "16px" }}
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="Add a todo item"
          onKeyPress={AddKeyPress}
        />
        <button onClick={() => AddTodoItem()}>Add Todo</button>
      </div>

      <TodoList
        list={todo}
        onDelete={onDelete}
        onComplete={onComplete}
        onEdit={onEdit}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}
