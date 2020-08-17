import * as actions from '../types'

const initialState = {
    loading: false,
    catLoading: false,
    categories: [],
    error: '',
    errors: {}
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
        case actions.ADD_CATEGORY_REQUEST:
            return {
                ...state, catLoading: true
            }
        case actions.ADD_CATEGORY_SUCCESS:
            return {
                ...state, categories: [...state.categories, action.payload], catLoading: false, errors: {}
            }
        case actions.ADD_CATEGORY_ERROR:
            return {
                ...state, errors: action.payload, catLoading: false
            }
        default:
            return state
    }
}

export default categoryReducer
