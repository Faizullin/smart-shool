export interface IChatRoom {
    id: string,
    title: string,
    owner?: any
    // subject: string,
    // image: string,
    // created_at: string,
    // updated_at: string,
}

export interface IChatMessage {
    id: string
    msg: string
    owner: string
    sentByMe: boolean
    action?: 'message' | 'ticket-response' | 'bot-response'
    created_at?: string,
    updated_at?: string,
}

export interface IChatUser {
    id: string
    username: string
    email: string
}