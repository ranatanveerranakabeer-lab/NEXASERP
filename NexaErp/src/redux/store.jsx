import { configureStore } from '@reduxjs/toolkit' // YE LINE MISSING HAI
import createSagaMiddleware from 'redux-saga'
import rootReducer from './slice/rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export default store
