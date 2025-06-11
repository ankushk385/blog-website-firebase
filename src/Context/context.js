// context.js or AuthContext.js

import { createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Handle login
  const login = async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password);
  };
  // Handle Signin
  const register = async ({ email, password }) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  // Handle Logout
  const logout = async () => {
    await signOut(auth);
  };

  // Set user on state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Watch auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ logout, login, register, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
