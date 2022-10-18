import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../../context/TransactionContext";
import axios from "axios";
import { serverLink } from "../../../Data/Variables";
import { Grid, Toolbar } from "@mui/material";
import ElectionResult from "../../../Components/Admin/ElectionResult";
import ContentHeader from "../../../Components/ContentHeader";
import {
  ObjectGroupBy,
  ObjectKeyReplace,
  TwoArraySort,
} from "../../../Data/Methods";

const ViewResult = () => {
  const { getAllTransactions } = useContext(TransactionContext);
  const [result, setResult] = useState([]);

  useEffect(() => {
    async function getData() {
      const transactions = await getAllTransactions();
      console.log(transactions);
      let link = serverLink + "/candidates";
      let res = await axios.get(link);
      const candidates = res.data;

      link = serverLink + "/elections";
      res = await axios.get(link);
      const electionsD = res.data;

      var electionGroup = ObjectGroupBy(transactions, "election_id");
      electionGroup = ObjectKeyReplace(
        electionGroup,
        electionsD,
        "_id",
        "name"
      );

      const elections = Object.keys(electionGroup);

      var ans = [];

      for (let i = 0; i < elections.length; i++) {
        var electionRes = ObjectGroupBy(
          electionGroup[elections[i]],
          "candidate_id"
        );

        electionRes = ObjectKeyReplace(
          electionRes,
          candidates,
          "_id",
          "username"
        );

        let votes = [];
        let candidate = Object.keys(electionRes);
        // eslint-disable-next-line
        candidate.filter((tmp) => votes.push(electionRes[tmp].length));
        [votes, candidate] = TwoArraySort(votes, candidate);
        ans.push({ name: elections[i], candidates: candidate, vote: votes });
      }

      console.log("Ans=", ans);
      setResult(ans);
    }
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="admin__content">
      <ContentHeader />
      <div style={{ paddingBottom: 25 }}>
        <Toolbar>
          <Grid container pt={3} spacing={2}>
            {result &&
              result.map((item, index) => {
                return (
                  <Grid item xs={6} md={4} key={index}>
                    <ElectionResult
                      index={index}
                      title={item.name}
                      candidates={item.candidates}
                      election={item._id}
                      info={item}
                    />
                  </Grid>
                );
              })}
            ;
          </Grid>
        </Toolbar>
      </div>
    </div>
  );
};

export default ViewResult;
