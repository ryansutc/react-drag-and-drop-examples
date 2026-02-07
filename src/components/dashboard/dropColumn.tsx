import { Box } from "@mui/material";

import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";
export default function DropColumn({
  children,
  name,
  height,
}: {
  children: ReactNode;
  name: string;
  height: number;
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
        height: `${height}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "200px",
        transition: (theme) =>
          theme.transitions.create(["height"], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
          }),
      }}
      style={style}
    >
      {children}
    </Box>
  );
}
