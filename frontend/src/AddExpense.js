import React, { useState } from "react";
import Container from '@mui/material/Container';
import BackspaceIcon from '@mui/icons-material/Backspace';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { callPost } from "./service";

const AddExpense = () => {
  const [datatype, setDatatype] = useState({
    ExpenseId: "",
    ExpenseDate: "",
    ExpenseByUserName: "",
    ExpenseFor: "",
    ExpenseAmount: ""
  });

  const clearFields = () => {
    setDatatype({
      ExpenseId: "",
      ExpenseDate: "",
      ExpenseByUserName: "",
      ExpenseFor: "",
      ExpenseAmount: ""
    });
  };

  const collecting = (eve) => {
    const { name, value } = eve.target;
    setDatatype((old) => ({
      ...old,
      [name]: value
    }));
  };

  const nav = useNavigate();

  const publish = async () => {
    try {
      const response = await callPost('http://localhost:1234/exp/new', datatype);
      alert(JSON.stringify(response.data));
      clearFields(); // Clear the text fields after the alert
    } catch (error) {
      console.error("Error publishing data:", error);
      alert("There was an error submitting your data. Please try again.");
    }
  };



  return (
    <Container style={{ height: '100vh', overflow: 'auto' }}>
      <div className="container">
        <div className="row justify-content-center">
          <Typography variant="h4" color="darkblue" align="center">
            Expense Add Form
          </Typography>
          <div className="col-md-8 col-12 table-container">
            <div className="card p-5 shadow-lg">
              <div className="row justify-content-between">
                <div className="col-md-6 mt-md-0 mt-2 col-sm-12 col-12">
                  <TextField
                    onChange={collecting}
                    name="ExpenseId"
                    label="Expense Id"
                    value={datatype.ExpenseId}
                    variant="outlined"
                    fullWidth
                    sx={{ padding: '8px' }}  // Added padding
                  />
                </div>
                <div className="col-md-6 mt-md-0 mt-2 col-sm-12 col-12">
                  <TextField
                    onChange={collecting}
                    name="ExpenseDate"
                    label="Expense Date"
                    value={datatype.ExpenseDate}
                    variant="outlined"
                    fullWidth
                    sx={{ padding: '8px' }}  // Added padding
                  />
                </div>
              </div>
              <div className="row justify-content-between mt-2">
                <div className="col-md-6 mt-md-0 mt-2 col-sm-12 col-12">
                  <TextField
                    onChange={collecting}
                    name="ExpenseFor"
                    label="Expense For"
                    value={datatype.ExpenseFor}
                    variant="outlined"
                    fullWidth
                    sx={{ padding: '8px' }}  // Added padding
                  />
                </div>
                <div className="col-md-6 mt-md-0 mt-2 col-sm-12 col-12">
                  <TextField
                    onChange={collecting}
                    name="ExpenseAmount"
                    label="Expense Amount"
                    value={datatype.ExpenseAmount}
                    variant="outlined"
                    fullWidth
                    sx={{ padding: '8px' }}  // Added padding
                  />
                </div>
                <div className="col-md-6 mt-md-0 mt-2 col-sm-12 col-12">
                  <TextField
                    onChange={collecting}
                    name="ExpenseByUserName"
                    label="Expense By"
                    value={datatype.ExpenseByUserName}
                    variant="outlined"
                    fullWidth
                    sx={{ padding: '8px' }}  // Added padding
                  />
                </div>
              </div>
              <Box display="flex" justifyContent="space-around" mt={3}>
                <Button
                  onClick={publish}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
                <Button
                  onClick={clearFields}
                  variant="contained"
                  color="error"
                  size="medium"
                >
                  <BackspaceIcon />
                </Button>
              </Box>
              <Box display="flex" justifyContent="center" mt={3}>
                <Button
                  onClick={() => nav('/navbar')}
                  variant="contained"
                  color="secondary"
                  size="medium"
                >
                  Back 
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AddExpense;
