import type { Item, Status } from "@/components/dashboard/dashboardTypes";

/**
 * Create a shallow copy of the taskItems object
 */
export const cloneTasks = (taskItems: Record<Status, Item[]>) => {
  return Object.fromEntries(
    Object.entries(taskItems).map(([key, items]) => [key, [...items]]),
  );
};
