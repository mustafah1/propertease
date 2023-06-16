import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import * as Pages from "./Pages";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Topbar, Sidebr } from "./components";
import Form from "./components/Form";

import "./App.css";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebr, setIsSidebr] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Topbar setIsSidebr={setIsSidebr} />
          <main className="content" style={{ display: "flex" }}>
            {isSidebr && <Sidebr isSidebr={isSidebr} />}
            <Box flexGrow={1}>
              <Routes>
                <Route path="/" element={<Pages.Home />} />
                <Route path="/ifc" element={<Pages.IfcViewer />} />

                <Route
                  path="/TenantDashboard"
                  element={<Pages.TenantDashboard />}
                />
                <Route path="/Maintainance" element={<Pages.Maintainance />} />
                <Route path="/Property" element={<Pages.Property />} />
                <Route path="/form" element={<Form />} />
              </Routes>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
