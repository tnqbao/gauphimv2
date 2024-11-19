import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigateState {
    episode : number,
    page : number,
    category : string,
    visibleItem : number
}

const initialState: NavigateState = {
    episode : 1,
    page : 1,
    category : "home",
    visibleItem : 8
};

const navigateSlice = createSlice({
    name: 'navigate',
    initialState,
    reducers: {
        changeEpisode : (state, action: PayloadAction<number>) => {
            state.episode = action.payload;
        },
        changePage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
            state.visibleItem = 8;
        },
        loadMoreItem: (state ) => {
            state.visibleItem += 8;
        },
        changeCate: (state , action: PayloadAction<string>) => {
            state.category = action.payload;
        },
    },
});

export const { changeEpisode, changePage, loadMoreItem, changeCate } = navigateSlice.actions;
export default navigateSlice.reducer;
