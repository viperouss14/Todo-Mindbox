import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

import "./App.css";
import NewTodo from "./components/NewTodo";
import { useEffect, useState } from "react";
import Todolist, { Todo } from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import TodoLeft from "./components/TodoLeft";
import ClearCompleted from "./components/ClearCompleted";

function App() {
  const initialTodos: Todo[] = [
    { id: 1, text: "Тестовое задание", completed: false },
    { id: 2, text: "Прекрасный код", completed: true },
    { id: 3, text: "Покрытие тестами", completed: false },
  ];

  const [todos, SetTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : initialTodos;
  });

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    SetTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    SetTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: number) => {
    SetTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const clearCompleted = () => {
    SetTodos(todos.filter((todo) => !todo.completed));
  };

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");
  const footerColor = useColorModeValue("gray.500", "gray.500");

  const flexDirection = useBreakpointValue<"column" | "row">({
    base: "column",
    sm: "row",
  });

  return (
    <Box
      minHeight="100vh"
      bg={bgColor}
      color={textColor}
      display="flex"
      flexDirection="column"
      fontFamily="'Helvetica Neue', sans-serif"
    >
      <Container
        maxW="container.md"
        flex="1"
        display="flex"
        flexDirection="column"
        py={8}
      >
        <VStack spacing={4} flex="1" justify="flex-start">
          <Heading
            as="h1"
            size="xl"
            textAlign="center"
            fontWeight="light"
            letterSpacing="wide"
            mb={4}
          >
            todos
          </Heading>
          <NewTodo AddTodo={addTodo} />
          <Box w="70%" flex="1" overflowY="auto" mb={4}>
            <Todolist
              todos={filteredTodos}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          </Box>
          <Divider />
          <Flex
            w="100%"
            flexDirection={flexDirection}
            justifyContent={{ base: "center", sm: "space-between" }}
            alignItems={{ base: "center", sm: "center" }}
            mb={4}
            gap={4}
          >
            <TodoLeft todos={todos} />
            <TodoFilter filter={filter} setFilter={setFilter} />
            <ClearCompleted clearCompleted={clearCompleted} />
          </Flex>
        </VStack>
      </Container>
      <Box
        as="footer"
        w="100%"
        py={4}
        bg={useColorModeValue("gray.100", "gray.800")}
        textAlign="center"
      >
        <Text fontSize="sm" color={footerColor}>
          Created with ❤️ by{" "}
          <Link
            href="https://github.com/viperouss14?tab=repositories"
            color="teal.500"
          >
            Viktor
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default App;
