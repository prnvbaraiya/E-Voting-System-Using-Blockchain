import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Toolbar, Typography } from "@mui/material";
import CandidateLayout from "../Components/User/CandidateLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverLink } from "../Data/Variables";

const ViewElection = () => {
  const { id } = useParams();

  const style = {
    pageTitle: {
      paddingTop: 5,
      paddingBottom: 5,
    },
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      let link = serverLink + "election/" + id;
      let res = await axios.get(link);
      let users = res.data;
      setData(users);
    }
    getData();
  }, [id]);

  return (
    <>
      <div style={{ paddingBottom: 25 }}>
        <Toolbar>
          <Grid container pt={3} spacing={2}>
            <Grid container justifyContent="center" alignItems="center">
              <Typography variant="h3" style={style.pageTitle}>
                Candidates of {data.name}
              </Typography>
            </Grid>
            {data.candidates != null &&
              data.candidates.map((item, index) => {
                return (
                  <Grid item xs={6} md={4} key={index}>
                    <CandidateLayout
                      username={item}
                      index={index}
                      id={data._id}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Toolbar>
      </div>
    </>
  );
};

export default ViewElection;
