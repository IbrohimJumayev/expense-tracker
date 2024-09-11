import { useGetTransactions } from "../../hooks/useGetTransactions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

export function TableComponent() {
  const { transactions } = useGetTransactions();

  return (
    <div className="overflow-x-auto max-w-3xl m-auto mt-10">
      <Table>
        <TableHead>
          <TableHeadCell> Name</TableHeadCell>
          <TableHeadCell> Amount</TableHeadCell>
          <TableHeadCell> Type</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {transactions.map((transaction) => {
            const { description, transactionAmout, transactionType } =
              transaction;
            return (
              <TableRow
                key={transaction.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {description}
                </TableCell>
                <TableCell>${transactionAmout}</TableCell>
                <TableCell>
                  <strong
                    style={{
                      color: transactionType == "expense" ? "red" : "green",
                    }}
                  >
                    {transactionType}
                  </strong>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
