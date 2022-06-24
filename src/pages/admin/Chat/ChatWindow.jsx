import React from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import Box from '@mui/material/Box';
import Message from './Message';

const ChatWindow = ({ chat, currentUser }) => {
    return (
        <PerfectScrollbar style={{ height: 'calc(75vh - 5rem)' }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {chat.map((m) => (
                    <Message currentUser={currentUser} key={Date.now() * Math.random()} user={m.user} message={m.message} />
                ))}
            </Box>
        </PerfectScrollbar>
    );
};

export default ChatWindow;
