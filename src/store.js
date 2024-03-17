import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { hunt } from './slice'


let middleware = [thunk]

if (process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger')
    middleware = [...middleware, logger]
  }
  
const store = configureStore({
    reducer:{
        hunt: hunt.reducer
    },
    middleware
});

export default store;