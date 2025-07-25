import { GetUserResponseDTO } from "../dtos/response/Users/user-response.dto";
import { User } from "../entities/user/User";

export interface AuthState {
    isAuthenticated?: boolean,
    isInitialized?: boolean,
    user: GetUserResponseDTO | null
}