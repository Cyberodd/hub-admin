import * as actions from '../types'

const initialState = {
    loading: false,
    categories: [],
    error: ''
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_CATEGORIES_REQUEST:
            return {
                ...state, loading: true
            }
        case actions.FETCH_CATEGORIES_SUCCESS:
            return {
                loading: false,
                categories: action.payload,
                error: ''
            }
        case actions.FETCH_CATEGORIES_ERROR:
            return {
                loading: false,
                categories: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default categoryReducer
