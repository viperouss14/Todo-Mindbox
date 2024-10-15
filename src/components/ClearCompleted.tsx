import { Button } from "@chakra-ui/react";

const ClearCompleted = ({ clearCompleted }: { clearCompleted: () => void }) => (
  <Button onClick={clearCompleted} colorScheme="pink" variant="ghost">
    Clear Completed
  </Button>
);

export default ClearCompleted;
