import React from 'react'
import MOCK_DATA2 from "./MOCK_DATA2.json";
import { useTable, usePagination } from "react-table";
import "./InterInner.css";
import { useState } from 'react';

const InterInner = ({response}) => {

  console.log("res: ",response);


  const [loading, setLoading] = useState(true);


  const matchQue = response.matchingQuestions;

  // useEffect(() => {
  //   const fetchInter = async () => {
  //     try {
  //       let res = await fetch('/profile/interviewprep');
  //       if (!res.ok) {
  //         res = await fetch('/problems');
  //         if (!res.ok) {
  //           throw new Error('Failed to fetch data');
  //         }
  //       }
  //       const data = await res.json();
  //       setInter(response);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error:', error);
  //       // Handle error
  //     }
  //   };
  //   fetchInter();
  // }, []);

  


  const data = React.useMemo(() => matchQue, [matchQue]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Question",
        accessor: "text",
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
