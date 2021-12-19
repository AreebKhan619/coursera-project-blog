import { combineReducers } from "redux";
import dataReducer from "./dataReducer"
import uiReducer from "./uiReducer"

const combinedReducers = combineReducers({
    data: dataReducer,
    ui: uiReducer
});

export default combinedReducers;