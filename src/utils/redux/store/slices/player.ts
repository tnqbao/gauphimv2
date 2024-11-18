import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerState {
    episodes: string[];
    poster_url : string;
}

const initialState: PlayerState = {
    episodes: [],
    poster_url : ""
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        addPosterUrl : (state, action: PayloadAction<string>) => {
            state.poster_url = action.payload;
        },
        addEpisode: (state, action: PayloadAction<string[]>) => {
            state.episodes = action.payload;
        },
    },
});

export const { addEpisode, addPosterUrl } = playerSlice.actions;
export default playerSlice.reducer;
