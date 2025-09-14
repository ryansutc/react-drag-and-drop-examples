"use client";

import { Button, Fade, Link, styled, useMediaQuery } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

import React from "react";
import MobileMenu from "./mobileMenu";

const StyledButton = styled(Button)(() => ({
  textTransform: "none",
}));

export default function NavBarButtons() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const goDesktop = useMediaQuery("(min-width:600px)", { noSsr: true });

  // mobile buttons
  const [open, setOpen] = React.useState(false);

  const handleListClose = () => {
    setOpen(false);
  };

  if (!mounted) return null; // Prevent hydration mismatch
  if (goDesktop) {
    return (
      <>
        <Link href="/about">
          <Fade in timeout={600}>
            <StyledButton
              variant="text"
              color="primary"
              sx={{
                color: "primary.main",
              }}
            >
              About
            </StyledButton>
          </Fade>
        </Link>
      </>
    );
  }
  // mobile only layout
  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="primary"
        aria-label="menu"
        sx={{ marginRight: 2 }}
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <MobileMenu open={open} handleClose={handleListClose} />
    </>
  );
}
