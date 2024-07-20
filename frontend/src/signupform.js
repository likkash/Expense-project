import React, { useState } from 'react';
import { Button, TextField, Avatar, Box, Container, CssBaseline, Grid, Link, Typography, ThemeProvider, createTheme } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { callSignup } from './service'; 
import { useNavigate } from 'react-router-dom';
import './back.css'; // Import the CSS file

const defaultTheme = createTheme();

export default function SignUp() {
  const [user, setUser] = useState({
    Username: '',
    Password: '',
    FullName: '',
    Contact: '',
  });
  const [error, setError] = useState(''); // Added error state
  const nav = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    try {
      const result = await callSignup(user);
      if (result.error) {
        setError(result.error); // Display error if there's an issue
      } else {
        alert(JSON.stringify(result));
        nav('/'); // Redirect to login page
      }
    } catch (error) {
      setError("An unexpected error occurred."); // Handle unexpected errors
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" className="main-container">
        <CssBaseline />
        <Box className="overlay"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <AssignmentIndIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="username"
                  name="Username"
                  value={user.Username}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fullname"
                  name="FullName"
                  value={user.FullName}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="fullname"
                  label="Full Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="new-password"
                  name="Password"
                  value={user.Password}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="contact"
                  name="Contact"
                  value={user.Contact}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="contact"
                  label="Contact"
                />
              </Grid>
            </Grid>
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" onClick={() => nav('/')}>
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
