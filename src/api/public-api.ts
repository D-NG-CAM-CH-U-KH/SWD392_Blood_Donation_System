import api from "../configs/axios-api"
import ApiEndPoints from "../meta-data/contants/api-endpoints"
import { LoginResponseDto } from "../dtos/request/auth-request.dto"
import ResponseDto from "../dtos/response/response.dto"
import { DonationAppointmentDTO } from "../dtos/request/BloodAppointment/blood-appointment-request.dto"

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

    static async createDonationAppointment(dto: DonationAppointmentDTO) {
        console.log("DTO send to Server:", JSON.stringify(dto, null, 2));
        const token = localStorage.getItem('token');
        const axiosResponse = await api.post(
          "https://localhost:5000/api/v1/donation-appointment",
          dto,
          token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
        );
        return axiosResponse.data;
    }    
}