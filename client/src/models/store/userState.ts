import type { User } from "@/entities/user";

interface UserState {
    user: User | null;
    isAuth: boolean;
    errors: string[];
    login: (email: string, password: string) => Promise<void>;
    registration: (
        firstName: string,
        secondName: string,
        nickname: string,
        email: string,
        password: string
    ) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export type { UserState };
