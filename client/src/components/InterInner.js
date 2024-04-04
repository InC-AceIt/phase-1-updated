import React from 'react'
import MOCK_DATA2 from "./MOCK_DATA2.json";
import { useTable, usePagination } from "react-table";
import "./InterInner.css"

const InterInner = () => {
    const data = React.useMemo(() => MOCK_DATA2, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Question",
        accessor: "question",
      },
      {
        Header: "Topic",
        accessor: "topic",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, nextPage, previousPage, canPreviousPage, canNextPage} =
    useTable({ columns, data },usePagination);

  return (
    <div className=" max-w-[900px] flex-col gap-y-4 mx-auto">
        <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        <div className='btn-container'>
            <button disabled={!canPreviousPage} onClick={previousPage}>
               prev
            </button>
            <button disabled={!canNextPage} onClick={nextPage}>
               next 
            </button>
        </div>
    </div>
  );
}

export default InterInner
