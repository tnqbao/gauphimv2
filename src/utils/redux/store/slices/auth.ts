import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    fullname : string,
    keepMeLogin : string
}

const initialState: AuthState = {
    isAuthenticated: false,
    fullname : '',
    keepMeLogin : ''
};

const playerSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        keepLogin : (state, action: PayloadAction<string>) => {
            state.keepMeLogin = action.payload;
        },
        addFullName: (state, action: PayloadAction<string>) => {
            state.fullname = action.payload;
        },
    },
});

export const { keepLogin, addFullName } = playerSlice.actions;
export default playerSlice.reducer;
