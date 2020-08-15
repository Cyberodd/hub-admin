import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension/index"
import thunk from 'redux-thunk'
import userReducer from "./users/userReducer"
import transactionReducer from "./transactions/transactionReducer"
import animalReducer from "./animals/animalReducer"


const initialState = {}
const middleware = [thunk]

const rootReducer = combineReducers({
    userData: userReducer,
    transactionData: transactionReducer,
    animalData: animalReducer
})

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
