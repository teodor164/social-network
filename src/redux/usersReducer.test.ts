import usersReducer, {actions, InitialStateType} from "./usersReducer";

let state: InitialStateType

beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: 'Maxim 0', status: 'Some status', followed: false,
                photos: {
                    large: '',
                    small: ' '
                }
            },
            {
                id: 1, name: 'Maxim 1', status: 'Some status', followed: false,
                photos: {
                    large: '',
                    small: ' '
                }
            },
            {
                id: 2, name: 'Maxim 2', status: 'Some status', followed: true,
                photos: {
                    large: '',
                    small: ' '
                }
            },
            {
                id: 3, name: 'Maxim 3', status: 'Some status', followed: true,
                photos: {
                    large: '',
                    small: ' '
                }
            },
        ],
        pageSize: 13,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [], //array of usersId
        portionSize: 10,
    }
})

test('follow success', () => {
    const newState = usersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(2))
    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeTruthy()
})