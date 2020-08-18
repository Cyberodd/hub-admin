import * as actions from '../types'

export const fetchAnimalsRequest = bool => {
    return {
        type: actions.FETCH_ANIMALS_REQUEST,
        payload: bool
    }
}

export const fetchAnimalsSuccess = animals => {
    return {
        type: actions.FETCH_ANIMALS_SUCCESS,
        payload: animals
    }
}

export const fetchAnimalsError = error => {
    return {
        type: actions.FETCH_ANIMALS_ERROR,
        payload: error
    }
}

export const searchRequest = bool => {
    return {
        type: actions.SEARCH_REQUEST,
        payload: bool
    }
}

export const searchSuccess = animals => {
    return {
        type: actions.SEARCH_SUCCESS,
        payload: animals
    }
}

export const searchError = error => {
    return {
        type: actions.SEARCH_ERROR,
        payload: error
    }
}
