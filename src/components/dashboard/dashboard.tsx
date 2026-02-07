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
import { useMemo, useReducer, useState } from "react";
import DashboardItem from "./dashboardItem";
import type { Item, Status } from "./dashboardTypes";
import DropColumn from "./dropColumn";

type TaskAction =
  | {
      type: "REORDER_IN_COLUMN";
      column: Status;
      fromIndex: number;
      toIndex: number;
    }
  | {
      type: "MOVE_TO_COLUMN";
      fromColumn: Status;
      toColumn: Status;
      itemId: UniqueIdentifier;
      insertIndex: number;
    }
  | { type: "RESTORE_SNAPSHOT"; snapshot: Record<Status, Item[]> };

function taskReducer(
  state: Record<Status, Item[]>,
  action: TaskAction,
): Record<Status, Item[]> {
  switch (action.type) {
    case "REORDER_IN_COLUMN":
      return {
        ...state,
        [action.column]: arrayMove(
          state[action.column],
          action.fromIndex,
          action.toIndex,
        ),
      };

    case "MOVE_TO_COLUMN": {
      const item = state[action.fromColumn].find(
        (item) => item.id === action.itemId,
      );
      if (!item) return state;

      return {
        ...state,
        [action.fromColumn]: state[action.fromColumn].filter(
          (item) => item.id !== action.itemId,
        ),
        [action.toColumn]: [
          ...state[action.toColumn].slice(0, action.insertIndex),
          { ...item, status: action.toColumn },
          ...state[action.toColumn].slice(action.insertIndex),
        ],
      };
    }

    case "RESTORE_SNAPSHOT":
      return action.snapshot;

    default:
      return state;
  }
}

export default function Dashboard() {
  /**
   * An in-memory list of all task items managed by reducer
   */
  const [taskItems, dispatch] = useReducer(taskReducer, items);
  const flattenedItems = Object.values(taskItems).flat() as readonly Item[];
  const [previewStatus, setPreviewStatus] = useState<Status | null>(null);
  console.log(taskItems["Done"]);

  /**
   * A copy of the task items used for restoring state if drag is cancelled!
   */
  const [clonedTaskItems, setClonedTaskItems] = useState<Record<
    Status,
    Item[]
  > | null>(null);

  const columnHeights = useMemo(() => {
    if (clonedTaskItems) {
      const longestColumn = Math.max(
        ...Object.values(clonedTaskItems).map((col) => col.length),
      );
      return longestColumn * 140 + 140;
    }
    return 600;
  }, [clonedTaskItems]);

  /**
   * The id of the item currently being dragged (if any)
   */

  const [activeId, setActiveId] = useState<UniqueIdentifier | number | null>(
    null,
  );

  /**
   * A quick list of status column ids
   */
  const dropRowIds = Object.keys(taskItems) as UniqueIdentifier[];

  const statuses = ["ToDo", "InProgress", "Review", "Done"];

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id);
    if (taskItems) {
      setClonedTaskItems(cloneTasks(taskItems) as Record<Status, Item[]>);
    }
    setPreviewStatus(
      flattenedItems.find((item) => item.id === active.id)?.status || null,
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
        (item) => item.id === active.id,
      );
      const overIndex = taskItems[overContainer].findIndex(
        (item) => item.id === overId,
      );

      if (activeIndex !== overIndex) {
        dispatch({
          type: "REORDER_IN_COLUMN",
          column: overContainer,
          fromIndex: activeIndex,
          toIndex: overIndex,
        });
      }
    }

    setActiveId(null);
    setTimeout(() => {
      if (taskItems) {
        setClonedTaskItems(cloneTasks(taskItems));
      }
    }, 300);
  };

  const handleDragCancel = () => {
    if (clonedTaskItems) {
      dispatch({ type: "RESTORE_SNAPSHOT", snapshot: clonedTaskItems });
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
    const savedActiveDropColumn = findColumnName(activeId.toString(), true);

    if (!activeDropColumn || !overDropColumn) {
      return;
    }

    if (savedActiveDropColumn !== overDropColumn) {
      if (activeDropColumn === overDropColumn) {
        dispatch({
          type: "REORDER_IN_COLUMN",
          column: overDropColumn,
          fromIndex: taskItems[overDropColumn].findIndex(
            (item) => item.id === activeId,
          ),
          toIndex:
            taskItems[overDropColumn].findIndex((item) => item.id === overId) ??
            taskItems[overDropColumn].length,
        });
        return;
      }

      const overItems = taskItems[overDropColumn];
      const overIndex = overItems.findIndex((item) => item.id === overId);
      const insertIndex = overIndex === -1 ? overItems.length + 1 : overIndex;

      dispatch({
        type: "MOVE_TO_COLUMN",
        fromColumn: activeDropColumn,
        toColumn: overDropColumn,
        itemId: activeId,
        insertIndex,
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
  const findColumnName = (id: number | string, savedVersion = false) => {
    if (typeof id === "string" && statuses.includes(id)) {
      return id as Status;
    }
    const items = !savedVersion
      ? flattenedItems
      : clonedTaskItems
        ? (Object.values(clonedTaskItems).flat() as readonly Item[])
        : [];
    return items.find((items) => id.toString() === items.id.toString())
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
                height: `${columnHeights}px`,
                transition: (theme) =>
                  theme.transitions.create(["height"], {
                    duration: theme.transitions.duration.standard,
                    easing: theme.transitions.easing.easeInOut,
                  }),
              }}
              id={status}
            >
              <Grid> {status}</Grid>
              <DropColumn name={status} height={columnHeights}>
                <SortableContext items={taskItems[status as Status]}>
                  {taskItems[status as Status]
                    .filter((task) => task && task.id)
                    .map((taskItem: Item) => (
                      <DashboardItem
                        key={taskItem.id}
                        item={taskItem}
                        isSelected={taskItem && activeId === taskItem.id}
                        isMoving={
                          previewStatus !== status && activeId === taskItem.id
                        }
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
