import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Store Student Token in localStorage
    const storeStudentTokenInLS = (studentToken) => {
        localStorage.setItem("studentToken", studentToken);
    };

    // Store Faculty Token in localStorage
    const storeFacultyTokenInLS = (facultyToken) => {
        localStorage.setItem("facultyToken", facultyToken);
    };

    const [studentToken, setStudentToken] = useState(localStorage.getItem("studentToken"));
    const [facultyToken, setFacultyToken] = useState(localStorage.getItem("facultyToken"));

    // Handling Logout functionality for Student and Faculty
    const logoutStudent = () => {
        setStudentToken(null);
        localStorage.removeItem("studentToken");
    };

    const logoutFaculty = () => {
        setFacultyToken(null);
        localStorage.removeItem("facultyToken");
    };

    return (
        <AuthContext.Provider value={{
            studentToken,
            facultyToken,
            storeStudentTokenInLS,
            storeFacultyTokenInLS,
            logoutStudent,
            logoutFaculty
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }

    return authContextValue;
};
