import React, { useState, useEffect, useRef } from 'react';

import { useAuthUser } from 'react-auth-kit';
import { useVirtualizer } from '@tanstack/react-virtual';

import PerfectScrollbar from 'react-perfect-scrollbar';

//mui
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

    // The scrollable element for your list
    const parentRef = React.useRef();

    // The virtualizer
    const rowVirtualizer = useVirtualizer({
        count: messages?.length || 0,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 35,
    });

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
                    //  parentRef.current?.scrollIntoView({ behavior: 'smooth' });
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
                <div
                    ref={parentRef}
                    style={{
                        height: `22rem`,
                        overflow: 'auto',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: `${rowVirtualizer.getTotalSize()}px`,
                            width: '100%',
                            position: 'relative',
                        }}
                    >
                        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                            const message = messages[virtualItem.index];
                            return (
                                <Alert
                                    icon={false}
                                    variant="filled"
                                    key={virtualItem.key}
                                    severity={message.user === auth.username ? 'success' : 'info'}
                                    sx={{
                                        width: '50%',
                                        alignSelf: message.user === auth.username ? 'end' : 'start',
                                        mb: 2,
                                        borderRadius: message.user === auth.username ? '20px 0px 20px 20px' : '0px 20px 20px 20px',
                                    }}
                                >
                                    <AlertTitle>{message.user}</AlertTitle>
                                    {message.message}
                                </Alert>
                            );
                        })}
                    </div>
                </div>
            </CardContent>
            <Stack
                component="form"
                onSubmit={onSubmit}
                p={2}
                gap={2}
                paddingX={4}
                flexDirection="row"
                alignItems="center"
                boxShadow="0 -1px 0 0 rgb(0 0 0 / 12%)"
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
