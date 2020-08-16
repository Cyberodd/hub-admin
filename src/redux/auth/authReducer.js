import * as actions from '../types'

const initialState = {
    authenticated: false,
    loading: false,
    user: {},
    errors: {},
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SIGN_IN_REQUEST:
            return {
                ...state, loading: true
            }
        case actions.SIGN_IN_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                authenticated: true,
                errors: {}
            }
        case actions.SIGN_IN_ERROR:
            return {
                loading: false,
                user: {},
                errors: action.payload
            }
        case actions.CLEAR_ERRORS:
            return {
                ...state, loading: false, errors: {}
            }
        case actions.SIGN_OUT_SUCCESS:
            return initialState
        default:
            return state
    }
}

export default authReducer
