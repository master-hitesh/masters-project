import React, { useCallback, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Tabs,
  Tab,
  Grid,
  Container,
  LinearProgress,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CardComponent from "./CardComponent";
import { grey } from "@mui/material/colors";
import { getapi } from "../../services/webservices";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

function DashboardComponent() {
  const navigate = useNavigate(),
    [value, setValue] = useState(0),
    [loading, setLoading] = useState(false),
    [patientData, setPatientData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onLogoutClick = () => {
    navigate("/");
  };

  const refreshDashboard = useCallback(async () => {
    setLoading(true);
    let endpoint = "";
    endpoint =
      value === 2
        ? "user/getUsersByRisk/102"
        : value === 1
        ? "user/getUsersByRisk/101"
        : "user/getUsersByRisk/100";
    let data = await getapi(endpoint);
    setPatientData(data);
    setLoading(false);
  }, [value]);

  useEffect(() => {
    refreshDashboard();
  }, [refreshDashboard]);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.paper" }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              COVPRO Patients Dashboard
            </Typography>
            <Button color="inherit" onClick={onLogoutClick}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          sx={{ bgcolor: grey[200] }}
        >
          <Tab label="All Patients" />
          <Tab label="Medium Risk" />
          <Tab label="High Risk" />
        </Tabs>
      </Box>
      <Container>
        {loading && <LinearProgress />}
        <Grid container spacing={5} sx={{ marginTop: 3, marginBottom: 2 }}>
          {patientData?.docs?.map((patient) => (
            <Grid item key={patient._id} xs={12} md={6} lg={4}>
              <CardComponent
                patient={patient}
                refreshDashboard={refreshDashboard}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
export default DashboardComponent;
