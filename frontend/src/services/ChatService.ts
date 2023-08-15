import $api from "../http";
import { AxiosResponse } from 'axios'
import { IChatMessage, IChatRoom, IChatUser } from "../models/IChat";

export default class ChatService {
    static async fetchChatMessages(chat_id: string, params?: any): Promise<AxiosResponse<IChatMessage[]>> {
        return $api.get<IChatMessage[]>(`/chat/${chat_id}/messages/`, {
            params,
        })
    }
    static async fetchChatUsers(chat_id: string): Promise<AxiosResponse<IChatUser[]>> {
        return $api.get<IChatUser[]>(`/chat/${chat_id}/users/`)
    }
    static async fetchNewChatRoom(): Promise<AxiosResponse<IChatRoom>> {
        return $api.post<IChatRoom>(`/chat/new/`)
    }
    static async fetchChatRoomsMy(): Promise<AxiosResponse<IChatRoom[]>> {
        return $api.get<IChatRoom[]>(`/chat/my/`)
    }
    static async fetchSendMessage(chat_id: string, data: any): Promise<AxiosResponse<IChatMessage>> {
        return $api.post<IChatMessage>(`/chat/${chat_id}/messages/new/`, {...data})
    }
}