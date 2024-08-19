import type { UserState } from "@/models/store/userState";
import { AuthService } from "@services/authService";
import { create } from "zustand";
import { createJSONStorage, devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useUserStore = create<UserState>()(
    devtools(
        persist(
            immer(
                subscribeWithSelector((set) => ({
                    user: null,
                    isAuth: false,
                    errors: [],

                    login: async (email: string, password: string) => {
                        try {
                            const response = await new AuthService().login(email, password);
                            set((state) => {
                                state.user = response.data.user;
                                state.isAuth = true;
                            });
                            sessionStorage.setItem("token", response.data.accessToken);
                        } catch (e) {
                            set((state) => {
                                const errorResponse = e as { response: { data: { errors: string[] } } };
                                state.errors = errorResponse.response.data.errors;
                            });
                        }
                    },

                    registration: async (
                        firstName: string,
                        secondName: string,
                        nickname: string,
                        email: string,
                        password: string
                    ) => {
                        try {
                            const response = await new AuthService().registration(
                                firstName,
                                secondName,
                                nickname,
                                email,
                                password
                            );
                            set((state) => {
                                state.user = response.data.user;
                                state.isAuth = true;
                            });
                            sessionStorage.setItem("token", response.data.accessToken);
                        } catch (e) {
                            set((state) => {
                                const errorResponse = e as { response: { data: { errors: string[] } } };
                                state.errors = errorResponse.response.data.errors;
                            });
                        }
                    },

                    logout: async () => {
                        try {
                            await new AuthService().logout();
                            set((state) => {
                                state.user = null;
                                state.isAuth = false;
                            });
                            sessionStorage.removeItem("token");
                        } catch (e) {
                            set((state) => {
                                const errorResponse = e as { response: { data: { errors: string[] } } };
                                state.errors = errorResponse.response.data.errors;
                            });
                        }
                    },

                    checkAuth: async () => {
                        try {
                            const response = await new AuthService().checkAuth();
                            set((state) => {
                                state.user = response.data.user;
                                state.isAuth = true;
                            });
                            sessionStorage.setItem("token", response.data.accessToken);
                        } catch (e) {
                            set((state) => {
                                const errorResponse = e as { response: { data: { errors: string[] } } };
                                state.errors = errorResponse.response.data.errors;
                            });
                        }
                    },
                }))
            ),
            {
                name: "user-storage",
                storage: createJSONStorage(() => sessionStorage),
            }
        )
    )
);

export { useUserStore, type UserState };
