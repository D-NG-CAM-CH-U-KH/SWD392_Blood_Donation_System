export default interface CreateUserDto {
    frontCardFile: File;
    backCardFile: File;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    citizenID: string;
    phone: string;
    gender: number;
    city: string;
    district: string;
    ward: string;
    houseNumber: string;
}