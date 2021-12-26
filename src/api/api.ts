import axios from 'axios'

export const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '8a9d7844-8f01-425a-adf0-76c5abdfd30b',
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})

export type DefaultResponseType = {
    data: { id: number }
    resultCode: ResultCodeEnum
    messages: Array<string>
    fieldsErrors: Array<string>
}
export enum ResultCodeEnum {
    success = 0,
    ERROR = 1,
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}








