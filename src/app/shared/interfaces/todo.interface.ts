export type AddTodo = Omit<Todo, 'id'>;
export type EditTodo = Omit<Todo, 'id'>;

export default interface Todo {
  id: string;
  name: string;
}
