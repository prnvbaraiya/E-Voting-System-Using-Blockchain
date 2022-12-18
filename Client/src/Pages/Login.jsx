import { Button, Typography, Box, Grid, Paper } from "@mui/material";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import InputField from "../Components/Form/InputField";
import { ErrorMessage } from "../Components/Form/ErrorMessage";
import { TransactionContext } from "../context/TransactionContext";
import { useEffect } from "react";
import { serverLink } from "../Data/Variables";
import { ObjectGroupBy } from "../Data/Methods";
import axios from "axios";

const Login = () => {
  const location = useLocation();
  const data = location.state.info;
  const { connectWallet, sendTransaction, getAllTransactions } =
    useContext(TransactionContext);

  useEffect(() => {
    connectWallet();

    async function getData() {
      let link = serverLink + "election/" + data.election_id;
      let res = await axios.get(link);
      let election = res.data;

      let transactions = await getAllTransactions();
      var electionGroup = ObjectGroupBy(transactions, "election_id");
      var candidate = ObjectGroupBy(electionGroup[election._id], "user_id");
      if (candidate[data.user_id].length > 0) {
        alert("You already Voted");
        window.location.href = "/";
      }
    }
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const username = e.target.username.value;
    const tmp = {
      username,
      password,
    };
    // axios.post(serverLink + "votingEmail", { id: data.user_id });

    let check = await axios.post(serverLink + "login", tmp);
    if (check.status === 202) {
      alert("Invalid Password");
    }
    if (check.status === 201) {
      await connectWallet();
      let trans = false;
      trans = await sendTransaction(
        data.election_id,
        data.candidate_id,
        data.user_id
      );

      if (trans) {
        window.location.href = "/";
        axios.post(serverLink + "votingEmail", { id: data.user_id });
        alert("Thank You For the Vote");
      } else {
        alert("There is Some Internal Error Try again later");
      }
    }
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
                    type="password"
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
                    type="password"
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
