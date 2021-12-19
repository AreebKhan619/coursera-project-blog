import { applyMiddleware, createStore, compose } from "redux"
import thunk from "redux-thunk"
import combinedReducers from "../reducers"

const store = createStore(combinedReducers, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f))

export default store