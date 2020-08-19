import * as actions from '../types'

export const produceRequest = bool => {
    return {
        type: actions.FETCH_PRODUCE_REQUEST,
        payload: bool
    }
}

export const produceSuccess = produce => {
    return {
        type: actions.FETCH_PRODUCE_SUCCESS,
        payload: produce
    }
}

export const produceError = error => {
    return {
        type: actions.FETCH_PRODUCE_ERROR,
        payload: error
    }
}
