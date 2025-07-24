import api from "../configs/axios-api";
import ResponseDto from "../dtos/response/response.dto";
import { GetUserResponseDTO } from "../dtos/response/Users/user-response.dto";
import { User } from "../entities/user/User";
import ApiEndPoints from "../meta-data/contants/api-endpoints";

export default class PrivateAPI {
    static async getUserById(id: number) {
    }

    static async getUserByToken(): Promise<GetUserResponseDTO> {
        const axiosResposne = await api.get(ApiEndPoints.AccountEndpoints.GET_ACCOUNT_ENDPOINT);
        const response: ResponseDto<GetUserResponseDTO> = axiosResposne.data;
        return response.data;
    }

    static async createCertificateWithImage(formData: any): Promise<any> {
        const data = new FormData();
        data.append('ImageProof', formData.fileProof); // must be a File object
        data.append('CitizenID', formData.citizenID);
        data.append('FullName', formData.fullName);
        data.append('DateOfBirth', formData.dateOfBirth);
        data.append('Address', formData.address);
        data.append('BloodDonationCenter', formData.bloodDonationCenter);
        data.append('DonatedVolumn', formData.donatedVolumn);
        data.append('SeriNumber', formData.seriNumber);
        data.append('UserID', formData.userID);

        const axiosResposne = await api.post(ApiEndPoints.CertificateEndpoints.CERTIFICATE_WITH_IMAGE_ENDPOINT, data);
        const response: ResponseDto<any> = axiosResposne.data;
        return response.data;
    }
}