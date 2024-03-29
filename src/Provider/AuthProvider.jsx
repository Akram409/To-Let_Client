import axios from "axios";
import {
	GoogleAuthProvider,
	getAuth,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";


export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const googleProvider = new GoogleAuthProvider();

	const googleSignIn = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	useEffect(() => {
		// Check if user is logged in
		const token = localStorage.getItem("token");
		if (token) {
			// Verify token on the server
			axios
				.post("http://localhost:5000/verifyToken", { token })
				.then(() => {
					setUser({ token });
				})
				.catch(() => {
					localStorage.removeItem("token");
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	}, []);

	const logOut = () => {
		setLoading(true);
		signOut(auth)
			.then(() => {
				localStorage.removeItem("token");
				setUser(null);
			})
			.catch(error => {
				console.error("Sign out error:", error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const login = async (email, password) => {
		try {
			const response = await axios.post("http://localhost:5000/login", { email, password });
			const { token } = response.data;
			// Store token in local storage
			console.log(response.data);
			localStorage.setItem("token", token);
			setUser({ token });
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser);
			setLoading(false)
		});
		return () => {
			return unsubscribe();
		};
	}, []);

	const authInfo = {
		login,
		user,
		setUser,
		loading,
		logOut,
		googleSignIn,
	};

	return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
