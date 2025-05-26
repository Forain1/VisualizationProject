import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const FooterBar = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#0f172a',
        color: '#cbd5e1',
        padding: '16px 24px',
        textAlign: 'center',
        fontSize: '0.875rem',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.2)',
      }}
    >
      <Typography variant="body2">
        “The only bad workout is the one that didn’t happen.”
      </Typography>
    </Box>
  );
};

export default FooterBar;
