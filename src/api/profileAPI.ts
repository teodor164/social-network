import {PhotosType, ProfileType} from "../types/types"
import {CustomType, instance, ResultCodeEnum} from "./api"


type savePhotoType = {
    data: {
        photos: PhotosType
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
    fieldsErrors: Array<string>
}
export const profileAPI = {
    getProfileInfo(userId: number | null) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<CustomType>(`profile/status`, {
            status,
        })
    },
    savePhoto(photoFile: File) {
        let formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<savePhotoType>(`profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        }).then(response => response.data)
    },
    saveData(data: ProfileType) {
        return instance.put<CustomType>(`profile`, data).then(response => response.data)
    },
}