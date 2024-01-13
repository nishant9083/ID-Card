import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import Upload from '../Upload';

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [userId, setUser] = useState(null); // State to store user info
  const [name, setName] = useState('');
  const [messName, setMessName] = useState('');
  const [addOn, setAddOn] = useState('');
  const [basic, setBasic] = useState('');
  useEffect(() => {
    async function fetchData() {
      try {
        // // Get the JWT token from local storage (or wherever you store it)
        // const token = localStorage.getItem("jwtToken");
        // const person = localStorage.getItem("person");
        // if (!token) {
        //   navigate('/login', { replace: true });
        // }
        // // else{
        const response = await axios.post(
          'http://localhost:5000/api/verify/details',
          { xhrfields: { withCredentials: true } },
          {
            withCredentials: true,
          }
        );

        // If the response is successful, you can access the protected user data here        
        const user = response.data.userInfo;
        if (user.person !== 'Admin') navigate('/login', { replace: true });
        localStorage.setItem('email', user.email);
        localStorage.setItem('name', user.name);
        setName(user.name);
      } catch (error) {
        // Handle errors, such as token validation failure or network issues
        localStorage.clear();
        sessionStorage.clear();
        if (error.response && error.response.data && error.response.data.msg) {
          const errorMessage = error.response.data.msg;
          // Display the error message to the user (e.g., using an alert or on the UI)
          alert(errorMessage);
        } else {
          // Handle unexpected errors
          console.error(error);
          // If token validation fails or there's an error, navigate the user to the login page
        }
        navigate('/login', { replace: true });
      }
    }

    fetchData();
  }, [navigate]); // Empty dependency array, runs once on mount

  return (
    <>
      <Helmet>
        <title> Admin Dashboard | IIT Bhilai Dining Page </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 5 }}>
          Welcome Admin!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="" total="Options" icon={'ant-design:home-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="" total={'Options'} color="info" icon={'ant-design:interaction-twotone'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="" total={'Options'} color="warning" icon={'ant-design:money-collect-twotone'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="" total={'Options'} color="error" icon={'ant-design:bank-twotone'} />
          </Grid>
        </Grid>
        <div>
          <Upload />
        </div>
      </Container>
    </>
  );
}
