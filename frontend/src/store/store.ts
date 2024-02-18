import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import requestIdReducer from './slice/requestIdSlice';
import isUploadedReducer from './slice/isUploadedSlice';

import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: ['auth', 'requestId', 'isUploaded'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    requestId: requestIdReducer,
    isUploaded: isUploadedReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
