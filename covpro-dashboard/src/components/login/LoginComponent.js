import React, { useCallback, useState } from "react";
import { Button, TextField, Avatar, Typography } from "@mui/material";
import "./loginStyle.css";
import covpro_logo from "../../assets/covpro.png";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const [password, setPassword] = useState(""),
    [username, setUsername] = useState(""),
    navigate = useNavigate(),
    onUsernameChange = useCallback((evt) => setUsername(evt.target.value), []),
    onPasswordChange = useCallback((evt) => setPassword(evt.target.value), []),
    onLoginClick = useCallback(() => {
      if (username === "admin" && password === "admin") {
        navigate("/dashboard");
      } else {
        alert("Wrong username or password !!!");
      }
    }, [password, username, navigate]);

  return (
    <div className="App">
      <form className="form">
        <Avatar
          variant="square"
          sx={{ marginLeft: 22 }}
          alt="COVPRO"
          src={covpro_logo}
        />
        <Typography variant="h5" sx={{ margin: 2 }}>
          COVPRO COVID Protection
        </Typography>
        <TextField
          variant="standard"
          onChange={onUsernameChange}
          label="Username"
          sx={{ margin: 2 }}
        />
        <TextField
          variant="standard"
          onChange={onPasswordChange}
          label="Password"
          sx={{ margin: 2 }}
        />
        <Button
          variant="contained"
          sx={{ margin: 2 }}
          onClick={onLoginClick}
          disabled={username === "" || password === ""}
        >
          LOGIN
        </Button>
      </form>
    </div>
  );
}

export default LoginComponent;
