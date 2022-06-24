import React from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Message = ({ user, message, currentUser }) => {
    const current = user === currentUser;
    const borderRadius = current ? '20px 0px 20px 20px' : '0px 20px 20px 20px';
    return (
        <Alert
            severity={current ? 'success' : 'info'}
            variant="filled"
            icon={false}
            sx={{
                width: '50%',
                alignSelf: current ? 'end' : 'start',
                mb: 2,
                borderRadius,
            }}
        >
            <AlertTitle>{user}</AlertTitle>
            {message}
        </Alert>
    );
};

/*
const Message = ({ user, message }) => (
    <div style={{ background: '#eee', borderRadius: '5px', padding: '0 10px' }}>
        <p>
            <strong>{user}</strong> says:
        </p>
        <p>{message}</p>
    </div>
);

const Message = ({ user, message }) => (
    <Box
        sx={{
            color: 'white',
            padding: '10px 20px',
            background: '#36f',
            borderRadius: '20px 20px 20px 0px',
        }}
    >
        <p>
            <strong>{user}</strong> says:
        </p>
        <p>{message}</p>
    </Box>
);
*/

export default Message;
