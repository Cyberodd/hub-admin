import * as actions from '../types'

const initialState = {
    loading: false,
    users: [],
    owner: {},
    error: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_USERS_REQUEST:
            return {
                ...state, loading: true
            }
        case actions.FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case actions.FETCH_USERS_ERROR:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        case actions.FETCH_OWNER:
            return {
                ...state, owner: state.users.filter(user => user['userId'] === action.payload)[0]
            }
        default:
            return state
    }
}

export default userReducer
