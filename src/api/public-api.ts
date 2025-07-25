import api from "../configs/axios-api"
import ApiEndPoints from "../meta-data/contants/api-endpoints"
import { LoginResponseDto } from "../dtos/request/auth-request.dto"
import ResponseDto from "../dtos/response/response.dto"
import { DonationAppointmentDTO } from "../dtos/request/BloodAppointment/blood-appointment-request.dto"

import { MatchDonorRequestDTO } from "../dtos/request/BloodAppointment/blood-matching-log-request.dto"

import CreateUserDto from "../dtos/request/Users/create-user.dto"

export default class PublicAPI {
    static async login(username: string, password: string, availableRole?: string) {
        const axiosResposne = await api.post("https://localhost:5000" + ApiEndPoints.AuthEndpoints.LOGIN_ENDPOINT, {
            citizenID: username,
            password: password
        });
        const response: ResponseDto<LoginResponseDto> = axiosResposne.data;
        const data = response.data;

        if (availableRole && data.roles.includes(availableRole)) {
            localStorage.setItem('ACCESS_TOKEN', data.token);
        }
        else throw new Error('Role is not valid!');

        return response.data;
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

        const axiosResponse = await api.post("https://localhost:5000" + ApiEndPoints.AccountEndpoints.CREATE_ACCOUNT_WITH_CITIZEN_CARD_ENDPOINT,
            formData);
        
        console.log("Create resp: ", axiosResponse)

        return axiosResponse.data.data;
        
    }

    static async createDonationAppointment(dto: DonationAppointmentDTO) {
        console.log("DTO send to Server:", JSON.stringify(dto, null, 2));
        const token = localStorage.getItem('ACCESS_TOKEN');
        const axiosResponse = await api.post(
            "https://localhost:5000/api/v1/donation-appointment",
            dto,
            token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
        );
        return axiosResponse.data;
    }

    static async getDonationAppointmentsByUserId(userId: number) {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const axiosResponse = await api.get(
            `https://localhost:5000/api/v1/donation-appointment/${userId}`,
            token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
        );

        const jsonString = JSON.stringify(axiosResponse.data, null, 2);
        console.log("Response JSON:\n", jsonString);

        return axiosResponse.data.data;
    }
    
    static async matchDonorToBloodRequest(userId: number, matchingRequest: MatchDonorRequestDTO) {
        try {
          // ✅ Validate input parameters
          if (!userId || !matchingRequest?.bloodRequestId) {
            throw new Error('Missing required parameters: userId and bloodRequestId');
          }
    
          // ✅ Get auth token
          const token = localStorage.getItem('ACCESS_TOKEN')?.replaceAll('"', '');
          
          // ✅ API endpoint theo BE specification
          const endpoint = `https://localhost:5000/api/v1/blood-request/matching-log/${userId}`;
          
          // ✅ Request payload
          const requestPayload = {
            bloodRequestId: matchingRequest.bloodRequestId
          };
    
          console.log('=== MATCHING DONOR API CALL ===');
          console.log('Endpoint:', endpoint);
          console.log('User ID:', userId);
          console.log('Request payload:', requestPayload);
          console.log('Has auth token:', !!token);
    
          // ✅ Make API call
          const response = await api.post(endpoint, requestPayload, {
            headers: {
              'Content-Type': 'application/json',
              ...(token && { 'Authorization': `Bearer ${token}` })
            },
            timeout: 30000 // 30 seconds timeout
          });
    
          console.log('✅ API Response:', response.data);
    
          // ✅ Check if response is successful
          if (response.data?.is_success) {
            return response.data;
          } else {
            throw new Error(response.data?.message || 'API call failed');
          }
    
        } catch (error) {
          console.error('❌ Match Donor API Error:', error);
          
          // ✅ Enhanced error handling
          if (error.response) {
            // Server responded with error status
            const errorMessage = error.response.data?.message || 
                               error.response.data?.reason || 
                               `HTTP ${error.response.status}: ${error.response.statusText}`;
            throw new Error(errorMessage);
          } else if (error.request) {
            // Network error
            throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
          } else {
            // Other errors
            throw new Error(error.message || 'Có lỗi xảy ra khi đăng ký hiến máu');
          }
        }
      }
}