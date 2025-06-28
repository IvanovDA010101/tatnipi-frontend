import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index.js';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

// Custom middleware for debugging
const loggerMiddleware = (store) => (next) => (action) => {
    console.group(`Action: ${action.type}`);
    console.log('Payload:', action.payload);
    console.log('Previous State:', store.getState());

    const result = next(action);

    console.log('New State:', store.getState());
    console.groupEnd();

    return result;
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        })
            .concat(sagaMiddleware)
            .concat(loggerMiddleware), // Add logger for debugging
    devTools: process.env.NODE_ENV !== 'production',
});

// Run saga middleware
sagaMiddleware.run(rootSaga);

// Debug initial state
console.log('Store initialized with state:', store.getState());

export default store;