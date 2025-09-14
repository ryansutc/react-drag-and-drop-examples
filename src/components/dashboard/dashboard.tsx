import { Box, Grid } from "@mui/material";

export default function Dashboard() {
  return (
    <Grid container sx={{ height: "100%" }}>
      {[0, 1, 2, 3].map((col) => (
        <Grid size={3} key={col} sx={{ height: "100%" }}>
          <Box
            sx={{
              height: "100%",
              border: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Column {col + 1}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
