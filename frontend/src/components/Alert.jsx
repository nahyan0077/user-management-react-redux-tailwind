import React from 'react';
import { Alert as MuiAlert } from '@mui/material';

const Alert = ({ severity, children }) => {
  return <MuiAlert severity={severity}>{children}</MuiAlert>;
};

export default Alert;