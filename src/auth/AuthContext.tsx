import { createContext, Dispatch } from "react";
import { AuthActionType } from "../meta-data/enums/auth-action-type.enum";
import { AuthState } from "./auth-state.types";

export interface PayloadAction<T> {
    type: AuthActionType,
    payload: T;
}

export interface AuthContextType extends AuthState {
    dispatch: Dispatch<PayloadAction<AuthState>>;
}

export const initialState : AuthState = {
    isInitialized: false,
    isAuthenticated: false,
    user: null
}

export const AuthContext = createContext<AuthContextType>({
    ...initialState,
    dispatch: () => null
})