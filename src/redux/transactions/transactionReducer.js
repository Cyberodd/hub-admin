import * as actions from '../types'

const initialState = {
    loading: false,
    transactions: [],
    errors: {}
}

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_TRANSACTION_REQUEST:
            return {
                ...state, loading: true
            }
        case actions.FETCH_TRANSACTION_SUCCESS:
            return {
                loading: false,
                transactions: action.payload,
                errors: {}
            }
        case actions.FETCH_TRANSACTION_ERROR:
            return {
                loading: false,
                transactions: [],
                errors: action.payload
            }
        default:
            return state
    }
}

export default transactionReducer
