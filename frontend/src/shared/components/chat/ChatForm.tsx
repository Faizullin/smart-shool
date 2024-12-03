import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import {useAppDispatch, useAppSelector} from "../../../core/hooks/redux";
import {IChatMessage, IChatRoom} from "../../../core/models/IChat";
import {ILangOption, TLang} from "../../../lang/LangConfig";
import {
    addMessagesData,
    fetchChatMessages, fetchChatRoomsMy,
    fetchChatUsers,
    fetchSendMessage
} from "../../../core/redux/store/reducers/chatSlice";
import {Alert, Button, Form, InputGroup, ListGroup} from "react-bootstrap";
import AuthStorageService from "../../../core/services/AuthStorageService";
import TitleHelment from "../title/TitleHelmet";

const default_uri = (window as any).BASE_API_URL
let TAPI_URL = ''
if (default_uri !== undefined) {
    TAPI_URL = default_uri + '/ws'
} else if (import.meta.env.VITE_APP_WS_BASE_URL !== undefined && import.meta.env.VITE_APP_WS_BASE_URL !== null) {
    TAPI_URL = import.meta.env.VITE_APP_WS_BASE_URL + '/ws'
} else {
    TAPI_URL = '/ws'
}

const languageOptions: ILangOption[] = [
    {code: 'en', name: 'English'},
    {code: 'ru', name: 'Russian'},
    {code: 'kk', name: 'Kazakh'},
];

type ConnectionType = 'ws' | 'api'
const UPDATE_INTERVAL = 12000

export interface IChatFormProps {
    chat_room: IChatRoom | null
}

