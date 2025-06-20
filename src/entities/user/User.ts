export interface User {
    userID: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    citizenID: string;
    citizenCardFront?: number;
    citizenCardBack?: number;
    phone?: string;
    gender: boolean;
    dateOfBirth: string;    
    bloodGroupID?: number;
    city?: string;
    district?: string;
    ward?: string;
    houseNumber?: string;
    longitude?: number;
    latitude?: number;
    isActive: boolean;
    createdAt: string;
}