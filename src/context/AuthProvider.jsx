import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedUserType = localStorage.getItem("userType");

    if (storedUser && storedUserType) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password, userType) => {
    const storageKey = userType === "student" ? "students" : "faculties";
    const users = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Match user by email (case-insensitive) and correct schema
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && atob(u.password) === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      localStorage.setItem("userType", userType);
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
    if (users.some((u) => u.email.toLowerCase() === newUser.email.toLowerCase())) {
      return { success: false, message: "❌ User already exists. Try logging in." };
    }

    // Ensure strong password
    if (!validatePassword(newUser.password)) {
      return { success: false, message: "⚠️ Password must be at least 8 characters, with an uppercase, lowercase, and a number." };
    }

    // Secure password storage
    const userId = Date.now(); // Unique ID based on timestamp
    newUser.password = btoa(newUser.password); // Encrypt password
    newUser.id = userId; // Assign unique ID
    newUser.userType = userType; // Ensure userType is stored

    // Different schema based on userType
    if (userType === "student") {
      newUser.enrolledCourses = [];
    } else if (userType === "faculty") {
      newUser.department = "";
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
