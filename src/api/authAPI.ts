import {DefaultResponseType, instance, ResultCodeEnum, ResultCodeForCaptcha} from "./api";


type authResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: { id: number }
    resultCode: ResultCodeEnum | ResultCodeForCaptcha
    messages: Array<string>
}

export const authAPI = {
    auth() {
        return instance.get<authResponseType>(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha,
        }).then(response => response.data)
    },
    logout() {
        return instance.delete<DefaultResponseType>(`auth/login`)
    },
}