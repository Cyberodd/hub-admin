import axios from 'axios'
import {signInError, signInRequest, signInSuccess, signOut} from "../redux/auth/authActions"
import {fetchOwner, fetchUsersError, fetchUsersRequest, fetchUsersSuccess} from '../redux/users/userActions'
import {CLEAR_ERRORS} from "../redux/types"
import {fetchTransactionError, fetchTransactionRequest, fetchTransactionSuccess} from "../redux/sales/salesActions"
import {fetchAnimal, fetchAnimalsError, fetchAnimalsRequest, fetchAnimalsSuccess} from "../redux/animals/animalActions"
import {
    addCategoryError, addCategoryRequest, addCategorySuccess, deleteCategory, fetchCategoriesError,
    fetchCategoriesRequest, fetchCategoriesSuccess
} from "../redux/categories/categoryActions"
import {
    addAdminError, addAdminRequest, addAdminSuccess, deleteAdmin, fetchAdminsError, fetchAdminsRequest,
    fetchAdminsSuccess, updateAdminError, updateAdminRequest, updateAdminSuccess
} from "../redux/users/adminActions"
import {
    searchError, searchRequest, searchSuccess, searchUserError, searchUserRequest, searchUserSuccess
} from "../redux/searches/searchAction"
import {reportError, reportRequest, reportSuccess} from "../redux/reports/reportActions"
import {produceError, produceRequest, produceSuccess} from "../redux/milk-produce/produceActions"

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

export const fetchTransactions = day => {
    return (dispatch) => {
        dispatch(fetchTransactionRequest(true))
        axios.get(`/transactions/${day}`).then(res => {
            dispatch(fetchTransactionSuccess(res.data))
        }).catch(e => {
            dispatch(fetchTransactionError(e.message))
        })
    }
}

export const searchUsers = name => {
    return (dispatch) => {
        dispatch(searchUserRequest(true))
        axios.get(`/users/${name}/find`).then(res => {
            dispatch(searchUserSuccess(res.data))
        }).catch(e => {
            dispatch(searchUserError(e.message))
        })
    }
}

export const fetchReports = day => {
    return (dispatch) => {
        dispatch(reportRequest(true))
        axios.get(`/reports/${day}`).then(res => {
            dispatch(reportSuccess(res.data))
        }).catch(e => {
            dispatch(reportError(e.message))
        })
    }
}

export const fetchMilkProduce = day => {
    return (dispatch) => {
        dispatch(produceRequest(true))
        axios.get(`/milk-produce/${day}`).then(res => {
            dispatch(produceSuccess(res.data))
        }).catch(e => {
            dispatch(produceError(e.message))
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

export const removeCategory = categoryId => {
    return (dispatch) => {
        axios.delete(`/categories/${categoryId}`).then(() => {
            dispatch(deleteCategory(categoryId))
        }).catch(err => {
            console.log(err.message)
        })
    }
}

export const removeAdmin = adminId => {
    return (dispatch) => {
        axios.delete(`/users/admins/${adminId}`).then(() => {
            dispatch(deleteAdmin(adminId))
        }).catch(err => {
            console.log(err.message)
        })
    }
}

export const addAdmin = admin => {
    return (dispatch) => {
        dispatch(addAdminRequest(true))
        axios.post('/register', admin).then(res => {
            dispatch(addAdminSuccess(res.data))
        }).catch(e => {
            dispatch(addAdminError(e.response.data))
        })
    }
}

export const updateAdmin = (adminId, admin) => {
    return (dispatch) => {
        dispatch(updateAdminRequest(true))
        axios.put(`/users/${adminId}`, admin).then(res => {
            dispatch(updateAdminSuccess(res.data))
        }).catch(e => {
            dispatch(updateAdminError(e.message))
        })
    }
}

export const searchAnimal = name => {
    return (dispatch) => {
        dispatch(searchRequest(true))
        axios.get(`/animals/${name}`).then(res => {
            dispatch(searchSuccess(res.data))
        }).catch(e => {
            dispatch(searchError(e.message))
        })
    }
}

export const fetchAnimalFromState = animalId => {
    return (dispatch) => {
        dispatch(fetchAnimal(animalId))
    }
}

export const fetchAnimalOwner = userId => {
    return (dispatch) => {
        dispatch(fetchOwner(userId))
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
