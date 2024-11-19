import { configureStore } from '@reduxjs/toolkit';
import recentMoviesReducer from './slices/recentFilms';
import playerReducer from './slices/player';
import authReducer from "./slices/auth";
import navigateReducer from './slices/navigate'
const store = configureStore({
    reducer: {
        recentMovies: recentMoviesReducer,
        player: playerReducer,
        auth : authReducer,
        navigate : navigateReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
