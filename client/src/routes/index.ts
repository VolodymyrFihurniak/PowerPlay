import Root from "@routes/Root";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        Component: Root,
    },
]);

export default router;
