import { apiClient } from '@/lib/api.ts';
import type { Form } from '@/types';

export type FormCreationPayload = {
    name: string;
    description: string;
    fields: never;
    isPrivate: boolean;
};

export class FormService {
    public static async getUserForms(userId: number): Promise<Form[]> {
        const { data } = await apiClient.get(`forms/user/${userId}`);
        return data.data;
    }

    public static async createForm(payload: FormCreationPayload): Promise<Form> {
        const { data: form } = await apiClient.post('/forms', payload);
        return form;
    }
}
