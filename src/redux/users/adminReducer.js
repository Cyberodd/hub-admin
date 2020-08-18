import * as actions from '../types'

const initialState = {
    loading: false,
    aLoading: false,
    admins: [],
    error: '',
    errors: {}
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
        case actions.ADD_ADMIN_REQUEST:
            return {
                ...state, aLoading: true
            }
        case actions.ADD_ADMIN_SUCCESS:
            return {
                ...state, admins: [...state.admins, action.payload], aLoading: false, errors: {}
            }
        case actions.ADD_ADMIN_ERROR:
            return {
                ...state, errors: action.payload, aLoading: false
            }
        case actions.DELETE_ADMIN:
            return {
                ...state, admins: state.admins.filter(admin => admin['userId'] !== action.payload)
            }
        case actions.CLEAR_ERRORS:
            return {
                ...state, errors: {}
            }
        case actions.UPDATE_ADMIN_REQUEST:
            return {
                ...state, aLoading: true
            }
        case actions.UPDATE_ADMIN_SUCCESS:
            return {
                ...state, admins: state.admins.map(admin => admin['userId'] === action.payload['userId'] ? {
                    ...admin, role: action.payload.role} : admin), aLoading: false
            }
        case actions.UPDATE_ADMIN_ERROR:
            return {
                ...state, error: action.payload, aLoading: false
            }
        default : return state
    }
}

export default adminReducer
