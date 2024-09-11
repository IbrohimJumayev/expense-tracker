import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsTotals, setTransactionsTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  });
  const transactionCollectedRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();
  const getTransactions = async () => {
    try {
      const queryTransactions = query(
        transactionCollectedRef,
        where("userID", "==", userID),
        orderBy("createAt")
      );

      let unsubscribe;

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });

          if (data.transactionType == "expense") {
            totalExpenses += Number(data.transactionAmout);
          } else {
            totalIncome += Number(data.transactionAmout);
          }
        });

        setTransactions(docs);
        let balance = totalIncome - totalExpenses
        setTransactionsTotals({
          balance,
          expenses:totalExpenses,
          income:totalIncome
        });
      });
    } catch (error) {
      console.error(error);
    }

    return () => unsubscribe();
  };
  useEffect(() => {
    getTransactions();
  }, []);
  return { transactions, transactionsTotals };
};
