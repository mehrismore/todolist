import { useEffect, useRef } from "react";

type Props = {
  todo: Todo;
  toggleTodo: ToggleTodo;
  toggleIsEditing: ToggleIsEditing;
  removeTodo: RemoveTodo;
  setTodoText: SetTodoText;
};

export const TodoListItem = ({
  todo,
  toggleTodo,
  toggleIsEditing,
  removeTodo,
  setTodoText,
}: Props) => {
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editInputRef) {
      editInputRef?.current?.focus();
    }
  }, []);
  return (
    <li className="margin-top">
      <div>
        <label>
          <input
            type="checkbox"
            checked={todo.complete}
            onClick={() => toggleTodo(todo)}
          />
        </label>
        {todo.isEditing ? (
          <input
            type="text"
            onChange={(e) => {
              setTodoText(todo, e.target.value);
            }}
            value={todo.text}
            ref={editInputRef}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                toggleIsEditing(todo);
              }
            }}
          />
        ) : (
          <span onClick={() => toggleIsEditing(todo)}>{todo.text}</span>
        )}
        {todo.isEditing ? (
          <button onClick={() => toggleIsEditing(todo)}>Save</button>
        ) : (
          <button onClick={() => toggleIsEditing(todo)}>Edit</button>
        )}
        <button type="submit" onClick={() => removeTodo(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};
