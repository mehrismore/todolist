import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { TodoListItem } from "./TodoListItem";
import { nanoid } from "nanoid";
import "./Todos.css";

export const Todos: React.FC = () => {
  const [newTodo, setNewTodo] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos") || "[]")
  );

  const addTodo = (newTodo: string) => {
    setTodos([
      ...todos,
      { text: newTodo, complete: false, id: nanoid(), isEditing: false },
    ]);
  };

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newTodo !== "") {
      addTodo(newTodo);
    }
    setNewTodo("");
  };

  const removeTodo = (ID: string) => {
    const updatedTodos = todos.filter((todo: Todo) => todo.id !== ID);
    setTodos(updatedTodos);
  };

  const toggleTodo = (selectedTodo: Todo) => {
    const newTodosArray = todos.map((todo: Todo) => {
      if (selectedTodo === todo) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });
    setTodos(newTodosArray);
  };

  const toggleIsEditing = (selectedTodo: Todo) => {
    const newTodosArray = todos.map((todo: Todo) => {
      if (selectedTodo === todo) {
        return {
          ...todo,
          isEditing: !todo.isEditing,
        };
      }
      return todo;
    });
    setTodos(newTodosArray);
  };

  const setTodoText = (selectedTodo: Todo, newText: string) => {
    const newTodosArray = todos.map((todo: Todo) => {
      if (selectedTodo === todo) {
        return {
          ...todo,
          text: newText,
        };
      }
      return todo;
    });
    setTodos(newTodosArray);
  };

  const todoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoInputRef) {
      todoInputRef?.current?.focus();
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
    setCharCount(e.target.value.length);
    console.log(charCount);
  };

  const charLimit = 5;
  const isTodoTextLimitExceeded = charCount > 5;
  return (
    <>
      <form>
        <div>
          <input
            type="text"
            placeholder="add todo"
            onChange={handleInputChange}
            value={newTodo}
            ref={todoInputRef}
          />
          <button type="submit" onClick={handleSubmit}>
            Add todo
          </button>
          <span style={charCount > 5 ? { color: "red" } : { color: "black" }}>
            {" "}
            Characters:{" "}
            {isTodoTextLimitExceeded ? charLimit - charCount : charCount} /5
          </span>
        </div>
      </form>
      <ul>
        {todos.map((todo: Todo) => {
          return (
            <TodoListItem
              todo={todo}
              key={todo.id}
              toggleTodo={toggleTodo}
              toggleIsEditing={toggleIsEditing}
              removeTodo={removeTodo}
              setTodoText={setTodoText}
            />
          );
        })}
      </ul>
    </>
  );
};
