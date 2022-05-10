import React, { FormEvent, useEffect, useRef, useState } from "react";
import { TodoListItem } from "./TodoListItem";
import { nanoid } from "nanoid";
import "./Todos.css";

const initialTodos: Array<Todo> = [];

export const Todos: React.FC = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (newTodo: string) => {
    setTodos([
      ...todos,
      { text: newTodo, complete: false, id: nanoid(), isEditing: false },
    ]);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newTodo !== "") {
      addTodo(newTodo);
    }
    setNewTodo("");
  };

  const removeTodo = (ID: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== ID);
    setTodos(updatedTodos);
  };

  const toggleTodo = (selectedTodo: Todo) => {
    const newTodosArray = todos.map((todo) => {
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
    const newTodosArray = todos.map((todo) => {
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
    const newTodosArray = todos.map((todo) => {
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

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="add todo"
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
          ref={todoInputRef}
        />
        <button type="submit" onClick={handleSubmit}>
          Add todo
        </button>
      </form>
      <ul>
        {todos.map((todo) => {
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
