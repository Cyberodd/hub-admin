import * as actions from '../types'

const initialState = {
    loading: false,
    animals: [],
    errors: {}
}

const animalReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_ANIMALS_REQUEST:
            return {
                ...state, loading: true
            }
        case actions.FETCH_ANIMALS_SUCCESS:
            return {
                loading: false,
                animals: action.payload,
                errors: {}
            }
        case actions.FETCH_ANIMALS_ERROR:
            return {
                loading: false,
                animals: [],
                errors: action.payload
            }
        default:
            return state
    }
}

export default animalReducer
