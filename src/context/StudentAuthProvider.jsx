import React, { createContext, useContext, useState, useEffect } from "react";

const StudentAuthContext = createContext();

export const StudentAuthProvider = ({ children }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) {
      setStudent(JSON.parse(storedStudent));
    }
  }, []);

  const login = (email, password) => {
    const students = JSON.parse(localStorage.getItem("students")) || [];

    const foundStudent = students.find(
      (s) => s.email.toLowerCase() === email.toLowerCase() && atob(s.password) === password
    );

    if (foundStudent) {
      setStudent(foundStudent);
      localStorage.setItem("student", JSON.stringify(foundStudent));
      return { success: true, message: "✅ Student login successful!" };
    }

    return { success: false, message: "❌ Invalid email or password. Please try again." };
  };

  const logout = () => {
    localStorage.removeItem("student");
    setStudent(null);
  };

  const register = (newStudent) => {
    const students = JSON.parse(localStorage.getItem("students")) || [];

    if (students.some((s) => s.email.toLowerCase() === newStudent.email.toLowerCase())) {
      return { success: false, message: "❌ Student already exists. Try logging in." };
    }

    if (!validatePassword(newStudent.password)) {
      return {
        success: false,
        message: "⚠️ Password must be at least 8 characters, with an uppercase, lowercase, and a number.",
      };
    }

    newStudent.password = btoa(newStudent.password); // Encode password
    newStudent.id = Date.now();
    newStudent.enrolledCourses = [];

    students.push(newStudent);
    localStorage.setItem("students", JSON.stringify(students));

    return { success: true, message: "✅ Student registration successful. You can now log in!" };
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  };

  return (
    <StudentAuthContext.Provider value={{ student, login, logout, register }}>
      {children}
    </StudentAuthContext.Provider>
  );
};

export const useStudentAuth = () => useContext(StudentAuthContext);
