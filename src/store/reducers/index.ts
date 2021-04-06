import { combineReducers } from 'redux';
import { dataReducer } from './dataReducer'
import { preferUserReducer } from './preferUserReducer'



const rootReducer = combineReducers({
    data: dataReducer,
    preferUser: preferUserReducer
})
export default rootReducer