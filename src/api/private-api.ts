import api from "../configs/axios-api";
import ResponseDto from "../dtos/response/response.dto";
import { GetUserResponseDTO } from "../dtos/response/Users/user-response.dto";
import { User } from "../entities/user/User";
import ApiEndPoints from "../meta-data/contants/api-endpoints";

export default class PrivateAPI {
    static async getUserById(id: number) {
    }
    
    static async getUserByToken() :Promise<GetUserResponseDTO> {
        const axiosResposne = await api.get(ApiEndPoints.AccountEndpoints.GET_ACCOUNT_ENDPOINT);
        const response: ResponseDto<GetUserResponseDTO> = axiosResposne.data;
        return response.data;
    }
}