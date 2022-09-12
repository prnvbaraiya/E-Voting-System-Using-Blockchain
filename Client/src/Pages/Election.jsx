import { Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import CardLayout from "../Components/User/CardLayout";
import { useEffect, useState } from "react";
import axios from "axios";

const Election = () => {
  const style = {
    pageTitle: {
      paddingTop: 5,
      paddingBottom: 5,
    },
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      let res = await axios.get("http://localhost:1322/api/auth/elections");
      let users = res.data;
      setData(users);
    }
    getData();
  }, []);

  return (
    <div style={{ paddingBottom: 25 }}>
      <Toolbar>
        <Grid container pt={3} spacing={2}>
          <Grid container justifyContent="center" alignItems="center">
            <Typography variant="h3" style={style.pageTitle}>
              Elections
            </Typography>
          </Grid>
          {data.map((item, index) => {
            return (
              <Grid item xs={6} md={4} key={index}>
                <CardLayout
                  index={index}
                  title={item.name}
                  candidates={item.candidates}
                  election={item._id}
                />
              </Grid>
            );
          })}
        </Grid>
      </Toolbar>
    </div>
  );
};

export default Election;
