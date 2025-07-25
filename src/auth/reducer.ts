import { AuthActionType } from "../meta-data/enums/auth-action-type.enum";
import { AuthState } from "./auth-state.types";
import { PayloadAction } from "./AuthContext";

// Define supported actions and their reducers
interface ReducerHandler {
  INITIALIZE(state: AuthState, action: PayloadAction<AuthState>): AuthState;
  SIGN_IN(state: AuthState, action: PayloadAction<AuthState>): AuthState;
  SIGN_OUT(state: AuthState): AuthState;
}

// Reducer logic for each action
const reducerHandlers: ReducerHandler = {
  INITIALIZE(state, action) {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },

  SIGN_IN(state, action) {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  SIGN_OUT(state) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

// Main reducer function
export function reducer(state: AuthState, action: PayloadAction<AuthState>): AuthState {
  if (!(action.type in reducerHandlers)) return state;

  return reducerHandlers[action.type](state, action);
}


// -------------------- ACTIONS ------------------------------------
export function initialize(payload: AuthState): PayloadAction<AuthState> {
  return {
    type: AuthActionType.INITIALIZE,
    payload,
  };
}

export function logIn(payload: AuthState): PayloadAction<AuthState> {
  return {
    type: AuthActionType.SIGN_IN,
    payload,
  };
}

export function logOut(): PayloadAction<AuthState> {
  localStorage.removeItem('ACCESS_TOKEN');

  return {
    type: AuthActionType.SIGN_OUT,
    payload: { isAuthenticated: false, isInitialized: true, user: null },
  };
}