import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addStudent, addFaculty } from "../../utils/localStorage";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.search.includes("userType=faculty")
    ? "faculty"
    : "student"; // Determine user type from URL

  // State for form data and error handling
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    address: "",
    rollNumber: "", // Student-specific
    department: "", // Common for both
    course: "", // Student-specific
    specialization: "", // Faculty-specific
    designation: "", // Faculty-specific
  });

  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Save to localStorage
    if (userType === "student") {
      // Retrieve existing student records or initialize an empty array
      const students = JSON.parse(localStorage.getItem("students")) || [];
      // Add the new student
      students.push({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        contactNumber: formData.contactNumber,
        address: formData.address,
        rollNumber: formData.rollNumber,
        department: formData.department,
        course: formData.course,
      });
      // Save back to localStorage
      localStorage.setItem("students", JSON.stringify(students));
    } else if (userType === "faculty") {
      // Retrieve existing faculty records or initialize an empty array
      const faculties = JSON.parse(localStorage.getItem("faculties")) || [];
      // Add the new faculty
      faculties.push({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        contactNumber: formData.contactNumber,
        address: formData.address,
        department: formData.department,
        specialization: formData.specialization,
        designation: formData.designation,
      });
      // Save back to localStorage
      localStorage.setItem("faculties", JSON.stringify(faculties));
    }

    alert("Signup successful! Redirecting to login page...");
    navigate(userType === "student" ? "/student-login" : "/faculty-login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {userType === "student" ? "Student Signup" : "Faculty Signup"}
        </h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Common Fields */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              placeholder="Enter your contact number"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Department
            </label>
            <input
              type="text"
              name="department"
              placeholder="Enter your department"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          {/* Student-Specific Fields */}
          {userType === "student" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Roll Number
                </label>
                <input
                  type="text"
                  name="rollNumber"
                  placeholder="Enter your roll number"
                  className="w-full px-4 py-2 border rounded-md"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Course
                </label>
                <input
                  type="text"
                  name="course"
                  placeholder="Enter your course"
                  className="w-full px-4 py-2 border rounded-md"
                  value={formData.course}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {/* Faculty-Specific Fields */}
          {userType === "faculty" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Specialization
                </label>
                <input
                  type="text"
                  name="specialization"
                  placeholder="Enter your specialization"
                  className="w-full px-4 py-2 border rounded-md"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  placeholder="Enter your designation"
                  className="w-full px-4 py-2 border rounded-md"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Signup
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() =>
              navigate(
                userType === "student" ? "/student-login" : "/faculty-login"
              )
            }
            className="text-blue-600 hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
