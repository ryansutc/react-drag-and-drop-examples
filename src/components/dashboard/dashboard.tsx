import { items } from "@/tasks";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Grid } from "@mui/material";
import { useState } from "react";
import DashboardItem from "./dashboardItem";
import type { Item, Status } from "./dashboardTypes";
import DropColumn from "./dropColumn";

export default function Dashboard() {
  const [taskItems, setTaskItems] = useState<Item[]>(items);
  console.log("taskItems", JSON.stringify(taskItems));
  const statuses = ["To Do", "In Progress", "Review", "Done"];

  function handleDragEnd(event: DragEndEvent) {
    if (event.over && statuses.includes(event.over.id as string)) {
      setTaskItems((prevItems) => {
        console.log("event", event);
        return prevItems.map((item) =>
          item.id === event.active.id
            ? { ...item, status: event.over?.id as Status }
            : item
        );
      });
    }
  }

  return (
    <Grid
      container
      columnSpacing={1}
      sx={{ height: "calc(100vh - 164px)", marginTop: "80px" }}
      alignItems={"flex-start"}
      id="dashboard-container"
    >
      <DndContext onDragEnd={handleDragEnd}>
        {statuses.map((status) => (
          <Grid
            justifyContent={"flex-start"}
            alignContent={"flex-start"}
            alignItems={"flex-start"}
            size={3}
            key={status}
            sx={{
              bgcolor: "#e7dedeff",
              padding: 2,
              borderRadius: 2,
              height: "100%",
            }}
            id={status}
          >
            <Grid> {status}</Grid>
            <DropColumn name={status}>
              {taskItems
                .filter((v) => v.status === status)
                .map((taskItem) => (
                  <DashboardItem key={taskItem.id} item={taskItem} />
                ))}
            </DropColumn>
          </Grid>
        ))}
      </DndContext>
    </Grid>
  );
}
