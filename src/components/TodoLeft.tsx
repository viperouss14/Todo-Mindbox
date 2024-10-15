import { FC } from "react";
import { Text } from "@chakra-ui/react";
import { Todo } from "./TodoList";

interface TodoLeftProps {
  todos: Todo[];
}

const TodoLeft: FC<TodoLeftProps> = ({ todos }) => {
  const left = todos.filter((todo) => !todo.completed).length;
  return (
    <Text inlineSize={20}>
      {left} {left === 1 ? "item" : "items"} left
    </Text>
  );
};

export default TodoLeft;