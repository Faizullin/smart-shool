import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IChatMessage, IChatRoom, IChatUser } from '../../../models/IChat';
import ChatService from '../../../services/ChatService';


interface IInitialState {
    messages: IChatMessage[]
    current_chat_room: IChatRoom | null
    chat_rooms: IChatRoom[]
    loading: boolean,
    error: string | null,
    errors: any,
    success: boolean,
    chat_users_n: {
        byId: {
            [name: string]: IChatUser
        },
        allIds: string[],
    }
}

const initialState: IInitialState = {
    messages: [],
    chat_rooms: [],
    current_chat_room: null,
    loading: false,
    error: null,
    errors: {},
    success: false,
    chat_users_n: {
        byId: {},
        allIds: [],
    }
}

export const fetchChatMessages = createAsyncThunk(
    'auth/fetchChatMessages',
    async (props: { chat_room_id: string, params?: any, }, { rejectWithValue, dispatch }) => {
        try {
            const response = await ChatService.fetchChatMessages(props.chat_room_id, props.params);
            if (props.params?.last_message_id) {
                dispatch(addMessagesData(response.data))
            } else {
                dispatch(setMessagesData(response.data))
            }
            return response.data
        } catch (error: AxiosError | any) {
            if (error instanceof AxiosError && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error)
        }
    }
);
export const fetchChatUsers = createAsyncThunk(
    'auth/fetchChatUsers',
    async (chat_room_id: string, { rejectWithValue }) => {
        try {
            const response = await ChatService.fetchChatUsers(chat_room_id);
            return response.data
        } catch (error: AxiosError | any) {
            if (error instanceof AxiosError && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error)
        }
    }
);
export const fetchChatRoomsMy = createAsyncThunk(
    'auth/fetchChatRoomsMy',
    async (_, { rejectWithValue }) => {
        try {
            const response = await ChatService.fetchChatRoomsMy();
            return response.data
        } catch (error: AxiosError | any) {
            if (error instanceof AxiosError && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error)
        }
    }
);

export const fetchNewChatRoom = createAsyncThunk(
    'auth/fetchNewChatRoom',
    async (_, { rejectWithValue }) => {
        try {
            const response = await ChatService.fetchNewChatRoom();
            return response.data
        } catch (error: AxiosError | any) {
            if (error instanceof AxiosError && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error)
        }
    }
);

export const fetchSendMessage = createAsyncThunk(
    'auth/fetchSendMessage',
    async (props: { chat_room_id: string, data: any }, { rejectWithValue, dispatch }) => {
        try {
            const response = await ChatService.fetchSendMessage(props.chat_room_id, props.data);
            dispatch(addMessagesData(response.data))
            return response.data
        } catch (error: AxiosError | any) {
            if (error instanceof AxiosError && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error)
        }
    }
);


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessagesData: (state, action) => {
            if (action.payload instanceof Array) {
                if (action.payload.length > 0) {
                    state.messages = [...state.messages, ...action.payload]
                }

            } else {
                state.messages.push(action.payload)
            }

        },
        setMessagesData: (state, action) => {
            state.messages = action.payload;
        },
        clearMessagesData: (state) => {
            state.messages = initialState.messages;
        },
        setCurrentChatRoom: (state, action) => {
            state.current_chat_room = action.payload
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchChatMessages.fulfilled, (state, _) => {
            state.loading = false
            state.errors = initialState.errors
            state.success = true
        })
        builder.addCase(fetchChatMessages.pending, (state, _) => {
            state.loading = true
            state.success = false
        })
        builder.addCase(fetchChatMessages.rejected, (state, { payload }) => {
            state.loading = false
            state.success = false
            state.errors = payload
        })
        builder.addCase(fetchNewChatRoom.fulfilled, (state, { payload }) => {
            state.loading = false
            state.errors = initialState.errors
            state.current_chat_room = payload
            state.success = true
        })
        builder.addCase(fetchNewChatRoom.pending, (state, _) => {
            state.loading = true
            state.success = false
        })
        builder.addCase(fetchNewChatRoom.rejected, (state, { payload }) => {
            state.loading = false
            state.success = false
            state.current_chat_room = initialState.current_chat_room
            state.errors = payload
        })
        builder.addCase(fetchChatRoomsMy.fulfilled, (state, { payload }) => {
            state.loading = false
            state.errors = initialState.errors
            state.chat_rooms = payload
            state.success = true
        })
        builder.addCase(fetchChatRoomsMy.pending, (state, _) => {
            state.loading = true
            state.success = false
        })
        builder.addCase(fetchChatRoomsMy.rejected, (state, { payload }) => {
            state.loading = false
            state.success = false
            state.chat_rooms = initialState.chat_rooms
            state.errors = payload
        })
        builder.addCase(fetchChatUsers.fulfilled, (state, { payload }) => {
            state.loading = false
            state.errors = initialState.errors
            state.success = true

            const arr = payload as IChatUser[]
            if (arr.length > 0) {
                const tmp_allIds: string[] = []
                const tmp_byId: {
                    [name: string]: any
                } = {}
                arr.forEach(chat_user => {
                    tmp_allIds.push(`${chat_user.id}`)
                    tmp_byId[chat_user.id] = chat_user
                })
                state.chat_users_n = {
                    allIds: tmp_allIds,
                    byId: tmp_byId,
                }
            }
        })
        builder.addCase(fetchChatUsers.pending, (state, _) => {
            state.loading = true
            state.success = false
        })
        builder.addCase(fetchChatUsers.rejected, (state, { payload }) => {
            state.loading = false
            state.success = false
            state.errors = payload
            state.chat_users_n = { ...initialState.chat_users_n }
        })
        builder.addCase(fetchSendMessage.fulfilled, (state, _) => {
            state.loading = false
            state.errors = initialState.errors
            state.success = true
        })
        builder.addCase(fetchSendMessage.pending, (state, _) => {
            state.loading = true
            state.success = false
        })
        builder.addCase(fetchSendMessage.rejected, (state, { payload }) => {
            state.loading = false
            state.success = false
            state.errors = payload
        })
    }
});

export const { setMessagesData, clearMessagesData, addMessagesData, setCurrentChatRoom } = chatSlice.actions;

export default chatSlice.reducer;