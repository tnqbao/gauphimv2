import { configureStore } from '@reduxjs/toolkit';
import recentMoviesReducer from './slices/recentFilms';
import playerReducer from './slices/player';

const store = configureStore({
    reducer: {
        recentMovies: recentMoviesReducer,
        player: playerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
