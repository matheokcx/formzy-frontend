import { apiClient } from '@/lib/api.ts';
import type { Form } from '@/types';

export class AuthService {
    public static async getUserForms(userId: number): Promise<Form[]> {
        const { data } = await apiClient.get(`forms/user/${userId}`);
        return data.data;
    }
}
