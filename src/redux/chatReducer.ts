import {DefaultThunkType, InferActionTypes} from "./reduxStore";
import {chatAPI, MessageChatAPIType, StatusType} from "../api/chatAPI";
import {Dispatch} from "redux";
import {v1} from 'uuid'

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "socialNetwork/app/MESSAGE_RECEIVED":
            return {...state,
            messages: [...state.messages, ...action.payload.message
                .map(m => ({...m, id: v1()}))]
                .filter((m, index, array) => index >= array.length - 100)
            }
        case "socialNetwork/app/STATUS_CHANGED":
            return {...state,
               status: action.payload.status
            }
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (message: MessageChatAPIType[]) => ({
        type: 'socialNetwork/app/MESSAGE_RECEIVED', payload: {message}
    } as const),
    statusChanged: (status: StatusType) => ({
        type: "socialNetwork/app/STATUS_CHANGED", payload: {status}
    } as const)
}

let _newMessageHandler: ((messages: MessageChatAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}


let _statusChangedHandler: ((messages: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messagesReceived',newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('statusChanged',statusChangedHandlerCreator(dispatch))

}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messagesReceived',newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('statusChanged',statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendChatMessage = (message: string): ThunkType => async () => {
    chatAPI.sendChatMessage(message)
}

export default chatReducer

type ChatMessageType = MessageChatAPIType & {id: string}
export type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = DefaultThunkType<ActionsType>