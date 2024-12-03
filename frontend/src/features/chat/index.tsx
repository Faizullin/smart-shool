import React from 'react';
import {useAppDispatch, useAppSelector} from "../../core/hooks/redux";
import {fetchChatRoomsMy, fetchNewChatRoom, setCurrentChatRoom} from "../../core/redux/store/reducers/chatSlice";
import ChatForm from "../../shared/components/chat/ChatForm";
import {FormattedMessage} from 'react-intl';
import {Button, ListGroup, Modal} from 'react-bootstrap';

interface IChat {
    id: string;
    title: string;
}

export interface IChatRoomsListSidebarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onOpenChat: (event: any, chat?: IChat) => any;
    chat_rooms: IChat[];
    current_chat_room: IChat | null;
}

export function ChatRoomsListSidebar({
                                         onOpenChat,
                                         chat_rooms,
                                         current_chat_room,
                                         open,
                                         setOpen
                                     }: IChatRoomsListSidebarProps) {
    return (
        <>
            {/* Mobile Sidebar */}
            <Modal show={open} onHide={() => setOpen(false)} className="d-md-none">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id="app.chat.rooms.label" defaultMessage="Chat Rooms"/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="primary" onClick={(e) => onOpenChat(e)}>
                        <FormattedMessage id="app.chat.new_chat.label" defaultMessage="New Chat"/>
                    </Button>
                    <ListGroup className="mt-3">
                        {chat_rooms.map((chat) => (
                            <ListGroup.Item
                                key={chat.id}
                                action
                                onClick={(e) => onOpenChat(e, chat)}
                                active={current_chat_room?.id === chat.id}
                            >
                                {chat.title}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
            </Modal>

            {/* Desktop Sidebar */}
            <div className="d-none d-md-block col-md-4">
                <div className="sidebar bg-light p-3 rounded shadow-sm">
                    <Button variant="primary" onClick={(e) => onOpenChat(e)} className="mb-3 w-100">
                        <FormattedMessage id="app.chat.new_chat.label" defaultMessage="New Chat"/>
                    </Button>
                    <ListGroup>
                        {chat_rooms.map((chat) => (
                            <ListGroup.Item
                                key={chat.id}
                                action
                                onClick={(e) => onOpenChat(e, chat)}
                                active={current_chat_room?.id === chat.id}
                            >
                                {chat.title}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            </div>
        </>
    );
}

export default function ChatIndex() {
    const dispatch = useAppDispatch();
    const {current_chat_room, chat_rooms, current_chat_id} = useAppSelector(state => state.chat);
    const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

    const handleOpenChat = (event: any, chat?: IChat) => {
        event.preventDefault();
        if (chat) {
            dispatch(setCurrentChatRoom(chat));
        } else {
            dispatch(fetchNewChatRoom()).then(() => {
                dispatch(fetchChatRoomsMy()).then((response) => {
                    if (response.type === fetchChatRoomsMy.fulfilled.toString()) {
                        const arr = response.payload as IChat[];
                        if (arr.length > 0) {
                            dispatch(setCurrentChatRoom(arr[arr.length - 1]));
                        }
                    }
                });
            });
        }
    };

    React.useEffect(() => {
        dispatch(fetchChatRoomsMy()).then((response) => {
            if (response.type === fetchChatRoomsMy.fulfilled.toString()) {
                const arr = response.payload as IChat[];
                if (current_chat_id !== null) {
                    const r_index = arr.findIndex(item => item.id === current_chat_id);
                    if (r_index !== -1) {
                        dispatch(setCurrentChatRoom(arr[r_index]));
                    }
                } else if (current_chat_room === null && arr.length > 0) {
                    dispatch(setCurrentChatRoom(arr[0]));
                }
            }
        });
    }, []);

    return (
        <main>
            <div className="container-fluid mt-4">
                <div className="row">
                    {/* Chat Rooms Sidebar */}
                    <ChatRoomsListSidebar
                        open={mobileSidebarOpen}
                        setOpen={setMobileSidebarOpen}
                        onOpenChat={handleOpenChat}
                        chat_rooms={chat_rooms}
                        current_chat_room={current_chat_room}
                    />

                    {/* Chat Form */}
                    <div className="col-md-8">
                        <ChatForm chat_room={current_chat_room}/>
                    </div>
                </div>
            </div>
        </main>
    );
}
