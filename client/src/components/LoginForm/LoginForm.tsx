import { UserContext } from "@/App";
import { type FC, useContext, useState } from "react";

const LoginForm: FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const store = useContext(UserContext);

	return (
		<>
			<div>
				<h1 className="text-black text-3xl">Login</h1>
				<form>
					<div className="m-3 p-3">
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="border border-gray-300 rounded-md p-2 mb-2"
							autoComplete="email"
						/>
						<input
							type="password"
							placeholder="Password"
							autoComplete="current-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="border border-gray-300 rounded-md p-2 mb-2"
						/>
					</div>
					<button
						type="button"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => store.login(email, password)}
					>
						Login
					</button>
					<button
						type="button"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Registration
					</button>
					<button
						type="button"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => store.logout()}
					>
						Logout
					</button>
				</form>
			</div>
		</>
	);
};

export { LoginForm };
