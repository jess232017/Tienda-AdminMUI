import { createSlice } from '@reduxjs/toolkit';

const initialChat = {
    rooms: [],
    currentRoom: '',
    messages: {},
};

/* Creating a slice of the Redux store. */
export const socketSlice = createSlice({
    name: 'chat',
    initialState: initialChat,
    reducers: {
        addRooms: (state, action) => {
            state.rooms = action.payload;
        },
        setRoom: (state, action) => {
            state.currentRoom = action.payload;
        },
        addMessage: (state, action) => {
            const { room, message } = action.payload;
            state.messages[room] = state.messages[room] ? [...state.messages[room], message] : [message];
        },
        nukeMessage: (state) => {
            state.messages = {};
        },
    },
});

// Action creators are generated for each case reducer function
export const { addRooms, setRoom, addMessage, nukeMessage } = socketSlice.actions;

export default socketSlice.reducer;
