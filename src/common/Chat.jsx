import React, { useState, useEffect, useRef } from 'react';

import { useAuthUser } from 'react-auth-kit';
import PerfectScrollbar from 'react-perfect-scrollbar';

//mui
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

//icon
import SendIcon from '@mui/icons-material/Send';

const Chat = ({ chatSocket, messages, room }) => {
    const auth = useAuthUser()();
    const [message, setMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        if (message && message !== '') {
            const chatMessage = {
                user: auth.username,
                message: message,
                room,
            };

            if (chatSocket._connectionStarted) {
                try {
                    await chatSocket.send('SendGroupMessage', chatMessage);
                    setMessage('');
                } catch (e) {
                    console.log(e);
                }
            } else {
                alert('No connection to server yet.');
            }
        } else {
            alert('Por favor ingrese un mensaje');
        }
    };

    const onMessageUpdate = (e) => {
        setMessage(e.target.value);
    };

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <CardContent sx={{ flex: '1' }}>
                <PerfectScrollbar style={{ height: 'calc(75vh - 5rem)' }}>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {messages?.map((m) => (
                            <Alert
                                icon={false}
                                variant="filled"
                                key={Date.now() * Math.random()}
                                severity={m.user === auth.username ? 'success' : 'info'}
                                sx={{
                                    width: '50%',
                                    alignSelf: m.user === auth.username ? 'end' : 'start',
                                    mb: 2,
                                    borderRadius: m.user === auth.username ? '20px 0px 20px 20px' : '0px 20px 20px 20px',
                                }}
                            >
                                <AlertTitle>{m.user}</AlertTitle>
                                {m.message}
                            </Alert>
                        ))}
                    </Box>
                </PerfectScrollbar>
            </CardContent>
            {/*Input */}
            <Stack
                component="form"
                onSubmit={onSubmit}
                sx={{
                    p: 2,
                    gap: 2,
                    paddingX: 4,
                    flexDirection: 'row',
                    alignItems: 'center',
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
        </Card>
    );
};

export default Chat;
