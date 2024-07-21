import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import BackspaceIcon from '@mui/icons-material/Backspace';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import './back.css';
import { callUpdate, callGet } from "./service";

const Update = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [datatype, setDatatype] = useState({
    ExpenseId: "",
    ExpenseDate: "",
    ExpenseByUserName: "",
    ExpenseFor: "",
    ExpenseAmount: ""
  });

  useEffect(() => {
    const fetchExpenseDetails = async () => {
      try {
        const response = await callGet(`http://localhost:1234/${id}`);
        setDatatype(response); // Set the state with the fetched data
      } catch (error) {
        console.error("Error fetching expense details:", error);
      }
    };

    fetchExpenseDetails();
  }, [id]);

  const collecting = (eve) => {
    const { name, value } = eve.target;
    setDatatype((old) => ({
      ...old,
      [name]: value
    }));
  };

  const publish = async () => {
    try {
      const response = await callUpdate(`http://localhost:1234/upd`, datatype);
      alert(JSON.stringify(response));
      nav('/view');
    } catch (error) {
      console.error("Error publishing data:", error);
      alert("There was an error submitting your data. Please try again.");
    }
  };

  return (
    <Container className="addupdate" style={{ height: '100vh', overflow: 'auto' }}>
      <div className="container ">
        <div className="row justify-content-center">
          <Typography variant="h4" color="darkblue" align="center">
            Expense Edit Form
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
                    sx={{ padding: '8px' }}
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
                    sx={{ padding: '8px' }}
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
                    sx={{ padding: '8px' }}
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
                    sx={{ padding: '8px' }}
                  />
                </div>
              </div>
              <Box display="flex" justifyContent="space-around" mt={3}>
                <Button onClick={publish} variant="contained" color="primary">
                  Submit
                </Button>
                <Button variant="contained" color="error" onClick={() => nav('/view')}>
                  <BackspaceIcon />
                </Button>
              </Box>
              <Box display="flex" justifyContent="center" mt={3}>
                <Button onClick={() => nav('/view')} variant="contained" color="secondary">
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

export default Update;
