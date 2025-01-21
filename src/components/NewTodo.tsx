import { FC, useState, FormEvent } from "react";
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  FormControl,
  // FormLabel,
  Input,
  Button,
  Box,
  HStack,
} from "@chakra-ui/react";

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
        {/* <FormLabel>Create new todo</FormLabel> */}
        <HStack justify="center" align="center" spacing={4}>
          <Box position="relative">
            {" "}
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              sx={{
                "::placeholder": { fontStyle: "italic" },
                paddingLeft: "25px",
              }}
            />{" "}
            <Box
              position="absolute"
              left="10px"
              top="50%"
              transform="translateY(-50%)"
              pointerEvents="none"
            >
              {" "}
              <ChevronDownIcon />
              {" "}
            </Box>{" "}
          </Box>
          <Button type="submit" colorScheme="teal">
            Add Todo
          </Button>
        </HStack>
      </FormControl>
    </Box>
  );
};

export default NewTodo;
