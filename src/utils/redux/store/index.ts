import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import recentMoviesReducer from './slices/recentFilms';
import playerReducer from './slices/player';
import authReducer from './slices/auth';
import navigateReducer from './slices/navigate';

const rootReducer = combineReducers({
    recentMovies: recentMoviesReducer,
    player: playerReducer,
    auth: authReducer,
    navigate: navigateReducer,
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
