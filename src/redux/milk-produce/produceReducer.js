import * as actions from '../types'

const initialState = {
    loading: false,
    produce: [],
    error: ''
}

const produceReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_PRODUCE_REQUEST:
            return {
                ...state, loading: true
            }
        case actions.FETCH_PRODUCE_SUCCESS:
            return {
                loading: false,
                produce: action.payload,
                error: ''
            }
        case actions.FETCH_PRODUCE_ERROR:
            return {
                loading: false,
                produce: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default produceReducer
