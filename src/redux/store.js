import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension/index"
import thunk from 'redux-thunk'
import userReducer from "./users/userReducer"


const initialState = {}
const middleware = [thunk]

const rootReducer = combineReducers({
    userData: userReducer
})

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
