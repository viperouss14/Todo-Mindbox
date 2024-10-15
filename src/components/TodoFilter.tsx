import { Button, ButtonGroup } from "@chakra-ui/react";
import { FC } from "react";

interface TodoFilterProps {
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
}

const TodoFilter: FC<TodoFilterProps> = ({ filter, setFilter }) => (
  <ButtonGroup>
    <Button
      onClick={() => setFilter("all")}
      colorScheme={filter === "all" ? "teal" : "gray"}
      variant="outline"
    >
      All
    </Button>
    <Button
      onClick={() => setFilter("active")}
      colorScheme={filter === "active" ? "teal" : "gray"}
      variant="outline"
    >
      Active
    </Button>
    <Button
      onClick={() => setFilter("completed")}
      colorScheme={filter === "completed" ? "teal" : "gray"}
      variant="outline"
    >
      Completed
    </Button>
  </ButtonGroup>
);

export default TodoFilter;
