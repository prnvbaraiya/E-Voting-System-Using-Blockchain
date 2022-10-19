import { Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import CardLayout from "../Components/User/CardLayout";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { serverLink } from "../Data/Variables";
import { getResult } from "../Data/Methods";
import { TransactionContext } from "../context/TransactionContext";

const ResultElection = () => {
  const style = {
    pageTitle: {
      paddingTop: 5,
      paddingBottom: 5,
    },
  };

  const [data, setData] = useState([]);
  const { getAllTransactions } = useContext(TransactionContext);

  useEffect(() => {
    async function getData() {
      let res = await axios.get(serverLink + "result/elections");
      let users = res.data;
      let transactions = await getAllTransactions();
      let result = await getResult(transactions);
      let ans = [];
      // eslint-disable-next-line
      users.map((item) => {
        for (let i = 0; i < result.length; i++) {
          if (result[i].name === item.name) {
            item = {
              ...item,
              vote: result[i].vote,
              candidates: result[i].candidates,
              info: result[i],
            };
            ans.push(item);
            break;
          }
        }
      });
      console.log(ans);
      setData(ans);
    }
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ paddingBottom: 25 }}>
      <Toolbar>
        <Grid container pt={3} spacing={2}>
          <Grid container justifyContent="center" alignItems="center">
            <Typography variant="h3" style={style.pageTitle}>
              Election Result
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
                  link={item.name}
                  info={item.info}
                />
              </Grid>
            );
          })}
        </Grid>
      </Toolbar>
    </div>
  );
};

export default ResultElection;
