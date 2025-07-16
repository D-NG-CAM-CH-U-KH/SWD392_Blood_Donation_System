import api from "../configs/axios-api"
import ApiEndPoints from "../meta-data/contants/api-endpoints"
import { LoginResponseDto } from "../dtos/request/auth-request.dto"
import ResponseDto from "../dtos/response/response.dto"
import { DonationAppointmentDTO } from "../dtos/request/BloodAppointment/blood-appointment-request.dto"
import CreateUserDto from "../dtos/request/Users/create-user.dto"

export default class PublicAPI {
    static async login(username: string, password: string, availableRole?: string) {
        const axiosResposne = await api.post(ApiEndPoints.AuthEndpoints.LOGIN_ENDPOINT, {
            citizenID: username,
            password: password
        });
        const response: ResponseDto<LoginResponseDto> = axiosResposne.data;
        const data = response.data;

        if (availableRole && data.roles.includes(availableRole)) {
            localStorage.setItem('token', data.token);
        }
        else throw new Error('Role is not valid!');

        return response;
    }

    static async signUp(signUpForm: CreateUserDto) {
        const formData = new FormData();

        formData.append('FrontCardFile', signUpForm.frontCardFile);
        formData.append('BackCardFile', signUpForm.backCardFile);
        formData.append('FirstName', signUpForm.firstName);
        formData.append('LastName', signUpForm.lastName);
        formData.append('Email', signUpForm.email);
        formData.append('Password', signUpForm.password);
        formData.append('CitizenID', signUpForm.citizenID);
        formData.append('Phone', signUpForm.phone);
        formData.append('Gender', signUpForm.gender === 1 ? 'true' : 'false'); // bool as string
        formData.append('DateOfBirth', '2000-01-01'); // Format: yyyy-MM-dd
        formData.append('City', signUpForm.city);
        formData.append('District', signUpForm.district);
        formData.append('Ward', signUpForm.ward);
        formData.append('HouseNumber', signUpForm.houseNumber);
        formData.append('Longitude', '0'); // optional
        formData.append('Latitude', '0'); // optional
        formData.append('IsActive', 'true');

        const axiosResponse = await api.post(ApiEndPoints.AccountEndpoints.CREATE_ACCOUNT_WITH_CITIZEN_CARD_ENDPOINT,
            formData);
        
        console.log("Create resp: ", axiosResponse)

        return axiosResponse.data.data;
        
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

    static async getDonationAppointmentsByUserId(userId: number) {
        const token = localStorage.getItem('token');
        const axiosResponse = await api.get(
            `https://localhost:5000/api/v1/donation-appointment/${userId}`,
            token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
        );

        const jsonString = JSON.stringify(axiosResponse.data, null, 2);
        console.log("Response JSON:\n", jsonString);

        return axiosResponse.data.data;
    }
}