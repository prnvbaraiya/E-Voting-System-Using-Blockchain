import React, { useContext, useEffect } from "react";
import { TransactionContext } from "../../../context/TransactionContext";

const ViewResult = () => {
  const { getAllTransactions, transactions } = useContext(TransactionContext);

  useEffect(() => {
    getAllTransactions();
    console.log(transactions);
  }, []);
  return <div>Resukt Page</div>;
};

export default ViewResult;
