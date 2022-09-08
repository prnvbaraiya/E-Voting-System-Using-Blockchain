import React from "react";
import { Button, Typography, Box, Grid, Paper } from "@mui/material";
import InputField from "../../../Components/Form/InputField";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "../../../Components/Form/ErrorMessage";
import axios from "axios";
import ContentHeader from "../../../Components/ContentHeader";
import { serverLink } from "../../../Data/Variables";

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      const link = serverLink + "user/" + id;
      const t = await axios.get(link);
      setData(t.data);
    }
    getData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const fname = e.target.fname.value;
    const lname = e.target.lname.value;
    const mobile = e.target.mobile.value;
    const newData = { username, fname, lname, email, mobile };

    const link = serverLink + "user/edit/" + data._id;

    axios.post(link, newData).then((res) => {
      if (res.status === 200) {
        navigate("/admin/user");
      }
    });
  };

  return (
    <div className="admin__content">
      <ContentHeader />
      {data && (
        <div className="content">
          <form onSubmit={handleSubmit} method="POST">
            <Paper elevation={3}>
              <Box px={3} py={2}>
                <Typography variant="h6" align="center" margin="dense">
                  Edit User
                </Typography>
                <Grid container pt={3} spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <InputField
                      label="username"
                      name="username"
                      fullWidth={true}
                      value={data.username}
                    />
                    <ErrorMessage />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      label="First Name"
                      name="fname"
                      fullWidth={true}
                      value={data.fname}
                    />
                    <ErrorMessage />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      label="Last Name"
                      name="lname"
                      fullWidth={true}
                      value={data.lname}
                    />
                    <ErrorMessage />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputField
                      label="E-mail"
                      name="email"
                      fullWidth={true}
                      value={data.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputField
                      label="Mobile"
                      name="mobile"
                      fullWidth={true}
                      value={data.mobile}
                    />
                  </Grid>
                </Grid>
                <Box mt={3}>
                  <Button type="submit" variant="contained" color="primary">
                    Update User
                  </Button>
                </Box>
              </Box>
            </Paper>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewUser;
