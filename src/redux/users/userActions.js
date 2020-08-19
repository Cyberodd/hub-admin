import * as actions from '../types'

export const fetchUsersRequest = bool => {
    return {
        type: actions.FETCH_USERS_REQUEST,
        payload: bool
    }
}

export const fetchUsersSuccess = users => {
    return {
        type: actions.FETCH_USERS_SUCCESS,
        payload: users
    }
}

export const fetchUsersError = error => {
    return {
        type: actions.FETCH_USERS_ERROR,
        payload: error
    }
}

export const fetchOwner = userId => {
    return {
        type: actions.FETCH_OWNER,
        payload: userId
    }
}
