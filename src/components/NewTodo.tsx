import { FC, useState, FormEvent } from "react";
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";

interface NewTodoProps {
  AddTodo: (todo: string) => void;
}

const NewTodo: FC<NewTodoProps> = ({ AddTodo }) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.trim()) {
      AddTodo(newTodo);
      setNewTodo("");
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Create new todo</FormLabel>
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
        <Button type="submit" mt={4} colorScheme="teal">
          Add Todo
        </Button>
      </FormControl>
    </Box>
  );
};

export default NewTodo;
