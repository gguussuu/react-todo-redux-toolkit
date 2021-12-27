import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addtodo, deletetodo, selectTodo, completedtodo } from "./todoSlice";
import TodoList from "../../TodoList";

export function Todo() {
  // useSelector로 리덕스의 상태 조회..
  const { todo } = useSelector(selectTodo);
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    setText("");
  }, [todo]);

  const AddTodoItem = () => {
    if (text.length === 0) {
      alert("1글자 이상 작성해주세요.");
    } else {
      dispatch(
        addtodo({
          todo: {
            id: id,
            title: text,
            is_completed: false,
            isEditing: false,
          },
        })
      );
      setId(id + 1);
    }
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

      <TodoList list={todo} onDelete={onDelete} onComplete={onComplete} />
    </div>
  );
}
