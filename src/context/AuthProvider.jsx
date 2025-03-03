import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password, userType) => {
    const users = JSON.parse(localStorage.getItem(userType === "student" ? "students" : "faculties")) || [];
    
    const foundUser = users.find((u) => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      localStorage.setItem("userType", userType); // Store user type for session consistency
      return { success: true, message: "✅ Login successful" };
    }
    
    return { success: false, message: "❌ Invalid credentials. Please try again." };
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    setUser(null);
  };

  const register = (newUser, userType) => {
    const storageKey = userType === "student" ? "students" : "faculties";
    const users = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Check if email already exists
    if (users.some((u) => u.email === newUser.email)) {
      return { success: false, message: "❌ User already exists. Try logging in." };
    }

    // Ensure strong password
    if (!validatePassword(newUser.password)) {
      return { success: false, message: "⚠️ Password must be at least 8 characters, with an uppercase, lowercase, and a number." };
    }

    users.push(newUser);
    localStorage.setItem(storageKey, JSON.stringify(users));

    return { success: true, message: "✅ Registration successful. You can now log in!" };
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
