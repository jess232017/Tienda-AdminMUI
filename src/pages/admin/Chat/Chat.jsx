import React, { useState, useEffect, useRef } from 'react';

import { useAuthUser } from 'react-auth-kit';
import { HubConnectionBuilder } from '@microsoft/signalr';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

const Chat = () => {
    const auth = useAuthUser()();
    const latestChat = useRef(null);
    const [chat, setChat] = useState([]);
    const [connection, setConnection] = useState(null);

    latestChat.current = chat;

    useEffect(() => {
        const newConnection = new HubConnectionBuilder().withUrl('https://localhost:7281/hubs/chat').withAutomaticReconnect().build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then((result) => {
                    console.log('Connected!');

                    connection.on('ReceiveMessage', (message) => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);

                        setChat(updatedChat);
                    });
                })
                .catch((e) => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async (user, message) => {
        const chatMessage = {
            user: user,
            message: message,
        };

        console.log(connection);
        if (connection._connectionStarted) {
            try {
                await connection.send('SendMessage', chatMessage);
            } catch (e) {
                console.log(e);
            }
        } else {
            alert('No connection to server yet.');
        }
    };

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardContent sx={{ flex: '1' }}>
                <ChatWindow chat={chat} currentUser={auth.username} />
            </CardContent>
            <ChatInput sendMessage={sendMessage} currentUser={auth.username} />
        </Card>
    );
};

export default Chat;
