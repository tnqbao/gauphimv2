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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        keepLogin : (state, action: PayloadAction<string>) => {
            state.keepMeLogin = action.payload;
        },
        addFullName: (state, action: PayloadAction<string>) => {
            state.fullname = action.payload;
        },
        checkAuth: (state , action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
    },
});

export const { keepLogin, addFullName, checkAuth } = authSlice.actions;
export default authSlice.reducer;
