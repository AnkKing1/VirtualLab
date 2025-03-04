import React, { createContext, useContext, useState, useEffect } from "react";

const FacultyAuthContext = createContext();

export const FacultyAuthProvider = ({ children }) => {
  const [faculty, setFaculty] = useState(null);

  useEffect(() => {
    const storedFaculty = localStorage.getItem("faculty");
    if (storedFaculty) {
      setFaculty(JSON.parse(storedFaculty));
    }
  }, []);

  const login = (email, password) => {
    const faculties = JSON.parse(localStorage.getItem("faculties")) || [];

    const foundFaculty = faculties.find(
      (f) => f.email.toLowerCase() === email.toLowerCase() && atob(f.password) === password
    );

    if (foundFaculty) {
      setFaculty(foundFaculty);
      localStorage.setItem("faculty", JSON.stringify(foundFaculty));
      return { success: true, message: "✅ Faculty login successful" };
    }

    return { success: false, message: "❌ Invalid credentials. Please try again." };
  };

  const logout = () => {
    localStorage.removeItem("faculty");
    setFaculty(null);
  };

  const register = (newFaculty) => {
    const faculties = JSON.parse(localStorage.getItem("faculties")) || [];

    if (faculties.some((f) => f.email.toLowerCase() === newFaculty.email.toLowerCase())) {
      return { success: false, message: "❌ Faculty already exists. Try logging in." };
    }

    if (!validatePassword(newFaculty.password)) {
      return { success: false, message: "⚠️ Password must be at least 8 characters, with an uppercase, lowercase, and a number." };
    }

    newFaculty.password = btoa(newFaculty.password);
    newFaculty.id = Date.now();
    newFaculty.department = "";

    faculties.push(newFaculty);
    localStorage.setItem("faculties", JSON.stringify(faculties));

    return { success: true, message: "✅ Faculty registration successful. You can now log in!" };
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  };

  return (
    <FacultyAuthContext.Provider value={{ faculty, login, logout, register }}>
      {children}
    </FacultyAuthContext.Provider>
  );
};

export const useFacultyAuth = () => useContext(FacultyAuthContext);
