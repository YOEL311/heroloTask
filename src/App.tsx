import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./App.css";
import Router from "./router";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { RootState } from "./store/types";
import { PaletteType } from "@material-ui/core";

const themeObject = {
  palette: {
    primary: { main: "#9A58B2" },
    type: "light",
  },
  themeName: "Blue Lagoon 2020",
  typography: {
    fontFamily: "Bitter",
  },
};

function App() {
  const themeType = useSelector((state: RootState) => state.preferUser.them);
  const themeConfig = createMuiTheme({
    ...themeObject,
    palette: {
      ...themeObject.palette,
      type: themeType as PaletteType,
    },
  });

  return (
    <MuiThemeProvider theme={themeConfig}>
      <Router />
      <ToastContainer />
    </MuiThemeProvider>
  );
}

export default App;
