import { TextField, Button, Typography, Box, Grid, Paper } from "@mui/material";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import InputField from "../Components/Form/InputField";
import { ErrorMessage } from "../Components/Form/ErrorMessage";
import { TransactionContext } from "../context/TransactionContext";
import { useEffect } from "react";

const Login = () => {
  const location = useLocation();
  const data = location.state.info;
  const { connectWallet, sendTransaction } = useContext(TransactionContext);

  useEffect(() => {
    connectWallet();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const username = e.target.username.value;
    const tmp = {
      username,
      password,
    };

    console.log(data.election_id, data.candidate_id, data.user_id);

    connectWallet();
    sendTransaction(data.election_id, data.candidate_id, data.user_id);
  };

  return (
    <>
      <div className="content">
        <form onSubmit={handleSubmit} method="POST">
          <Paper elevation={3}>
            <Box px={3} py={2}>
              <Typography variant="h6" align="center" margin="dense">
                Enter Credentials
              </Typography>
              <Grid container pt={3} spacing={3}>
                <Grid item xs={12} sm={12}>
                  <InputField
                    label="username"
                    name="username"
                    fullWidth={true}
                    value={data.user_username}
                    id="outlined-disabled"
                    disabled
                  />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <InputField
                    label="Election Id"
                    name="election_id"
                    fullWidth={true}
                    value={data.election_id}
                    id="outlined-disabled"
                    disabled
                  />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <InputField
                    label="Candidate Name"
                    name="candidate_name"
                    fullWidth={true}
                    value={data.candidate_username}
                    id="outlined-disabled"
                    disabled
                  />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <InputField
                    label="Password"
                    name="password"
                    fullWidth={true}
                    id="password"
                  />
                  <ErrorMessage />
                </Grid>
              </Grid>
              <Box mt={3}>
                <Button type="submit" variant="contained" color="primary">
                  Vote
                </Button>
              </Box>
            </Box>
          </Paper>
        </form>
      </div>
    </>
  );
};

export default Login;
