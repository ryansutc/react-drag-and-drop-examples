import { Grid, useTheme } from "@mui/material";
import type { Item } from "./dashboardTypes";

export default function DashboardItem({ item }: { item: Item }) {
  const theme = useTheme();
  return (
    <Grid
      key={item.id}
      sx={{
        height: "120px",
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        margin: 1,
        padding: 4,
        borderRadius: 2,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {item.title}
    </Grid>
  );
}
