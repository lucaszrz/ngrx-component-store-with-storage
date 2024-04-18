export default interface BaseState<T> {
  items: T[];
  selectedItemId: string | null;
}
