import $api from "@/http";
import type { AuthResponse } from "@/models/response/authResponse";
import type { AxiosResponse } from "axios";

class AuthService {
    public login = async (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
        return $api.post<AuthResponse>("auth/login", { email, password });
    };

    public registration = async (
        firstName: string,
        secondName: string,
        nickname: string,
        email: string,
        password: string
    ): Promise<AxiosResponse<AuthResponse>> => {
        return $api.post<AuthResponse>("auth/registration", { firstName, secondName, nickname, email, password });
    };

    public logout = async (): Promise<AxiosResponse<void>> => {
        return $api.post("auth/logout");
    };

    public checkAuth = async (): Promise<AxiosResponse<AuthResponse>> => {
        return $api.get<AuthResponse>("auth/refresh");
    };
}

export { AuthService };
