import * as actions from '../types'

const initialState = {
    loading: false,
    animals: [],
    animal: {},
    error: ''
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
                error: ''
            }
        case actions.FETCH_ANIMALS_ERROR:
            return {
                loading: false,
                animals: [],
                error: action.payload
            }
        case actions.FETCH_ANIMAL:
            return {
                ...state, animal: state.animals.filter(animal => animal['animalId'] === action.payload)[0]
            }
        default:
            return state
    }
}

export default animalReducer
