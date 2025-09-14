export type Status = "To Do" | "In Progress" | "Review" | "Done";

export type Item = {
  id: number;
  title: string;
  status: Status;
};
