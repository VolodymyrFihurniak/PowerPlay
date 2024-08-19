import Root from "@/routes/Root";
import { type FC, createContext } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { type UserState, useUserStore } from "./store/store";

const router = createBrowserRouter([
	{
		id: "root",
		path: "/",
		Component: Root,
	},
]);

const userState = useUserStore.getState();
const UserContext = createContext<UserState>(userState);

const App: FC = () => {
	return (
		<UserContext.Provider value={userState}>
			<RouterProvider
				router={router}
				fallbackElement={<p>Initial Load...</p>}
			/>
		</UserContext.Provider>
	);
};

export { UserContext };
export default App;
