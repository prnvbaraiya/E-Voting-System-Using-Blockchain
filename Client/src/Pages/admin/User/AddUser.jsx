import React from "react";
import { Button, Typography, Box, Grid, Paper } from "@mui/material";
import InputField from "../../../Components/Form/InputField";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../../Components/Form/ErrorMessage";
import axios from "axios";
import ContentHeader from "../../../Components/ContentHeader";

const AddUser = () => {
  const navigate = useNavigate();
  const [locationData, setLocation] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const mobile = e.target.mobile.value;
    const password = e.target.password.value;
    const location = locationData.country_name;
    const data = { username, email, mobile, password, location };

    axios.post("http://localhost:1322/api/auth/register", data).then((res) => {
      console.log(res.status);
      if (res.status === 201) {
        navigate("/admin/user");
      }
    });
  };

  useEffect(() => {
    async function getData() {
      let data = await axios.get("https://geolocation-db.com/json/");
      setLocation(data.data);
    }
    getData();
  }, []);

  return (
    <div className="admin__content">
      <ContentHeader />
      <div className="content">
        <form onSubmit={handleSubmit} method="POST">
          <Paper elevation={3}>
            <Box px={3} py={2}>
              <Typography variant="h6" align="center" margin="dense">
                Add User
              </Typography>
              <Grid container pt={3} spacing={3}>
                <Grid item xs={12} sm={12}>
                  <InputField
                    label="username"
                    name="username"
                    fullWidth={true}
                  />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    label="First Name"
                    name="fname"
                    fullWidth={true}
                  />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField label="Last Name" name="lname" fullWidth={true} />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <InputField label="E-mail" name="email" fullWidth={true} />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <InputField label="Mobile" name="mobile" fullWidth={true} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    type="password"
                    label="Password"
                    name="password"
                    fullWidth={true}
                  />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    type="password"
                    label="Confirm Password"
                    name="confirmpassword"
                    fullWidth={true}
                  />
                  <ErrorMessage />
                </Grid>
              </Grid>
              <Box mt={3}>
                <Button type="submit" variant="contained" color="primary">
                  Add User
                </Button>
              </Box>
            </Box>
          </Paper>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
