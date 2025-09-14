import { Box } from "@mui/material";

import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";
export default function DropColumn({
  children,
  name,
}: {
  children: ReactNode;
  name: string;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: name });

  const style = {
    borderColor: isOver ? "green" : undefined,
    borderWidth: isOver ? 1 : 0,
  };
  return (
    <Box
      ref={setNodeRef}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "200px",
      }}
      style={style}
    >
      {children}
    </Box>
  );
}
