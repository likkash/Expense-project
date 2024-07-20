import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { callGet } from './service';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ExpenseTable = () => {
  const [myDocuments, setMyDocuments] = useState([]);
  const nav = useNavigate();
  const userId = sessionStorage.getItem('logged');

  const makeFetch = async () => {
    try {
      const response = await callGet(`http://localhost:1234/exp/user/${userId}`);
      console.log(response); // Check if data is being fetched
      setMyDocuments(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      makeFetch();
    } else {
      nav('/');
    }
  }, [userId]);

  const columns = [
    { field: 'ExpenseId', headerName: 'Expense ID', width: 120 },
    { field: 'ExpenseDate', headerName: 'Expense Date', width: 150 },
    { field: 'ExpenseFor', headerName: 'Expense For', width: 200 },
    { field: 'ExpenseAmount', headerName: 'Expense Amount', width: 150 },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={6}
      style={{ minHeight: '100vh' }}
    >
      <div className='shadow-lg p-4 bg-white' style={{ maxWidth: '1000px', width: '100%' }}>
        <div style={{ height: 400 }}>
          <DataGrid
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 }
              }
            }}
            columns={columns}
            rows={myDocuments}
            getRowId={(obj) => obj._id}
            autoHeight
            style={{ minHeight: 400 }}
          />
        </div>
      </div>
    </Box>
  );
}

export default ExpenseTable;
