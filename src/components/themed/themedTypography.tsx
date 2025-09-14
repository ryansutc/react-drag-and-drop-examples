import { Typography, type TypographyProps, styled } from "@mui/material";

export const ThemedTypography = styled(Typography)<
  TypographyProps & { background?: "primary" | "secondary" | undefined }
>(({ theme, background }) => ({
  color: background
    ? theme.vars?.palette.primary.contrastText
    : theme.vars?.palette.text.primary,
}));
