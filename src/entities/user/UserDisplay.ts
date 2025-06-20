export interface UserDisplay {
    userID: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    citizenID: string;
    phone?: string;
    gender: boolean;
    dateOfBirth: string;    
    city?: string;
    district?: string;
    ward?: string;
    houseNumber?: string;
}