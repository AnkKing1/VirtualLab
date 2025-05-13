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
    const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken"));
    
    // Handling Logout functionality for Student and Faculty
    const logoutStudent = () => {
        setStudentToken(null);
        localStorage.removeItem("studentToken");
    };

    const logoutFaculty = () => {
        setFacultyToken(null);
        localStorage.removeItem("facultyToken");
    };

    // Store Admin Token in localStorage
    const storeAdminTokenInLS = (adminToken) => {
        localStorage.setItem("adminToken", adminToken);
    };


    // Handling Logout functionality for Student and Faculty
    const logoutAdmin = () => {
        setAdminToken(null);
        localStorage.removeItem("adminToken");
    };

    return (
        <AuthContext.Provider value={{
            studentToken,
            facultyToken,
            adminToken,
            storeStudentTokenInLS,
            storeFacultyTokenInLS,
            logoutStudent,
            logoutFaculty,
            storeAdminTokenInLS,
            logoutAdmin
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
