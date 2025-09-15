import type { Item } from "./components/dashboard/dashboardTypes";

export const items: Record<string, Item[]> = {
  ToDo: [
    { id: 1, orig: "ToDo1", title: "Clean Room", status: "ToDo" },
    { id: 4, orig: "ToDo4", title: "Fix the Car", status: "ToDo" },
    { id: 5, orig: "ToDo5", title: "Make Lunch", status: "ToDo" },
  ],
  InProgress: [
    { id: 2, orig: "InProgress2", title: "Walk the Dog", status: "InProgress" },
    { id: 6, orig: "InProgress6", title: "Call Mom", status: "InProgress" },
  ],
  Review: [
    { id: 3, orig: "Review3", title: "Get Groceries", status: "Review" },
    { id: 8, orig: "Review8", title: "Return Library Books", status: "Review" },
  ],
  Done: [{ id: 7, orig: "Done7", title: "Play Video Games", status: "Done" }],
};
