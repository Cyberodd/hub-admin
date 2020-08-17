import axios from 'axios'

import {signInError, signInRequest, signInSuccess, signOut} from "../redux/auth/authActions"
import {fetchUsersError, fetchUsersRequest, fetchUsersSuccess} from '../redux/users/userActions'
import {CLEAR_ERRORS} from "../redux/types"
import {
    fetchTransactionError, fetchTransactionRequest, fetchTransactionSuccess
} from "../redux/sales/salesActions"
import {fetchAnimalsError, fetchAnimalsRequest, fetchAnimalsSuccess} from "../redux/animals/animalActions"
import {
    addCategoryError,
    addCategoryRequest, addCategorySuccess,
    fetchCategoriesError,
    fetchCategoriesRequest,
    fetchCategoriesSuccess
} from "../redux/categories/categoryActions"
import {fetchAdminsError, fetchAdminsRequest, fetchAdminsSuccess} from "../redux/users/adminActions"

export const signIn = (user, history) => {
    return (dispatch) => {
        dispatch(signInRequest(true))
        axios.post('/login', user).then(res => {
            setAuthorizationHeader(res.data.token)
            dispatch(signInSuccess(res.data))
            history.push('/dashboard')
        }).catch(e => {
            dispatch(signInError(e.response.data))
        })
    }
}

export const signOutUser = () => {
    return (dispatch) => {
        localStorage.removeItem('dairy')
        delete axios.defaults.headers.common['Authorization']
        dispatch(signOut())
    }
}

export const fetchCategories = () => {
    return (dispatch) => {
        dispatch(fetchCategoriesRequest(true))
        axios.get('/categories').then(res => {
            dispatch(fetchCategoriesSuccess(res.data))
        }).catch(e => {
            console.log(e.response)
            dispatch(fetchCategoriesError(e.response.data))
        })
    }
}

export const fetchTransactions = () => {
    return (dispatch) => {
        dispatch(fetchTransactionRequest(true))
        axios.get('/transactions').then(res => {
            dispatch(fetchTransactionSuccess(res.data))
        }).catch(e => {
            dispatch(fetchTransactionError(e.message))
        })
    }
}

export const fetchAnimals = () => {
    return (dispatch) => {
        dispatch(fetchAnimalsRequest(true))
        axios.get('/animals').then(res => {
            dispatch(fetchAnimalsSuccess(res.data))
        }).catch(e => {
            dispatch(fetchAnimalsError(e.message))
        })
    }
}

export const fetchAdmins = () => {
    return (dispatch) => {
        dispatch(fetchAdminsRequest(true))
        axios.get('/users/admins').then(res => {
            dispatch(fetchAdminsSuccess(res.data))
        }).catch(e => {
            dispatch(fetchAdminsError(e.message))
        })
    }
}

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchUsersRequest(true))
        axios.get('/users').then(res => {
            dispatch(fetchUsersSuccess(res.data))
        }).catch(e => {
            dispatch(fetchUsersError(e.message))
        })
    }
}

export const addCategory = category => {
    return (dispatch) => {
        dispatch(addCategoryRequest(true))
        axios.post('/categories', category).then(res => {
            dispatch(addCategorySuccess(res.data))
        }).catch(e => {
            dispatch(addCategoryError(e.response.data))
        })
    }
}

export const clearErrors = () => {
    return dispatch => {
        dispatch({type: CLEAR_ERRORS})
    }
}

const setAuthorizationHeader = token => {
    const mToken = `Bearer ${token}`
    localStorage.setItem('dairy', mToken)
    axios.defaults.headers.common['Authorization'] = mToken
}
