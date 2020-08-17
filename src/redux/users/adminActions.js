import * as actions from '../types'

export const fetchAdminsRequest = bool => {
    return {
        type: actions.FETCH_ADMINS_REQUEST,
        payload: bool
    }
}

export const fetchAdminsSuccess = admins => {
    return {
        type: actions.FETCH_ADMINS_SUCCESS,
        payload: admins
    }
}

export const fetchAdminsError = error => {
    return {
        type: actions.FETCH_ADMINS_ERROR,
        payload: error
    }
}

export const addAdminRequest = bool => {
    return {
        type: actions.ADD_ADMIN_REQUEST,
        payload: bool
    }
}

export const addAdminSuccess = admin => {
    return {
        type: actions.ADD_ADMIN_SUCCESS,
        payload: admin
    }
}

export const addAdminError = error => {
    return {
        type: actions.ADD_ADMIN_ERROR,
        payload: error
    }
}

export const deleteAdmin = adminId => {
    return {
        type: actions.DELETE_ADMIN,
        payload: adminId
    }
}

export const updateAdmin = admin => {
    return {
        type: actions.UPDATE_ADMIN,
        payload: admin
    }
}
