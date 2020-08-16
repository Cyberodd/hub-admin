import * as actions from '../types'

const initialState = {
    loading: false,
    sales: [],
    errors: {}
}

const salesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_TRANSACTIONS_REQUEST:
            return {
                ...state, loading: true
            }
        case actions.FETCH_TRANSACTIONS_SUCCESS:
            return {
                loading: false,
                sales: action.payload,
                errors: {}
            }
        case actions.FETCH_TRANSACTIONS_ERROR:
            return {
                loading: false,
                sales: [],
                errors: action.payload
            }
        default:
            return state
    }
}

export default salesReducer
