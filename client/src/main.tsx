import App from "@/App.tsx";
import "@/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClientError } from "@extensions/clientError";

const domNode = document.getElementById("root");

if (!domNode) {
	throw ClientError.NotFound("No root element found");
}

const root = createRoot(domNode);

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
