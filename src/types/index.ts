export type User = {
    id: number;
    fullName: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
};

export type FormTheme = {
    id: number;
    name: string;
    primaryColor: string;
    secondaryColor: string | null;
    font: string | null;
    ctaText: string | null;
    user: User;
    createdAt: string;
    updatedAt: string;
};

export type FormField = {
    label: string;
    type: string;
    required: boolean;
    position: number;
};

export type Form = {
    id: number;
    name: string;
    description: string;
    fields: Record<string, FormField>;
    isPrivate: boolean;
    isClosed: boolean;
    user: User;
    formTheme: FormTheme | null;
    formReplies?: FormReply[];
    createdAt: string;
    updatedAt: string;
};

export type FormReply = {
    id: number;
    replies: never;
    createdAt: string;
    updatedAt: string;
};

export type FormStatus = 'all' | 'open' | 'closed' | 'private';
