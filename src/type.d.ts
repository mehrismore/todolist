type Todo = {
  text: string;
  complete: boolean;
  id: string;
  isEditing: boolean;
};
type AddTodo = (text: string) => void;
type ToggleTodo = (selectedTodo: Todo) => void;
type ToggleIsEditing = (selectedTodo: Todo) => void;
type RemoveTodo = (ID: string) => void;
type SetTodoText = (selectedTodo: Todo, newText: string) => void;
