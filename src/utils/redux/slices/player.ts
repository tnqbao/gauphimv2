import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerState {
    episodes: {
        name : string,
        link_m3u8 : string,
    }[];
    poster_url : string;
    player_url : string;
    name : string;
}

const initialState: PlayerState = {
    episodes: [],
    poster_url : "",
    player_url : "",
    name : ""
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        addPosterUrl : (state, action: PayloadAction<string>) => {
            state.poster_url = action.payload;
        },
        addEpisode: (state, action: PayloadAction<{name : string , link_m3u8 : string}[]>) => {
            state.episodes = action.payload;
        },
        setPlayUrl : (state, action:PayloadAction<string>) => {
            state.player_url = action.payload;
        },
        setFilmName : (state, action:PayloadAction<string>) => {
            state.name = action.payload
        }
    },
});

export const { addEpisode, addPosterUrl, setPlayUrl, setFilmName } = playerSlice.actions;
export default playerSlice.reducer;
