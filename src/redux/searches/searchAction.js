import * as actions from "../types"

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
