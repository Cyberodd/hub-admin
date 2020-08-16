import * as actions from '../types'

export const fetchTransactionRequest = bool => {
    return {
        type: actions.FETCH_TRANSACTIONS_REQUEST,
        payload: bool
    }
}

export const fetchTransactionSuccess = transactions => {
    return {
        type: actions.FETCH_TRANSACTIONS_SUCCESS,
        payload: transactions
    }
}

export const fetchTransactionError = error => {
    return {
        type: actions.FETCH_TRANSACTIONS_ERROR,
        payload: error
    }
}
