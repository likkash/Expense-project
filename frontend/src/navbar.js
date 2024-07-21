import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Menu, MenuItem } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import { DataGrid } from '@mui/x-data-grid';
import { callGet } from './service';

export const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [myDocuments, setMyDocuments] = useState([]);
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('logged');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const handleLogout = () => {
        // Clear user session data
        sessionStorage.removeItem('logged');
        // Redirect to login page
        navigate('/');
    };

    const makeFetch = async () => {
        try {
            const response = await callGet(`http://localhost:1234/exp/user/${userId}`);
            setMyDocuments(response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (userId) {
            makeFetch();
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
            className="navbar-background"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            <AppBar
                position="sticky"
                sx={{ backgroundColor: '#2C3E50', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, color: '#ECF0F1' }}
                        onClick={handleClick}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={open}
                        onClose={handleClose}
                        sx={{ mt: '45px' }}
                    >
                        <MenuItem onClick={() => {
                            navigate("/expenseadd");
                            handleClose();
                        }}>
                            <AddIcon sx={{ mr: 1 }} />
                            Add Expense
                        </MenuItem>
                        <MenuItem onClick={() => {
                            navigate("/View");
                            handleClose();
                        }}>
                            <ViewCompactIcon sx={{ mr: 1 }} />
                            Edit Your Expenses
                        </MenuItem>
                    </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#ECF0F1' }}>
                        Expense Tracker
                    </Typography>
                    <Button color="inherit" onClick={handleLogout} sx={{ display: 'flex', alignItems: 'center' }}>
                        <LogoutIcon sx={{ mr: 1 }} />
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: 2,
                }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mt={6}
                >
                        <div className="table-container">

                    <div style={{ height: 400, width: '100%' }}>
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
            </Box>
        </Box>
    );
};

export default NavBar;
