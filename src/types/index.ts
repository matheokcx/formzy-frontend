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

export type Form = {
    id: number;
    name: string;
    description: string;
    fields: never;
    isPrivate: boolean;
    isClosed: boolean;
    user: User;
    formTheme: FormTheme;
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
