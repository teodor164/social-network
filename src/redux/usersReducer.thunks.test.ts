import {follow} from "./usersReducer";
import {usersAPI} from "../api/usersAPI";
import {DefaultResponseType, ResultCodeEnum} from "../api/api";

jest.mock("../api/usersAPI")

const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: DefaultResponseType = {
    data: {id: 0},
    resultCode: ResultCodeEnum.success,
    fieldsErrors: [],
    messages: []
}

usersAPIMock.follow.mockReturnValue(Promise.resolve(result))

test('follow success thunk', async () => {
    const thunk = follow(1)
    const dispatchMock = jest.fn()
    // @ts-ignore
    await thunk(dispatchMock)
    expect(dispatchMock).toBeCalledTimes(3)
})