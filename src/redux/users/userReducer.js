import * as actions from '../types'

const initialState = {
    loading: false,
    users: [],
    errors: {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_USERS_REQUEST:
            return {
                ...state, loading: true
            }
        default:
            return state
    }
}

export default userReducer
