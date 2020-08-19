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

export const fetchAnimal = animalId => {
    return {
        type: actions.FETCH_ANIMAL,
        payload: animalId
    }
}
