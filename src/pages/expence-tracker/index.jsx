import { useState } from "react";
import { auth } from "../../config/firebase";
import { useAddTransactions } from "../../hooks/useAddTransactions";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { TableComponent } from "./table";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ExpenceTracker = () => {
  const { addTransactions } = useAddTransactions();

  const [description, setDescription] = useState("");
  const [transactionAmout, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const navigate = useNavigate();

  const { transactions, transactionsTotals } = useGetTransactions();

  const onSubmit = (e) => {
    e.preventDefault();
    addTransactions({
      description,
      transactionAmout,
      transactionType,
    });
    setDescription("");
    setTransactionAmount(0);
    setTransactionType("expense");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const {balance, income, expenses} = transactionsTotals

  return (
    <>
      <div className="max-w-6xl m-auto mt-5 px-5">
        <div className="flex justify-between items-center">
          <h1 className="sm:text-2xl text-xl font-bold">Expence Tracker</h1>
          <div className="flex gap-5 items-center ">
            <p className="sm:text-xl text-base font-light">Balance: ${balance} </p>
            {auth?.currentUser?.photoURL ? (
              <img
                className="rounded-full w-10"
                src={auth?.currentUser?.photoURL}
                alt=""
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <button
          onClick={signUserOut}
          className="font-bold border border-black px-2 py-1 mt-3 hover:bg-black hover:text-white duration-300 active:scale-75"
        >
          Sign Out
        </button>

        <div className="flex max-sm:flex-col  items-center justify-between gap-2 sm:gap-10 mt-5 sm:mt-10">
          <div className="flex gap-1">
            <h2>Total Income - $</h2>
            <p>{income}</p>
          </div>
          <div className="flex gap-1">
            <h2>Total Expences -</h2>
            <p>${expenses}</p>
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex gap-3 mt-5 sm:mt-10 max-sm:flex-col items-center"
        >
          <input
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            value={description}
            name=""
            id=""
            placeholder="Description"
            required
          />
          <input
            onChange={(e) => setTransactionAmount(e.target.value)}
            type="number"
            value={transactionAmout}
            name=""
            id=""
            required
            placeholder="Amount"
          />
          <div className="flex gap-3 mt-4 items-center">
            <input
              value="expense"
              onChange={(e) => setTransactionType(e.target.value)}
              type="radio"
              name="type"
              id="expence"
              required
            />
            <label htmlFor="expence">Expence</label>
            <input
              value="income"
              onChange={(e) => setTransactionType(e.target.value)}
              type="radio"
              name="type"
              id="income"
              required
            />
            <label htmlFor="income">Income</label>
          </div>
          <button className="ml-5 mt-2 border border-black px-4 py-2">
            Add Transaction
          </button>
        </form>
      </div>

      <div className="max-w-6xl m-auto px-5">
        <h3 className="text-center sm:mt-10 mt-5 text-xl font-bold text-blue-500">
          Transactions{" "}
        </h3>
        <TableComponent />
      </div>
    </>
  );
};

export default ExpenceTracker;
