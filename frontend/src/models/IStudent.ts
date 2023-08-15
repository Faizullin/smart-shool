export interface IStudent {
    id: string,
    first_name: string,
    last_name: string,
    current_status: 'v' | string,
    gender: string,
    current_group: string,
    address: string,
    parent_mobile_number: string,
    created_at?: string,
    updated_at?: string,
    date_of_birth?: string,
    others?: string,

    hasInitial: boolean,
    hasFaceId: boolean,
    expiresAt?: Date,
}

export interface IUpdateStudentProps {
    first_name: string,
    last_name: string,
    date_of_birth: string,
    gender: string,
    address: string,
    parent_mobile_number: string,
    others?: string,
}