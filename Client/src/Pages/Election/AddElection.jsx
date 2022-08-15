import React from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import InputField from "../../Components/Form/InputField";
import InputTags from "../../Components/Form/InputTags";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddElection = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const tmp = [];
    for (let i = 0; i < candidates.length; i++) {
      tmp.push(candidates[i].username);
    }
    const data = { name, candidates: tmp };

    axios
      .post("http://localhost:1322/api/auth/election/register", data)
      .then((res) => {
        console.log(res.status);
        if (res.status === 201) {
          navigate("/admin/election");
        }
      });
  };

  return (
    <>
      <div className="admin__content">
        <div className="content__header">
          <div className="content__header__path">{"  "} PATH</div>
        </div>
        <hr />
        <div className="content">
          <form onSubmit={handleSubmit} method="POST">
            <Paper elevation={3}>
              <Box px={3} py={2}>
                <Typography variant="h6" align="center" margin="dense">
                  Elections
                </Typography>
                <Grid container pt={3} spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InputField label="name" name="name" fullWidth={true} />
                  </Grid>
                  <Grid item xs={12} sm={6}></Grid>
                  <Grid item xs={12} sm={6}>
                    <InputTags
                      setCandidates={setCandidates}
                      candidates={candidates}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}></Grid>
                </Grid>
                <Box mt={3}>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Box>
              </Box>
            </Paper>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddElection;