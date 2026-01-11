import { items } from "@/tasks";
import { cloneTasks } from "@/utls/taskHelpers";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Grid } from "@mui/material";
import { useState } from "react";
import DashboardItem from "./dashboardItem";
import type { Item, Status } from "./dashboardTypes";
import DropColumn from "./dropColumn";

export default function Dashboard() {
  /**
   * An in-memory list of all task items
   */
  const [taskItems, setTaskItems] = useState<Record<Status, Item[]>>(items);
  const flattenedItems = Object.values(taskItems).flat() as readonly Item[];
  const [previewStatus, setPreviewStatus] = useState<Status | null>(null);

  /**
   * A copy of the task items used for restoring state if drag is cancelled!
   */
  const [clonedTaskItems, setClonedTaskItems] = useState<Record<
    Status,
    Item[]
  > | null>(null);

  /**
   * The id of the item currently being dragged (if any)
   */

  const [activeId, setActiveId] = useState<UniqueIdentifier | number | null>(
    null
  );

  /**
   * A quick list of status column ids
   */
  const dropRowIds = Object.keys(taskItems) as UniqueIdentifier[];

  const statuses = ["ToDo", "InProgress", "Review", "Done"];

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id);
    if (taskItems) {
      setClonedTaskItems(cloneTasks(taskItems));
    }
    setPreviewStatus(
      flattenedItems.find((item) => item.id === active.id)?.status || null
    );
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeContainer = findColumnName(active.id as string);
    const overContainer = findColumnName((over?.id as string) || "");

    if (!activeContainer) {
      setActiveId(null);
      return;
    }

    const overId = over?.id;

    if (overId == null) {
      setActiveId(null);
      return;
    }

    if (overContainer) {
      const activeIndex = taskItems[activeContainer].findIndex(
        (item) => item.id === active.id
      );
      const overIndex = taskItems[overContainer].findIndex(
        (item) => item.id === overId
      );

      if (activeIndex !== overIndex) {
        setTaskItems((items) => ({
          ...items,
          [overContainer]: arrayMove(
            items[overContainer],
            activeIndex,
            overIndex
          ),
        }));
      }
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    if (clonedTaskItems) {
      setTaskItems(clonedTaskItems);
    }

    setActiveId(null);
    setClonedTaskItems(null);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over || over?.id === null) return;
    if (!active || active?.id === null) return;

    const overId = over.id;
    const activeId = active.id;

    const overDropColumn = findColumnName(overId.toString());
    const activeDropColumn = findColumnName(activeId.toString());

    if (!activeDropColumn || !overDropColumn) {
      return;
    }

    if (activeDropColumn !== overDropColumn) {
      setTaskItems((items) => {
        const overItems = items[overDropColumn];

        const overIndex = overItems.findIndex((item) => item.id === overId);

        let newIndex: number;

        if (overIndex === -1) {
          newIndex = overItems.length + 1;
        } else {
          newIndex = overIndex + 1;
        }
        const activeItem = flattenedItems.find((item) => item.id === activeId);

        if (!activeItem) {
          throw new Error("Active item not found");
        }

        return {
          ...items,
          [activeDropColumn]: items[activeDropColumn].filter(
            (item) => item.id !== activeId
          ),
          [overDropColumn]: [
            ...items[overDropColumn].slice(0, newIndex),
            { ...activeItem, status: overDropColumn },
            ...items[overDropColumn].slice(
              newIndex,
              items[overDropColumn].length
            ),
          ],
        };
      });
    }
  };

  /**
   * Get the column name for a given id, either from the column ids or
   * from the task items
   *
   * @param id
   * @returns
   */
  const findColumnName = (id: number | string) => {
    if (typeof id === "string" && statuses.includes(id)) {
      return id as Status;
    }

    return flattenedItems.find((items) => id.toString() === items.id.toString())
      ?.status as Status | undefined;
  };

  return (
    <Grid
      container
      columnSpacing={1}
      sx={{ height: "calc(100vh - 164px)", marginTop: "80px" }}
      alignItems={"flex-start"}
      id="dashboard-container"
    >
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragCancel={handleDragCancel}
        collisionDetection={closestCenter}
      >
        <SortableContext
          items={dropRowIds}
          strategy={verticalListSortingStrategy}
        >
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
                <SortableContext items={taskItems[status as Status]}>
                  {taskItems[status as Status].map((taskItem: Item) => (
                    <DashboardItem
                      key={taskItem.id}
                      item={taskItem}
                      isSelected={activeId === taskItem.id}
                    />
                  ))}
                </SortableContext>
              </DropColumn>
            </Grid>
          ))}
        </SortableContext>
      </DndContext>
    </Grid>
  );
}
