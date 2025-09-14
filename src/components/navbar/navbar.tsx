import { Divider, Grid } from "@mui/material";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { ThemedTypography } from "../themed/themedTypography";
import NavBarMenu from "./navbarMenu";

export default function NavBar() {
  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "background.default",
        backgroundImage: "none",
        //marginTop: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Toolbar>
        <ThemedTypography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RSutcliffe | Drag&Drop
        </ThemedTypography>
        <NavBarMenu />
      </Toolbar>
      <Grid container justifyContent="center">
        <Divider id="divider" style={{ width: "95%" }} />
      </Grid>
    </AppBar>
  );
}
