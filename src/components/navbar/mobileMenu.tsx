import {
  Drawer,
  Grid,
  IconButton,
  Link,
  MenuItem,
  styled,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  textDecoration: "none",
  color:
    theme.palette.mode === "dark"
      ? theme.vars?.palette.text.secondary
      : theme.vars?.palette.primary.dark,
  textAlign: "center",
  justifyContent: "center",
  "&::after": {
    content: '""',
    display: "block",
    position: "absolute",
    left: 0,
    bottom: 0,
    width: 0,
    height: "2px",
    backgroundColor: theme.vars?.palette.secondary.main,
    transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
  },

  "&.Mui-selected": {
    color:
      theme.palette.mode === "dark"
        ? theme.vars?.palette.text.primary
        : theme.vars?.palette.primary.dark,
  },
  "&:hover": {
    color:
      theme.palette.mode === "dark"
        ? theme.vars?.palette.text.primary
        : theme.vars?.palette.primary.dark,

    "&::after": {
      width: "100%",
      backgroundColor: theme.vars?.palette.secondary.main,
    },
  },
  "&:focus": {
    color: theme.vars?.palette.primary.dark,
  },
}));

export default function MobileMenu({
  open,
  handleClose,
}: {
  handleClose: () => void;
  open: boolean;
}) {
  return (
    <Drawer
      id="mobile-menu"
      aria-labelledby="composition-button"
      anchor={"top"}
      open={open}
      onClose={handleClose}
      sx={{
        bgcolor: "background.default",
      }}
    >
      <Grid
        container
        justifyContent={"end"}
        sx={{ padding: "16px", width: "100%" }}
      >
        <IconButton onClick={handleClose} style={{ marginRight: "8px" }}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        sx={{ margin: "16px", alignItems: "center" }}
      >
        <Grid
          container
          justifyContent={"center"}
          size={12}
          sx={{ textAlign: "center", width: "100%" }}
        >
          <Link
            href="/about"
            style={{
              textDecoration: "none",
              color: "inherit",
              minWidth: "50%",
            }}
          >
            <StyledMenuItem key="About" selected={false} onClick={handleClose}>
              About
            </StyledMenuItem>
          </Link>
        </Grid>
      </Grid>
    </Drawer>
  );
}
