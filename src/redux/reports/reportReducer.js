import * as actions from '../types'

const initialState = {
    loading: false,
    reports: [],
    error: ''
}

const reportReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_REPORTS_REQUEST:
            return {
                ...state, loading: true
            }
        case actions.FETCH_REPORTS_SUCCESS:
            return {
                loading: false,
                reports: action.payload,
                error: ''
            }
        case actions.FETCH_REPORTS_ERROR:
            return {
                loading: false,
                reports: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default reportReducer