export default function ChatForm({chat_room}: IChatFormProps) {
    const dispatch = useAppDispatch()
    const [intervalId, setIntervalId] = React.useState<any>();
    const lastMessageId = React.useRef<string>('-1');
    const connection_type = React.useRef<ConnectionType>('ws')
    const {messages, chat_users_n} = useAppSelector(state => state.chat)
    const {user} = useAppSelector(state => state.auth)
    const [messageBody, setMessageBody] = React.useState<string>('')
    const [isConnectionOpen, setIsConnectionOpen] = React.useState<boolean>(false)
    const [selectedLanguage, setSelectedLanguage] = React.useState<TLang>('en');
    const ws = React.useRef<WebSocket | null>(null);
    const messageContainerRef = React.useRef<HTMLDivElement>(null);

    const sendMessage = () => {
        if (!messageBody || !selectedLanguage || !chat_room) {
            return;
        }
        if (connection_type.current === 'api') {
            dispatch(fetchSendMessage({
                chat_room_id: chat_room.id,
                data: {
                    message: messageBody,
                    lang: selectedLanguage,
                }
            }))
        } else {
            if (ws.current) {
                ws.current.send(
                    JSON.stringify({
                        message: messageBody,
                        lang: selectedLanguage,
                    })
                );
                setMessageBody("");
            }
        }
    };
    const reconnect = (chat_room_id: string) => {
        if (!isConnectionOpen && chat_room_id) {
            const token = AuthStorageService.getCurrentAccessToken();
            ws.current = new WebSocket(`${TAPI_URL}/chat/${chat_room_id}/?token=${token}`);

            ws.current.onopen = () => {
                console.log("Connection opened");
                setIsConnectionOpen(true);
            };

            ws.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                const new_msg: IChatMessage = {
                    ...data['message']
                }
                dispatch(addMessagesData(new_msg))
            };

            ws.current.onclose = () => {
                handleStopConnection()
            }
        }
    }
    const handleNewMessageChange = (event: any) => {
        setMessageBody(event.target.value);
    };
    const handleLanguageSelect = (langCode: TLang) => {
        setSelectedLanguage(langCode);
    };
    const handleSubmit = (event: any) => {
        event.preventDefault()
        sendMessage();
        setMessageBody("");
    }
    const handleReconnect = (event: any) => {
        event.preventDefault()
        if (chat_room && connection_type.current === 'ws') {
            reconnect(chat_room.id)
        }
    }
    const handleStopConnection = () => {
        ws.current?.close()
        setIsConnectionOpen(false)
        console.log("Connection close");
    }
    const fetchChatMessagesFromApi = (chat_room: IChatRoom) => {
        const data_params: { chat_room_id: string, params?: any } = {chat_room_id: chat_room.id}
        if (lastMessageId.current) {
            data_params.params = {
                last_message_id: lastMessageId.current
            }
        }
        return dispatch(fetchChatMessages(data_params))
    }
    React.useEffect(() => {
        if (chat_room) {
            if (connection_type.current === 'api') {
                dispatch(fetchChatUsers(chat_room.id)).then(response1 => {
                    if (response1.type === fetchChatUsers.fulfilled.toString()) {
                        dispatch(fetchChatMessages({chat_room_id: chat_room.id})).then(_ => {
                            setIsConnectionOpen(true)
                            const newIntervalId = setInterval(() => {
                                fetchChatMessagesFromApi(chat_room).then(response => {
                                    if (response.payload && response.payload instanceof Array && response.payload.length > 0) {
                                        const cs = response.payload.map(el => el.msg)
                                        cs.forEach((el: string) => {
                                            if (el.startsWith('/redirect')) {
                                                dispatch(fetchChatRoomsMy())
                                            }
                                        })
                                    }
                                })
                            }, UPDATE_INTERVAL)
                            setIntervalId(newIntervalId)
                        })

                    }
                });
            } else {
                if (isConnectionOpen || ws.current) {
                    handleStopConnection()
                }
                dispatch(fetchChatUsers(chat_room.id)).then(response1 => {
                    if (response1.type == fetchChatUsers.fulfilled.toString()) {
                        dispatch(fetchChatMessages({chat_room_id: chat_room.id})).then(response2 => {
                            if (response2.type === fetchChatMessages.fulfilled.toString()) {
                                reconnect(chat_room.id)
                            }
                        })
                    }
                })
                return () => {
                    if (ws.current !== null) {
                        ws.current.close();
                    }

                };
            }
        }
    }, [chat_room]);
    React.useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
        if (messages.length > 0) {
            lastMessageId.current = messages[messages.length - 1].id
        }
    }, [messages]);
    React.useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
    }, [intervalId])

    return (
        <div className="chat-room-container p-3 border rounded">
            <TitleHelment title={"Chat"} />
            {chat_room ? (
                <>
                    <h5 className="mb-3">
                        <FormattedMessage id="app.chat.room.label" defaultMessage="Room:"/> {chat_room.title}
                    </h5>
                    <div
                        ref={messageContainerRef}
                        className="messages-container border rounded p-3 mb-3"
                        style={{maxHeight: '300px', overflowY: 'auto'}}
                    >
                        <ListGroup>
                            {messages.map((message) => {
                                const isActive = message.owner === user.id;
                                return (
                                    <ListGroup.Item
                                        key={message.id}
                                        className={`d-flex ${isActive ? 'justify-content-end' : 'justify-content-start'} mb-2`}
                                    >
                                        <div
                                            className={`p-2 rounded ${isActive ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                                            style={{maxWidth: '75%'}}
                                        >
                                            <strong>{chat_users_n.byId[message.owner]?.username}</strong>
                                            <p className="mb-0">{message.msg}</p>
                                        </div>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    </div>

                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage();
                    }}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                type="text"
                                value={messageBody}
                                onChange={(e) => setMessageBody(e.target.value)}
                                placeholder="Type your message..."
                            />
                            <Button variant={isConnectionOpen ? 'success' : 'secondary'} type="submit">
                                {isConnectionOpen ? (
                                    <FormattedMessage id="app.send.label" defaultMessage="Send"/>
                                ) : (
                                    <FormattedMessage id="app.reconnect.label" defaultMessage="Reconnect"/>
                                )}
                            </Button>
                        </InputGroup>
                    </Form>

                    <div className="language-options mt-3">
                        {languageOptions.map((lang) => (
                            <Button
                                key={lang.code}
                                variant={selectedLanguage === lang.code ? 'success' : 'secondary'}
                                onClick={() => setSelectedLanguage(lang.code)}
                                className="me-2"
                            >
                                {lang.name}
                            </Button>
                        ))}
                    </div>
                </>
            ) : (
                <Alert variant="info">
                    <FormattedMessage id="app.empty.label" defaultMessage="No chat room selected"/>
                </Alert>
            )}
        </div>
    );
}
