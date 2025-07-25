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

    static async checkDonorEligibility(userId: number, formData: any): Promise<any> {
        try {
          console.log(`Checking eligibility for user ${userId}:`, formData);
          
          const axiosResponse = await api.post(
            `https://localhost:5000/api/v1/donor-eligibility/check/${userId}`,
            formData,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
                'Content-Type': 'application/json'
              }
            }
          );
          
          const response: ResponseDto<any> = axiosResponse.data;
          
          if (response.is_success) {
            return response.data;
          } else {
            throw new Error(response.message || 'Eligibility check failed');
          }
        } catch (error: any) {
          console.error('Error in checkDonorEligibility:', error);
          
          if (error.response?.status === 401) {
            // Token expired, redirect to login
            localStorage.removeItem('ACCESS_TOKEN');
            window.location.href = '/login';
          }
          
          throw error;
        }
      }
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

