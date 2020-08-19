import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension/index"
import thunk from 'redux-thunk'
import authReducer from "./auth/authReducer"
import salesReducer from "./sales/salesReducer"
import animalReducer from "./animals/animalReducer"
import categoryReducer from "./categories/categoryReducer"
import adminReducer from "./users/adminReducer"
import userReducer from "./users/userReducer"
import searchReducer from "./searches/searchReducer"
import reportReducer from "./reports/reportReducer"
import produceReducer from "./milk-produce/produceReducer"

const initialState = {}
const middleware = [thunk]

const rootReducer = combineReducers({
    authData: authReducer,
    salesData: salesReducer,
    animalData: animalReducer,
    categoryData: categoryReducer,
    adminData: adminReducer,
    userData: userReducer,
    searchData: searchReducer,
    reportData: reportReducer,
    produceData: produceReducer
})

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
