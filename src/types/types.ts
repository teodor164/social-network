export type PostDataType = {
    id: number
    message: string
}
export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}
export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType,
    followed: boolean
}
export type DialogType = {
    id: number
    name: string
    img: string
}
export type MessagesType = {
    id: number
    message: string
}