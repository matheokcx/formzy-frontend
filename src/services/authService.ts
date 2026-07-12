import type { AxiosResponse } from 'axios';
import { apiClient } from '@/lib/api.ts';
import type { User } from '@/types';

export class AuthService {
    public static async login(formData: FormData): Promise<AxiosResponse<{ token: string }>> {
        return await apiClient.post('/auth/login', {
            email: formData.get('email'),
            password: formData.get('password'),
        });
    }

    public static async register(formData: FormData): Promise<AxiosResponse<{ token: string }>> {
        return await apiClient.post('/auth/signup', {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            password: formData.get('password'),
            passwordConfirmation: formData.get('passwordConfirmation'),
        });
    }

    public static async getProfile(): Promise<AxiosResponse<User>> {
        return await apiClient.get('/account/profile');
    }
}
