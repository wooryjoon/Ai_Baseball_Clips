import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';

import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
};

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});
const persistor = persistStore(store);

export { store, persistor };
