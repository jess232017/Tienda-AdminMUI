import React, { useState } from 'react';

import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';

//icon
import SendIcon from '@mui/icons-material/Send';

const ChatInput = ({ sendMessage, currentUser }) => {
    const [message, setMessage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const isMessageProvided = message && message !== '';

        if (isMessageProvided) {
            setMessage('');
            sendMessage(currentUser, message);
        } else {
            alert('Por favor ingrese un mensaje');
        }
    };

    const onMessageUpdate = (e) => {
        setMessage(e.target.value);
    };

    return (
        <Stack
            component="form"
            onSubmit={onSubmit}
            direction="row"
            spacing={2}
            alignItems="center"
            p={2}
            paddingX={4}
            sx={{
                boxShadow: '0 -1px 0 0 rgb(0 0 0 / 12%)',
            }}
        >
            <div className="input-style" style={{ flex: 1, paddingBottom: 15 }}>
                <label htmlFor="message">Mensaje:</label>
                <input
                    type="text"
                    id="message"
                    placeholder="Escribe un mensaje"
                    name="message"
                    value={message}
                    onChange={onMessageUpdate}
                />
            </div>
            <Fab color="primary" size="small" aria-label="send" type="submit">
                <SendIcon />
            </Fab>
        </Stack>
    );
};

export default ChatInput;
