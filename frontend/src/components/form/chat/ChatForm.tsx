import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addMessagesData, fetchChatMessages, fetchChatRoomsMy, fetchChatUsers, fetchSendMessage } from '../../../redux/store/reducers/chatSlice';
import { IChatMessage, IChatRoom } from '../../../models/IChat';
import { FormattedMessage } from 'react-intl';
import { ILangOption, Lang } from '../../../lang/LangConfig';

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
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Russian' },
    { code: 'kk', name: 'Kazakh' },
];

type ConnectionType = 'ws' | 'api'
const UPDATE_INTERVAL = 12000

export interface IChatFormProps {
    chat_room: IChatRoom | null
}

export default function ChatForm({ chat_room }: IChatFormProps) {
    const dispatch = useAppDispatch()
    const [intervalId, setIntervalId] = React.useState<number | null>(null);
    const lastMessageId = React.useRef<string>('-1');
    const connection_type = React.useRef<ConnectionType>('api')
    const { messages, chat_users_n } = useAppSelector(state => state.chat)
    const { user } = useAppSelector(state => state.auth)
    const [messageBody, setMessageBody] = React.useState<string>('')
    const [isConnectionOpen, setIsConnectionOpen] = React.useState<boolean>(false)
    const [selectedLanguage, setSelectedLanguage] = React.useState<Lang>('en');
    const { token } = useAppSelector(state => state.auth)
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
            ws.current = new WebSocket(`${TAPI_URL}/chat/${chat_room_id}/?token=${token}`);

            ws.current.onopen = () => {
                console.log("Connection opened");
                setIsConnectionOpen(true);
            };

            ws.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log("OnMessage", data)
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
    const handleLanguageSelect = (langCode: Lang) => {
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
        const data_params: { chat_room_id: string, params?: any } = { chat_room_id: chat_room.id }
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
                        dispatch(fetchChatMessages({ chat_room_id: chat_room.id })).then(_ => {
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
                        dispatch(fetchChatMessages({ chat_room_id: chat_room.id })).then(response2 => {
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
        <div className="chat-room-container px-4">
            {
                chat_room ? (
                    <>
                        <label htmlFor="chat-m-input">
                            <h1 className="room-name">Room: {chat_room.title}</h1>
                        </label>


                        <div ref={messageContainerRef}
                            className="messages-container max-h-[300px] overflow-y-auto">
                            <ol className="messages-list">
                                {
                                    messages.length > 0 ?
                                        messages.map((message, _) => {
                                            const active = message.owner === user.id
                                            return (
                                                <li
                                                    key={message.id}
                                                    className={`message-item flex ${active ? 'justify-end' : 'justify-start'
                                                        }`}
                                                >
                                                    <div
                                                        className={`${active
                                                            ? 'bg-teal-500 text-white'
                                                            : 'bg-teal-100 text-teal-800'
                                                            } p-2 rounded-lg mb-2 max-w-md`}
                                                    >
                                                        <p className='mb-2 font-semibold'>{chat_users_n.byId[`${message.owner}`]?.username}</p>
                                                        <p>{message.msg}</p>
                                                    </div>
                                                </li>
                                            )
                                        }) : (
                                            <div></div>
                                        )
                                }
                            </ol>
                        </div>

                        <form onSubmit={handleSubmit} className="flex my-4">
                            <input
                                id='chat-m-input'
                                type="text"
                                value={messageBody}
                                onChange={handleNewMessageChange}
                                className="flex-1 rounded-l-lg p-4 focus:outline-none focus:ring focus:border-teal-500"
                                placeholder="Type your message..."
                            />
                            {
                                isConnectionOpen ? (
                                    <button
                                        type="submit"
                                        className="px-4 bg-green-basic text-white font-semibold rounded-r-lg"
                                    >
                                        <FormattedMessage id='app.send.label' />
                                    </button>
                                ) : (
                                    <button
                                        type="button" onClick={handleReconnect}
                                        className="px-4 bg-default-basic text-white font-semibold rounded-r-lg"
                                    >
                                        Reconnect
                                    </button>
                                )
                            }

                        </form>
                        <div className="language-options pb-4">
                            {languageOptions.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageSelect(lang.code)}
                                    className={`px-2 py-1 mr-2 ${selectedLanguage === lang.code ? 'bg-green-basic' : 'bg-default-basic'
                                        } text-white rounded-lg`}
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className='p-4'>
                        <p className=''>
                            <FormattedMessage id='app.empty.label' />
                        </p>
                    </div>
                )
            }

        </div>
    );
}
