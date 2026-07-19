export type User = {
    id: number;
    fullName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    initials: string;
    role: string;
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
    replies?: FormReply[];
    createdAt: string;
    updatedAt: string;
};

export type FormReply = {
    id: number;
    replies: never;
    formId: number;
    createdAt: string;
    updatedAt: string;
};

export type FormStatus = 'all' | 'open' | 'closed';
