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
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() =>
      setLoading(false)
    );
  };

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem("access-token");
      if (token) {
        const response = await axios.get("http://localhost:5000/verifyToken", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if(response)
        {
          setUser(response.data);
        }
      }
    } catch (error) {
      console.error("Error verifying token:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []); // Removed user from dependency array to avoid infinite loop

  const logOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        localStorage.removeItem("access-token");
        setUser(null);
      })
      .catch((error) => console.error("Sign out error:", error))
      .finally(() => setLoading(false));
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("access-token", token);
      setUser(response.data);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser)
      {
        console.log("google",currentUser)
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    login,
    user,
    setUser,
    loading,
    logOut,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
