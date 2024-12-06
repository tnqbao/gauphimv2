import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Films } from '@/utils/types';

interface RecentMoviesState {
    recentMovies: Films[];
}

const initialState: RecentMoviesState = {
    recentMovies: [],
};

const recentMoviesSlice = createSlice({
    name: 'recentMovies',
    initialState,
    reducers: {
        addMovie: (state, action: PayloadAction<Films>) => {
            const newMovie = action.payload;

            if (!state.recentMovies.some(movie => movie.slug === newMovie.slug)) {
                state.recentMovies = [newMovie, ...state.recentMovies];
                if (state.recentMovies.length > 5) {
                    state.recentMovies.pop();
                }
            }
        },
    },
});

export const { addMovie } = recentMoviesSlice.actions;

export default recentMoviesSlice.reducer;
