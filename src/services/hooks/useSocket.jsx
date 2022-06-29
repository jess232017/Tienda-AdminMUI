import React, { useEffect, useRef, useState } from 'react';

import { useAuthUser } from 'react-auth-kit';
import { HubConnectionBuilder } from '@microsoft/signalr';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { addRooms, addMessage, nukeMessage } from '@/store/features/chatSlice';

const baseURL = import.meta.env.VITE_API_URL;

const useSocket = () => {
    const auth = useAuthUser()();
    const [chatSocket, setChatSocket] = useState(null);
    const [dashSocket, setDashSocket] = useState(null);

    //redux
    const dispatch = useDispatch();
    const currentRoom = useSelector((state) => state.chat.currentRoom);

    useEffect(() => {
        const chatConnection = new HubConnectionBuilder()
            .withUrl(baseURL + '/hubs/chat')
            .withAutomaticReconnect()
            .build();

        const dashConnection = new HubConnectionBuilder()
            .withUrl(baseURL + '/hubs/dash')
            .withAutomaticReconnect()
            .build();

        setDashSocket(dashConnection);
        setChatSocket(chatConnection);
    }, []);

    useEffect(() => {
        if (chatSocket) {
            chatSocket
                .start()
                .then(() => {
                    chatSocket.invoke('NewGroup', auth.username);
                    chatSocket.invoke('AddToGroup', auth.username);

                    chatSocket.on('AvailableGroups', (rooms) => {
                        dispatch(addRooms(rooms));
                    });

                    chatSocket.on('ReceiveMessage', (message) => {
                        dispatch(addMessage({ room: message.room, message }));
                    });
                })
                .catch((e) => console.log('Connection failed: ', e));
        }
    }, [chatSocket]);

    useEffect(() => {
        if (currentRoom !== '' && chatSocket) {
            if (chatSocket._connectionStarted) {
                chatSocket.invoke('AddToGroup', currentRoom);
            }
        }
    }, [currentRoom, chatSocket]);

    return { chatSocket, dashSocket };
};

export default useSocket;
