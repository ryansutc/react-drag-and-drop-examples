import type { Item, Status } from "@/components/dashboard/dashboardTypes";

export const cloneTasks = (taskItems: Record<Status, Item[]>) => {
  return Object.fromEntries(
    Object.entries(taskItems).map(([key, items]) => [key, [...items]])
  );
};
