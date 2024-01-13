import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  Table,
  //   Stack,
  Paper,
  Avatar,
  Popover,
  // Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  Container,
  TableContainer,
  TablePagination,
  Grid,
} from '@mui/material';
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
// components
import Label from '../../components/label';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// mock
import USERLIST from '../../_mock/user';

export default function AdminTransactionDetails() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title> Student Details | IIT Bhilai Dinning System </title>
      </Helmet>

      <Container style={{ margin: '20vh auto' }}>
        <Grid container spacing={3}>
          <Grid onClick={() => navigate('/admin/kumarTransaction')} item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="" total={'Kumar'} color="info" icon={'ant-design:interaction-twotone'} />
          </Grid>

          <Grid onClick={() => navigate('/admin/galavTransaction')} item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="" total={'Galav'} color="warning" icon={'ant-design:interaction-twotone'} />
          </Grid>

          <Grid onClick={() => navigate('/admin/saiTransaction')} item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="" total={'Shree Sai'} color="error" icon={'ant-design:interaction-twotone'} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
