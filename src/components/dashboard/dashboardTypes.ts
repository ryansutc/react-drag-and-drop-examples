export type Status = "ToDo" | "InProgress" | "Review" | "Done";

export type Item = {
  id: number;
  orig: string;
  title: string;
  status: Status;
};
