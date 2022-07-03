import React, { useEffect, useState } from 'react';

import Splitter from '@devbookhq/splitter';
import { useAuthUser } from 'react-auth-kit';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Chat from '@/common/Chat';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';

import List from '@mui/material/List';

import ListItem from '@mui/material/ListItemButton ';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

//icons
import SupportAgentIcon from '@mui/icons-material/SupportAgentTwoTone';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { setRoom } from '@/store/features/chatSlice';

const ChatPage = ({ chatSocket }) => {
    const auth = useAuthUser()();
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.chat.rooms);
    const currentRoom = useSelector((state) => state.chat.currentRoom);
    const messages = useSelector((state) => state.chat.messages[currentRoom]);

    console.log('messages', messages);

    const handleRoom = (value) => {
        if (chatSocket._connectionStarted) {
            chatSocket.invoke('AddToGroup', value, auth.username);
            dispatch(setRoom(value));
        }
    };

    return (
        <Card>
            <CardHeader
                title="Soporte técnico"
                titleTypographyProps={{
                    variant: 'h1',
                }}
                avatar={<SupportAgentIcon />}
            />
            <Divider />
            <Box sx={{ backgroundColor: 'background.paper' }}>
                <Splitter minWidths={[300, 330]} initialSizes={[34, 66]}>
                    <ChatRoom rooms={rooms} setRoom={handleRoom} room={currentRoom} />
                    <Chat chatSocket={chatSocket} messages={messages} room={currentRoom} />
                </Splitter>
            </Box>
        </Card>
    );
};

function ChatRoom({ rooms, setRoom, room }) {
    return (
        <List
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
            }}
        >
            {Object.values(rooms).map((value) => (
                <React.Fragment key={value}>
                    <ListItem onClick={() => setRoom(value)} selected={value === room}>
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
}

export default ChatPage;
