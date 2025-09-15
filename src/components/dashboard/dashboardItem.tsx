import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grid, useTheme } from "@mui/material";
import type { Item } from "./dashboardTypes";

export default function DashboardItem({
  item,
  shadowOnly = false,
}: {
  item: Item;
  shadowOnly?: boolean;
}) {
  const theme = useTheme();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <Grid
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      container
      alignItems={"center"}
      key={item.id}
      sx={{
        height: "120px",
        width: "100%",
        backgroundColor: shadowOnly
          ? theme.palette.background.default
          : theme.palette.background.paper,
        margin: 1,
        padding: 4,
        borderRadius: 2,
        boxShadow: shadowOnly ? "none" : "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {!shadowOnly && (
        <span>
          {item.title} {item.id} ({item.id})
        </span>
      )}
    </Grid>
  );
}
