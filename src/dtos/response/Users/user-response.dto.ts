export interface GetUserResponseDTO {
  citizenID: string;
  firstName: string;
  lastName: string;
  email: string;
  userID: string;
  phone: string;
  gender: boolean;
  dateOfBirth: string; // use string to represent DateOnly
  bloodGroupName?: string;
  roles: string[];
  isActive: boolean;
}