import { combineReducers, applyMiddleware, configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import {thunk} from 'redux-thunk';



const store = configureStore({
    reducer : {
        user : userReducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store