import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useGetUserInfo } from "./useGetUserInfo";
export const useAddTransactions = () => {
  const transactionCollectedRef = collection(db, "transactions");
const {userID} = useGetUserInfo()
  const addTransactions = async ({
    description,
    transactionAmout,
    transactionType,
  }) => {
    await addDoc(transactionCollectedRef, {
      userID,
      description,
      transactionAmout,
      transactionType,
      createAt: serverTimestamp(),
    });
  };
  return { addTransactions };
};
