import React, { useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';

import './ReactTable.css';

const ReactTable = () => {
  const [ques, setQues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch('https://phase-1-updated.onrender.com/profile/problems');
        if (!res.ok) {
          res = await fetch('https://phase-1-updated.onrender.com/problems');
          if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
        }
        const data = await res.json();
        setQues(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        // Handle error
      }
    };
    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Sr. No',
        accessor: (row, index) => index + 1, // Dynamic serial number based on row index
      },
      {
        Header: 'Question',
        accessor: 'name',
        Cell: ({ cell: { value, row } }) => (
          <a href={row.original.link} target="_blank" rel="noreferrer">
            {value}
          </a>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, nextPage, previousPage, canPreviousPage, canNextPage } =
    useTable({ columns, data: ques }, usePagination);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[900px] flex-col gap-y-4 mx-auto">
      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                    <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="btn-container">
        <button disabled={!canPreviousPage} onClick={previousPage}>
          prev
        </button>
        <button disabled={!canNextPage} onClick={nextPage}>
          next
        </button>
      </div>
    </div>
  );
};

export default ReactTable;
