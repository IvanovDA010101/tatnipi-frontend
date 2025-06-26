import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index.js';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
    // devTools: process.env.NODE_ENV !== 'production', // Включение Redux DevTools только в режиме разработки
});

// Запуск root saga
sagaMiddleware.run(rootSaga);

export default store;
