import { Grid, useTheme } from "@mui/material";

export default function DashboardShadowItem() {
  const theme = useTheme();

  return (
    <Grid
      alignItems={"center"}
      key={"shadow"}
      sx={{
        height: "120px",
        width: "260px",
        backgroundColor: theme.palette.background.default,
        margin: 1,
        padding: 4,
        borderRadius: 2,
        position: "absolute" as const,
      }}
    ></Grid>
  );
}
