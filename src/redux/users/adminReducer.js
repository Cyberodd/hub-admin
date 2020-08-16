import * as actions from '../types'

const initialState = {
    loading: false,
    admins: [],
    error: ''
}

const adminReducer = (state = initialState, action) => {
    switch (action.type){
        case actions.FETCH_ADMINS_REQUEST:
            return {
                ...state, loading: true
            }
        case actions.FETCH_ADMINS_SUCCESS:
            return {
                loading: false,
                admins: action.payload,
                error: ''
            }
        case actions.FETCH_ADMINS_ERROR:
            return {
                loading: false,
                admins: [],
                error: action.payload
            }
        default : return state
    }
}

export default adminReducer
