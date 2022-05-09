type Todo = {
  text: string;
  complete: boolean;
  id: string;
  isEditing: boolean;
};
type AddTodo = (text: string) => void;
type ToggleTodo = (selectedTodo: Todo) => void;
