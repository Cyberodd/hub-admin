import * as actions from '../types'

export const fetchAdminsRequest = bool => {
    return {
        type: actions.FETCH_ADMINS_REQUEST,
        payload: bool
    }
}

export const fetchAdminsSuccess = admins => {
    return {
        type: actions.FETCH_ADMINS_SUCCESS,
        payload: admins
    }
}

export const fetchAdminsError = error => {
    return {
        type: actions.FETCH_ADMINS_ERROR,
        payload: error
    }
}
