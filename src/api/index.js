import axios from 'axios'

import {signInError, signInRequest, signInSuccess, signOut} from "../redux/users/userActions"
import {CLEAR_ERRORS} from "../redux/types"
import {
    fetchTransactionError,
    fetchTransactionRequest,
    fetchTransactionSuccess
} from "../redux/transactions/transactionActions"
import {fetchAnimalsError, fetchAnimalsRequest, fetchAnimalsSuccess} from "../redux/animals/animalActions"

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

export const fetchTransactions = () => {
    return (dispatch) => {
        dispatch(fetchTransactionRequest(true))
        axios.get('/transactions').then(res => {
            dispatch(fetchTransactionSuccess(res.data))
        }).catch(e => {
            dispatch(fetchTransactionError(e.response.data))
        })
    }
}

export const fetchAnimals = () => {
    return (dispatch) => {
        dispatch(fetchAnimalsRequest(true))
        axios.get('/animals').then(res => {
            dispatch(fetchAnimalsSuccess(res.data))
        }).catch(e => {
            dispatch(fetchAnimalsError(e.response.data))
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
