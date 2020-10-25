import counterReducer from './counter'
import loggedReducer from '../reducers/isLogged'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    orderItems:counterReducer,
    isLogged:loggedReducer
})

export default allReducers;