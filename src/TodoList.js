import { useState } from "react";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdCreate,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { edittodo, setEdit } from "./features/todo/todoSlice";

const TodoList = ({ list, onDelete, onComplete }) => {
  const dispatch = useDispatch();
  const [editText, setEditText] = useState("");
  return (
    <div>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {list && list.map((todoitem, index) => {
          return (
            <li
              key={index}
              style={{
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #aaa",
                boxSizing: "border-box",
                padding: "0 15px",
              }}
            >
              <span
                style={{ marginRight: "10px", cursor: "pointer" }}
                onClick={() => onComplete(todoitem.id)}
              >
                {todoitem.is_completed ? (
                  <MdCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
              </span>
              <p
                style={{
                  flex: 1,
                  textDecoration: todoitem.is_completed
                    ? "line-through"
                    : "none",
                }}
              >
                {todoitem.isEditing ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter"
                        ? dispatch(
                            edittodo({ id: todoitem.id, title: editText })
                          )
                        : null
                    }
                  /> //업데이트 된 데이터를 바꿔줌
                ) : (
                  todoitem.title // 기존 todo value
                )}
              </p>
              <span
                onClick={() => onDelete(todoitem.id)}
                style={{ display: "inline-block", marginRight: "10px" }}
              >
                <MdRemoveCircleOutline
                  style={{
                    fontSize: "22px",
                    color: "red",
                    cursor: "pointer",
                  }}
                />
              </span>
              <span
                onClick={() => {
                  if (!todoitem.isEditing) {
                    dispatch(setEdit({ id: todoitem.id }));
                    setEditText(todoitem.title);
                  } else {
                    // edit 기능 dispatch
                    dispatch(edittodo({ id: todoitem.id, title: editText }));
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                {todoitem.isEditing ? <button>수정완료</button> : <MdCreate />}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
