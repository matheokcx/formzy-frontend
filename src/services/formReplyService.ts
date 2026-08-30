import type { FormReply } from '@/types';
import { apiClient } from '@/lib/api.ts';

export type FormReplyCreationPayload = {
    formId: number;
    replies: string;
};

export class FormReplyService {
    static async createFormReply(payload: FormReplyCreationPayload): Promise<FormReply> {
        const { data: formReply } = await apiClient.post('/form-reply', payload);
        return formReply;
    }
}
