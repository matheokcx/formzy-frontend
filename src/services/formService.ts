import { apiClient } from '@/lib/api.ts';
import type { Form, FormField } from '@/types';

export type FormCreationPayload = {
    name: string;
    description: string;
    fields: Record<string, FormField>;
    isPrivate: boolean;
};

export type FormUpdatePayload = {
    name?: string;
    description?: string;
    fields?: Record<string, FormField>;
    isPrivate?: boolean;
    isClosed?: boolean;
};

export class FormService {
    public static async getUserForms(userId: number): Promise<Form[]> {
        const { data } = await apiClient.get(`form/user/${userId}`);
        return data;
    }

    public static async getForm(formId: number): Promise<Form | null> {
        const { data } = await apiClient.get(`form/${formId}`);
        return data;
    }

    public static async createForm(payload: FormCreationPayload): Promise<Form> {
        const { data: form } = await apiClient.post('/form', payload);
        return form;
    }

    public static async updateForm(formId: number, payload: FormUpdatePayload): Promise<Form> {
        const { data: form } = await apiClient.patch(`/form/${formId}`, payload);
        return form;
    }

    public static async deleteForm(formId: number): Promise<void> {
        await apiClient.delete(`/form/${formId}`);
    }
}
