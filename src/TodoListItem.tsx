import { useCallback, useEffect, useRef } from "react";

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

  const focusInputAndToggleIsEditing = useCallback(
    (todo: Todo) => {
      toggleIsEditing(todo);

      if (todo.isEditing) {
        editInputRef?.current?.focus();
      }
    },
    [editInputRef, toggleIsEditing]
  );

  useEffect(() => {
    if (todo.isEditing) {
      editInputRef?.current?.focus();
    }
  }, [todo.isEditing]);

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
          <span onClick={() => focusInputAndToggleIsEditing(todo)}>
            {todo.text}
          </span>
        )}
        {todo.isEditing ? (
          <button onClick={() => toggleIsEditing(todo)}>Save</button>
        ) : (
          <button onClick={() => focusInputAndToggleIsEditing(todo)}>
            Edit
          </button>
        )}
        <button type="submit" onClick={() => removeTodo(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};
