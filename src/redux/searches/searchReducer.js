import * as actions from '../types'

const initialState = {
    loading: false,
    animals: [],
    users: [],
    error: ''
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SEARCH_REQUEST:
            return {
                ...state, loading: true
            }
        case actions.SEARCH_SUCCESS:
            return {
                loading: false,
                animals: action.payload,
                error: ''
            }
        case actions.SEARCH_ERROR:
            return {
                loading: false,
                animals: [],
                error: action.payload
            }
        case actions.SEARCH_USER_REQUEST:
            return {
                ...state, loading: true
            }
        case actions.SEARCH_USER_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case actions.SEARCH_USER_ERROR:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default searchReducer
