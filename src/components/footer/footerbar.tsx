"use client";

import { type RefObject, useEffect, useState } from "react";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
      {"© "}
      <span color="text.secondary">RSutcliffe</span>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function FooterBar({
  scrollEndRef,
}: {
  scrollEndRef: RefObject<HTMLDivElement | null>;
}) {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    setShowFooter(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFooter(entry.isIntersecting);
      },
      { threshold: 1 }
    );

    if (scrollEndRef?.current) {
      observer.observe(scrollEndRef.current);
    }

    return () => {
      if (scrollEndRef?.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(scrollEndRef.current);
      }
    };
  }, [scrollEndRef]);

  return (
    <Box
      id="footer"
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        bgcolor: "background.default",
        marginTop: "8px",
        opacity: showFooter ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <Divider />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          textAlign: { sm: "center", md: "left" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Copyright />
          </div>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ justifyContent: "left", color: "text.secondary" }}
          >
            <IconButton
              color="inherit"
              size="small"
              href="https://www.linkedin.com/in/ryan-sutcliffe-a3673b11/"
              aria-label="LinkedIn"
              sx={{ alignSelf: "center" }}
              title={"My LinkedIn Profile"}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
