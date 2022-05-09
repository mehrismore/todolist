import React, { FormEvent, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import "./Todos.css";

const initialTodos: Array<Todo> = [];

export const Todos: React.FC = () => {
  //states
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

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editInputRef) {
      editInputRef?.current?.focus();
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
            <li className="margin-top" key={todo.id}>
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
        })}
      </ul>
    </>
  );
};
