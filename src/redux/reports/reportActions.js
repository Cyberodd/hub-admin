import * as actions from '../types'

export const reportRequest = bool => {
    return {
        type: actions.FETCH_REPORTS_REQUEST,
        payload: bool
    }
}

export const reportSuccess = reports => {
    return {
        type: actions.FETCH_REPORTS_SUCCESS,
        payload: reports
    }
}

export const reportError = error => {
    return {
        type: actions.FETCH_REPORTS_ERROR,
        payload: error
    }
}
