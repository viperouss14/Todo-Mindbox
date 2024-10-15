import { FC } from "react";
import { Checkbox, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const Todolist: FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo }) => (
  <VStack minBlockSize={200} justify="center" align="stretch" spacing={5}>
    {todos.map((todo) => (
      <HStack spacing={10} key={todo.id} >
        <Checkbox
          isChecked={todo.completed}
          colorScheme="green"
          onChange={() => toggleTodo(todo.id)}
        />
        <Text
          flex={1}
          overflow={"hidden"}
          whiteSpace={"nowrap"}
          textOverflow={"ellipsis"}
          textDecoration={todo.completed ? "line-through" : "none"}
        >
          {todo.text}
        </Text>
        <IconButton
          size="xs"
          aria-label="Delete todo"
          icon={<DeleteIcon />}
          onClick={() => deleteTodo(todo.id)}
        />
      </HStack>
    ))}
  </VStack>
);

export default Todolist;
