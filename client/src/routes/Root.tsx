import { UserContext } from "@/App";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import { type UserState, useUserStore } from "@/store/store";
import { type FC, useContext, useEffect, useState } from "react";

const Root: FC = () => {
	const store = useContext(UserContext);
	const [userState, setUserState] = useState<UserState>(store);

	useEffect(() => {
		if (sessionStorage.getItem("token")) {
			store.checkAuth();
		}
		const unsubscribe = useUserStore.subscribe(setUserState);

		return () => {
			unsubscribe();
		};
	}, [store]);

	return (
		<>
			<h1>
				{userState.isAuth ? `User authorized ${userState.user?.nickname}` : "Not authorized"}
			</h1>
			<LoginForm />
		</>
	);
};

export default Root;
