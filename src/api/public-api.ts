import api from "../configs/axios-api"
import ApiEndPoints from "../meta-data/contants/api-endpoints"
import { LoginResponseDto } from "../dtos/request/auth-request.dto"
import ResponseDto from "../dtos/response/response.dto"

export default class PublicAPI {
    static async login(username: string, password: string, availableRole?: string) {
        const axiosResposne = await api.post(ApiEndPoints.AuthEndpoints.LOGIN_ENDPOINT, {
            citizenID: username,
            password: password
        });
        const response : ResponseDto<LoginResponseDto> = axiosResposne.data; 
        const data = response.data;

        if (availableRole && data.roles.includes(availableRole)) {
            localStorage.setItem('token', data.token);
        }
        else throw new Error('Role is not valid!');

        return response;
    }
}