import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../../context/TransactionContext";
import { Grid, Toolbar } from "@mui/material";
import ElectionResult from "../../../Components/Admin/ElectionResult";
import ContentHeader from "../../../Components/ContentHeader";
import { getResult } from "../../../Data/Methods";

const ViewResult = () => {
  const { getAllTransactions } = useContext(TransactionContext);
  const [result, setResult] = useState([]);

  useEffect(() => {
    async function getData() {
      const transactions = await getAllTransactions();
      const ans = await getResult(transactions);
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
                      info={item}
                      link={item.name}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Toolbar>
      </div>
    </div>
  );
};

export default ViewResult;
