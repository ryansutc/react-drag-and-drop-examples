import { Box, Grid } from "@mui/material";
import DashboardItem from "./dashboardItem";
import type { Item } from "./dashboardTypes";

export default function Dashboard() {
  const statuses = ["To Do", "In Progress", "Review", "Done"];
  const items: Item[] = [
    { id: 1, title: "Clean Your Room", status: "To Do" },
    { id: 2, title: "Walk the Dog", status: "In Progress" },
    { id: 3, title: "Get Grocerties", status: "Review" },
    { id: 4, title: "Fix the Car", status: "To Do" },
    { id: 5, title: "Make Lunch", status: "To Do" },
    { id: 6, title: "Call Your Mom", status: "In Progress" },
    { id: 7, title: "Play Video Games", status: "Done" },
    { id: 8, title: "Return Your Library Books", status: "Review" },
  ];
  return (
    <Grid
      container
      columnSpacing={1}
      sx={{ height: "calc(100vh - 164px)", marginTop: "80px" }}
      alignItems={"flex-start"}
      id="dashboard-container"
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
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              minHeight: "200px",
            }}
          >
            {items
              .filter((v) => v.status === status)
              .map((item) => (
                <DashboardItem key={item.id} item={item} />
              ))}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
