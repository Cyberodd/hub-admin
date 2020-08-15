import * as actions from '../types'

export const fetchTransactionRequest = bool => {
    return {
        type: actions.FETCH_TRANSACTION_REQUEST,
        payload: bool
    }
}

export const fetchTransactionSuccess = transactions => {
    return {
        type: actions.FETCH_TRANSACTION_SUCCESS,
        payload: transactions
    }
}

export const fetchTransactionError = error => {
    return {
        type: actions.FETCH_TRANSACTION_ERROR,
        payload: error
    }
}
