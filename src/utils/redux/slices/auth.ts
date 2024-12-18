import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: {
        id: number,
        fullname: string,
        permission: string,
    },
    keepMeLogin: string,
    token: string
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: {
        id: 0,
        fullname: '',
        permission: ''
    },
    keepMeLogin: '',
    token: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        keepLogin: (state, action: PayloadAction<string>) => {
            state.keepMeLogin = action.payload;
        },
        setUser: (state, action: PayloadAction<{
            id: number,
            fullname: string,
            permission: string
        }>) => {
            state.user.id = action.payload.id;
            state.user.fullname = action.payload.fullname;
            state.user.permission = action.payload.permission;
        },
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
    },
});

export const {keepLogin, setUser, setAuth} = authSlice.actions;
export default authSlice.reducer;