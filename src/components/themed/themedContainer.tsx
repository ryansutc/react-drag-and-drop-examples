import { Container, type ContainerProps, styled } from "@mui/material";

export const ThemedContainer = styled(Container)<ContainerProps>(
  ({ theme }) => ({
    height: "100%",
    minHeight: "100vh",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  })
);
