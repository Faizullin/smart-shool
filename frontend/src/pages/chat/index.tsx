import * as React from 'react';
import Layout from '../../components/layouts/Layout';
import Breadcrumbs from '../../components/Breadcrumbs';
import PrimaryButton from '../../components/form/auth/PrimaryButton';
import ChatForm from '../../components/form/chat/ChatForm';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchChatRoomsMy, fetchNewChatRoom, setCurrentChatRoom } from '../../redux/store/reducers/chatSlice';
import { IChatRoom } from '../../models/IChat';
import { Dialog, Transition } from '@headlessui/react';
import { FormattedMessage } from 'react-intl';
import Icon from '@mdi/react';
import { mdiClose, mdiFilter } from '@mdi/js';

interface IChat {
    id: string
    title: string
}


export interface IChattRoomsListSidebarProps {
    open: any,
    setOpen: any,
    onOpenChat: (event: any, chat?: IChatRoom) => any
    chat_rooms: IChatRoom[]
    current_chat_room: IChatRoom | null
}

const TriggerButton = ({ onClick }: { onClick: (data?: any) => void }) => {
    return (
        <button
            type="button"
            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
            onClick={onClick}
        >
            <span className="sr-only">
                <FormattedMessage
                    id="app.articles.filters.label" />
            </span>
            <Icon path={mdiFilter} className="h-5 w-5" />
        </button>
    );
}

export function ChattRoomsListSidebar({ onOpenChat, chat_rooms, current_chat_room, open, setOpen }: IChattRoomsListSidebarProps) {
    return (
        <>
            <div className='lg:hideen'>
                <Transition.Root show={open} as={React.Fragment}>
                    <Dialog as="div" className="relative z-[9999] md:hidden" onClose={setOpen}>
                        <Transition.Child
                            as={React.Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={React.Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            <div className="p-4">
                                                <PrimaryButton onClick={onOpenChat}>
                                                    <FormattedMessage id='app.chat.new_chat.label' />
                                                </PrimaryButton>
                                            </div>
                                        </h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="sr-only">
                                                <FormattedMessage id="app.close.label" />
                                            </span>
                                            <Icon path={mdiClose}
                                                size={1}
                                                className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="mt-4 border-t border-gray-200">
                                        <div className="px-4">
                                            <div className="relative mt-6 mx-4" onSubmit={onOpenChat}>
                                                {
                                                    chat_rooms.map((chat: IChat,) => (
                                                        <div key={chat.id} className='py-4 px-6 flex items-start space-x-4'>
                                                            <div>
                                                                <h3 className="font-semibold">
                                                                    <a href="#" onClick={(e) => onOpenChat(e, chat)}
                                                                        className={`${current_chat_room?.id === chat.id ? 'text-default-basic' : 'text-green-basic'}`}>
                                                                        {chat.title}
                                                                    </a>
                                                                </h3>
                                                            </div>

                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
            <div className="lg:w-1/3 hidden lg:block h-full">
                <div className={`sidebar ease-out duration-300  translate-x-0 md:transform-none md:transition-none h-full`} >
                    <div className="p-4">
                        <PrimaryButton onClick={onOpenChat}>
                            <FormattedMessage id='app.chat.new_chat.label' />
                        </PrimaryButton>
                    </div>
                    {
                        chat_rooms.map((chat: IChat,) => (
                            <div key={chat.id} className='py-4 px-6 flex items-start space-x-4'>
                                <div>
                                    <h3 className="font-semibold">
                                        <a href="#" onClick={(e) => onOpenChat(e, chat)}
                                            className={`${current_chat_room?.id === chat.id ? 'text-default-basic' : 'text-green-basic'}`}>
                                            {chat.title}
                                        </a>
                                    </h3>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}







export interface IChatIndexProps {
}

export default function ChatIndex(_: IChatIndexProps) {
    const dispatch = useAppDispatch()
    const { current_chat_room, chat_rooms } = useAppSelector(state => state.chat)
    const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState<boolean>(false)

    const handleOpenChat = (event: any, chat?: IChat) => {
        event.preventDefault()
        if (chat !== undefined) {
            dispatch(setCurrentChatRoom(chat))
        } else {
            dispatch(fetchNewChatRoom()).then(_ => {
                dispatch(fetchChatRoomsMy())
            })
        }
    }

    React.useEffect(() => {
        dispatch(fetchChatRoomsMy()).then(response => {
            if (response.type === fetchChatRoomsMy.fulfilled.toString()) {
                const arr = response.payload as IChatRoom[]
                if (arr.length > 0) {
                    dispatch(setCurrentChatRoom(arr[0]))
                }
            }
        })
    }, [])

    return (
        <Layout>
            <Breadcrumbs />
            <div className='flex-1'>
                <section id="chat" className="chat">
                    <div className="container mx-auto sm:px-4" data-aos="fade-up">
                        <div className="flex mt-8">
                            <div className="w-full lg:w-2/3 p-0 lg:pr-4">
                                <div className="w-full shadow-md sm:rounded-lg">
                                    <TriggerButton onClick={(_) => setMobileSidebarOpen(open => !open)} />
                                    <div className='lg:py-3'></div>
                                    <ChatForm chat_room={current_chat_room} />
                                </div>
                            </div>
                            <ChattRoomsListSidebar
                                open={mobileSidebarOpen} setOpen={setMobileSidebarOpen}
                                onOpenChat={handleOpenChat} chat_rooms={chat_rooms} current_chat_room={current_chat_room} />
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}