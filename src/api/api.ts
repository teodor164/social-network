import axios from 'axios'

export const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': 'a3bfbb3f-60e3-435f-a1ea-3cf028794565',
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})

instance.defaults.headers.Authorization = ''



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








