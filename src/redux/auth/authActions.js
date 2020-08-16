import * as actions from '../types'

export const signInRequest = bool => {
    return {
        type: actions.SIGN_IN_REQUEST,
        payload: bool
    }
}

export const signInSuccess = user => {
    return {
        type: actions.SIGN_IN_SUCCESS,
        payload: user
    }
}

export const signInError = error => {
    return {
        type: actions.SIGN_IN_ERROR,
        payload: error
    }
}

export const signOut = () => {
    return {
        type: actions.SIGN_OUT_SUCCESS,
    }
}
