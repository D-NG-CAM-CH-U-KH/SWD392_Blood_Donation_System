import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { initialize, reducer } from "./reducer";
import { AuthContext, initialState } from "./AuthContext";
import { JWTHelper } from "../helpers/jwt-helper";
import { UserToken } from "../entities/user/UserToken";
import PrivateAPI from "../api/private-api";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      if (!accessToken) {
        return dispatch(initialize({ isAuthenticated: false, user: null }));
      }

      try {
        const user = await PrivateAPI.getUserByToken();
        dispatch(initialize({ isAuthenticated: true, user }));
      } catch {
        dispatch(initialize({ isAuthenticated: false, user: null }));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;