import { useState, useEffect } from 'react';
import PrivateAPI from '../api/private-api';
import { GetUserResponseDTO } from '../dtos/response/Users/user-response.dto';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  bloodType?: string;
  dateOfBirth: string;
  roles: string[];
  isActive: boolean;
}

interface UseCurrentUserReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  refetch: () => Promise<void>;
}

// Helper function để convert API response sang User interface
const mapUserResponse = (response: GetUserResponseDTO): User => {
  return {
    id: response.userID,
    name: `${response.firstName} ${response.lastName}`,
    email: response.email,
    phone: response.phone,
    gender: response.gender ? 'female' : 'male',
    bloodType: response.bloodGroupName,
    dateOfBirth: response.dateOfBirth,
    roles: response.roles,
    isActive: response.isActive
  };
};

export const useCurrentUser = (): UseCurrentUserReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await PrivateAPI.getUserByToken();
      setUser(mapUserResponse(userData));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    refetch: fetchUser
  };
};
