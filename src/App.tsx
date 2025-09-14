// import { useState } from 'react';

import { ThemeProvider } from "@mui/material";
import "./App.css";
import { ThemedContainer } from "./components/themed/themedContainer";
import theme from "./utls/muitheme";

import Dashboard from "./components/dashboard/dashboard";
import FooterRef from "./components/footer/footerRef";
import NavBar from "./components/navbar/navbar";

export default function App() {
  return (
    <ThemeProvider disableTransitionOnChange theme={theme}>
      <ThemedContainer
        maxWidth="lg"
        component="main"
        sx={{
          display: "col",
          flexDirection: "row",
          my: 16,
          gap: { xs: 5, sm: 6, md: 8 },
        }}
      >
        <NavBar />
        <Dashboard />
        <FooterRef />
      </ThemedContainer>
    </ThemeProvider>
  );
}
