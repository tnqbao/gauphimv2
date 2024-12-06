import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '../slices/auth';
import playerReducer from "@/utils/redux/slices/player";
import navigateReducer from "@/utils/redux/slices/navigate";
import recentFilmsReducer from "@/utils/redux/slices/recentFilms";


const rootReducer = combineReducers({
    auth: authReducer,
    player : playerReducer,
    navigate : navigateReducer,
    recentFilm : recentFilmsReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'player'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});


const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };