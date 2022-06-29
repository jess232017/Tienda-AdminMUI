import React, { useEffect, useState } from 'react';

import Chat from '@/common/Chat';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem ';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { setRoom } from '@/store/features/chatSlice';

const ChatRoom = ({ rooms, setRoom, room }) => {
    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
            }}
        >
            {Object.values(rooms).map((value) => (
                <React.Fragment key={value}>
                    <ListItem button onClick={() => setRoom(value)}>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={value} secondary={new Date().toDateString()} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            ))}
        </List>
    );
};

const ChatPage = ({ chatSocket }) => {
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.chat.rooms);
    const currentRoom = useSelector((state) => state.chat.currentRoom);
    const messages = useSelector((state) => state.chat.messages[currentRoom]);

    console.log('messages', messages);

    const handleRoom = (value) => {
        dispatch(setRoom(value));
    };

    return (
        <Card sx={{ display: 'flex', height: '100%' }}>
            <ChatRoom rooms={rooms} setRoom={handleRoom} room={currentRoom} />
            <Divider orientation="vertical" flexItem />
            <Chat chatSocket={chatSocket} messages={messages} room={currentRoom} />
        </Card>
    );
};

export default ChatPage;
