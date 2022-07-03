import React, { useEffect, useRef, useState } from 'react';

import { useQueryClient } from 'react-query';

import { useAuthUser } from 'react-auth-kit';
import { HubConnectionBuilder } from '@microsoft/signalr';

//redux
import { Store } from 'react-notifications-component';
import { useSelector, useDispatch } from 'react-redux';
import { addRooms, addMessage, setRoom } from '@/store/features/chatSlice';

const baseURL = import.meta.env.VITE_API_URL;

const useSocket = () => {
    const auth = useAuthUser()();
    const queryClient = useQueryClient();
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

        chatConnection
            .start()
            .then(() => setDashSocket(dashConnection))
            .catch((err) => console.error(err));

        const dashConnection = new HubConnectionBuilder()
            .withUrl(baseURL + '/hubs/dash')
            .withAutomaticReconnect()
            .build();

        dashConnection
            .start()
            .then(() => setChatSocket(chatConnection))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (chatSocket?._connectionStarted) {
            chatSocket.invoke('NewGroup', auth.username);

            //set user room as default
            dispatch(setRoom(auth.username));
            chatSocket.invoke('AddToGroup', auth.username, auth.username);

            chatSocket.on('AvailableGroups', (rooms) => {
                dispatch(addRooms(rooms));
            });

            chatSocket.on('ShowWho', (message) => {
                Store.addNotification({
                    message: message,
                    type: 'default', // 'default', 'success', 'info', 'warning'
                    container: 'bottom-right', // where to position the notifications
                    animationIn: ['animated', 'fadeIn'], // animate.css classes that's applied
                    animationOut: ['animated', 'fadeOut'], // animate.css classes that's applied
                    dismiss: {
                        duration: 2000,
                    },
                });
            });

            chatSocket.on('ReceiveMessage', (message) => {
                dispatch(addMessage({ room: message.room, message }));
            });
        }
    }, [chatSocket]);

    useEffect(() => {
        if (dashSocket?._connectionStarted) {
            dashSocket.invoke('GetExchangeRate');

            dashSocket.on('ReceiveRate', (data) => {
                console.log('ReceiveRate', data);
                Store.addNotification({
                    title: 'Actualización',
                    message: 'Un dolar equivale a: ' + data,
                    type: 'default', // 'default', 'success', 'info', 'warning'
                    container: 'top-full', // where to position the notifications
                    animationIn: ['animated', 'animate__flash'], // animate.css classes that's applied
                    animationOut: ['animated', 'fadeOut'], // animate.css classes that's applied
                    dismiss: {
                        duration: 2000,
                    },
                });
            });

            dashSocket.on('InvalidateData', (data) => {
                queryClient.invalidateQueries(data);
            });
        }
    }, [dashSocket]);

    /*useEffect(() => {
        if (currentRoom !== '' && chatSocket) {
            if (chatSocket._connectionStarted) {
                chatSocket.invoke('AddToGroup', currentRoom, auth.username);
            }
        }
    }, [currentRoom, chatSocket]);*/

    return { chatSocket, dashSocket };
};

export default useSocket;
