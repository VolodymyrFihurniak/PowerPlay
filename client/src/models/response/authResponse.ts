import type { User } from "@/entities/user";

interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export type { AuthResponse };
