import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Component/Router/Router";
import React from "react";
import { AllProvider } from "./Component/Context/AllContext";
import AuthProvider from "./Provider/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AllProvider>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</AllProvider>
	</React.StrictMode>
);
