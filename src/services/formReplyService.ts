import type { FormReply } from '@/types';
import { apiClient } from '@/lib/api.ts';

export class FormReplyService {
    static async createFormReply(data: Record<string, any>, formId: string): Promise<FormReply> {
        return await apiClient.post(`/form-replies/${formId}`, { replies: data });
    }
}
