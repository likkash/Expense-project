import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { callDelete, callGet } from './service';
import { Button, Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';

export const Views = () => {
  const [myDocuments, setMyDocuments] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [found, setFound] = useState(null);
  const nav = useNavigate();
  const userId = sessionStorage.getItem('logged');

  const makeFetch = async (date = '') => {
    try {
      let url = `http://localhost:1234/exp/user/${userId}`;
      if (date) {
        url += `?date=${date}`; // Append date parameter to URL if provided
      }
      const response = await callGet(url);
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

  const handleSearch = () => {
    makeFetch(searchDate); // Fetch data based on the search date
  };

  const handleClear = () => {
    setSearchDate(''); // Clear the search date
    makeFetch(); // Fetch all expenses
  };

  const columns = [
    { field: 'ExpenseId', headerName: 'Expense ID', width: 120 },
    { field: 'ExpenseDate', headerName: 'Expense Date', width: 150 },
    { field: 'ExpenseFor', headerName: 'Expense For', width: 200 },
    { field: 'ExpenseAmount', headerName: 'Expense Amount', width: 150 },
  ];

  return (
    <div className='container login-signup-background '>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={6}
        style={{ minHeight: '100vh' }}
      >
        <div className='shadow-lg p-4 bg-white table ' style={{ maxWidth: '1000px', width: '100%' }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={2}
          >
            <TextField
              label="Search by Expense Date"
              className='table-container'
              variant="outlined"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              style={{ marginRight: '10px', width: '300px' }} // Adjust width as needed
            />
            <Button
              onClick={handleSearch}
              variant="contained"
              color="primary"
              style={{ marginRight: '8px' }} // Add spacing between buttons
            >
              <SearchIcon />
            </Button>
            <Button
              onClick={handleClear}
              variant="contained"
              color="warning"
              
            >
              <CancelIcon />
            </Button>
          </Box>
          <div className='table-container'style={{ height: 400 }}>
            <DataGrid
              onRowSelectionModelChange={(ids) => {
                const id = ids[0];
                const collected = myDocuments.find((each) => each._id === id);
                if (collected) {
                  alert(JSON.stringify(collected));
                  setFound(collected);
                }
              }}
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
          {found && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Box display="flex" gap={8}>
                <Button onClick={() => nav(`/update/${found._id}`)} variant="contained" color="info">
                  <AutoFixHighIcon />
                  <span className="ms-2">Edit</span>
                </Button>
                <Button color="error" onClick={async () => {
                  await callDelete(`http://localhost:1234/erase/${found._id}`);
                  setFound(null);
                  makeFetch();
                }} variant="contained">
                  <DeleteOutlineIcon />
                  <span className="ms-2">Delete</span>
                </Button>
              </Box>
            </Box>
          )}
          <Box display="flex" justifyContent="center" mt={3}>
            <Button onClick={() => nav('/navbar')} variant="contained" color="secondary">
              Back
            </Button>
          </Box>
        </div>
      </Box>
    </div>
  );
}

export default Views;
