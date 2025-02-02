import React from "react";

// Function to store data into localStorage
export const initializeLocalStorage = () => {
  const students = [
    
        {
          "name": "Aarav Gupta",
          "email": "aarav.gupta@example.com",
          "password": "123",
          "batch": "2023",
          "branch": "Computer Science",
          "dob": "2002-04-15",
          "phone": "9876543210",
          "address": "Delhi, India"
        },
        {
          "name": "Ishita Sharma",
          "email": "ishita.sharma@example.com",
          "password": "123",
          "batch": "2024",
          "branch": "Electrical Engineering",
          "dob": "2003-06-12",
          "phone": "9123456789",
          "address": "Mumbai, Maharashtra"
        },
        {
          "name": "Rohan Mehta",
          "email": "rohan.mehta@example.com",
          "password": "123",
          "batch": "2023",
          "branch": "Mechanical Engineering",
          "dob": "2001-12-30",
          "phone": "9988776655",
          "address": "Pune, Maharashtra"
        },
        {
          "name": "Ananya Verma",
          "email": "ananya.verma@example.com",
          "password": "123",
          "batch": "2025",
          "branch": "Civil Engineering",
          "dob": "2005-01-22",
          "phone": "9090901234",
          "address": "Lucknow, Uttar Pradesh"
        },
        {
          "name": "Kabir Singh",
          "email": "kabir.singh@example.com",
          "password": "123",
          "batch": "2023",
          "branch": "Information Technology",
          "dob": "2002-10-11",
          "phone": "9876512345",
          "address": "Chandigarh, India"
        },
        {
          "name": "Meera Nair",
          "email": "meera.nair@example.com",
          "password": "123",
          "batch": "2024",
          "branch": "Electronics and Communication",
          "dob": "2003-09-19",
          "phone": "9988002211",
          "address": "Kochi, Kerala"
        },
        {
          "name": "Aryan Choudhary",
          "email": "aryan.choudhary@example.com",
          "password": "123",
          "batch": "2023",
          "branch": "Chemical Engineering",
          "dob": "2001-08-15",
          "phone": "9876009876",
          "address": "Jaipur, Rajasthan"
        },
        {
          "name": "Pooja Iyer",
          "email": "pooja.iyer@example.com",
          "password": "123",
          "batch": "2025",
          "branch": "Biomedical Engineering",
          "dob": "2004-02-02",
          "phone": "9654321876",
          "address": "Bangalore, Karnataka"
        },
        {
          "name": "Aditya Pillai",
          "email": "aditya.pillai@example.com",
          "password": "123",
          "batch": "2023",
          "branch": "Aerospace Engineering",
          "dob": "2002-07-05",
          "phone": "9823456712",
          "address": "Thiruvananthapuram, Kerala"
        },
        {
          "name": "Tanya Kapoor",
          "email": "tanya.kapoor@example.com",
          "password": "123",
          "batch": "2024",
          "branch": "Computer Science",
          "dob": "2003-11-14",
          "phone": "9870005432",
          "address": "Delhi, India"
        }

      
  ];

  const faculties = [
    {
      "name": "Dr. Suresh Khanna",
      "email": "suresh.khanna@example.com",
      "password": "12345",
      "department": "Computer Science",
      "dob": "1978-05-12",
      "phone": "9812345678",
      "address": "Chennai, Tamil Nadu"
    },
    {
      "name": "Dr. Priya Menon",
      "email": "priya.menon@example.com",
      "password": "12345",
      "department": "Electronics and Communication",
      "dob": "1981-03-25",
      "phone": "9876543210",
      "address": "Mumbai, Maharashtra"
    },
    {
      "name": "Dr. Rajiv Patil",
      "email": "rajiv.patil@example.com",
      "password": "12345",
      "department": "Mechanical Engineering",
      "dob": "1975-08-18",
      "phone": "9123456789",
      "address": "Pune, Maharashtra"
    },
    {
      "name": "Dr. Kavita Reddy",
      "email": "kavita.reddy@example.com",
      "password": "12345",
      "department": "Civil Engineering",
      "dob": "1983-07-10",
      "phone": "9988776655",
      "address": "Hyderabad, Telangana"
    },
    {
      "name": "Dr. Arjun Iyer",
      "email": "arjun.iyer@example.com",
      "password": "12345",
      "department": "Information Technology",
      "dob": "1979-10-22",
      "phone": "9876543201",
      "address": "Bangalore, Karnataka"
    }
  ] ;

  if (!localStorage.getItem("students")) {
    localStorage.setItem("students", JSON.stringify(students));
  }
  if (!localStorage.getItem("faculties")) {
    localStorage.setItem("faculties", JSON.stringify(faculties));
  }
};


// Save new student data
export const addStudent = (student) => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
  };
  
  // Save new faculty data
  export const addFaculty = (faculty) => {
    const faculties = JSON.parse(localStorage.getItem("faculties")) || [];
    faculties.push(faculty);
    localStorage.setItem("faculties", JSON.stringify(faculties));
  };
  
  // Get all students
  export const getStudents = () => JSON.parse(localStorage.getItem("students")) || [];
  
  // Get all faculties
  export const getFaculties = () => JSON.parse(localStorage.getItem("faculties")) || [];
  
  // Update student password
  export const updateStudentPassword = (email, newPassword) => {
    const students = getStudents();
    const index = students.findIndex((student) => student.email === email);
    if (index >= 0) {
      students[index].password = newPassword;
      localStorage.setItem("students", JSON.stringify(students));
      return true;
    }
    return false;
  };
  
  // Update faculty password
  export const updateFacultyPassword = (email, newPassword) => {
    const faculties = getFaculties();
    const index = faculties.findIndex((faculty) => faculty.email === email);
    if (index >= 0) {
      faculties[index].password = newPassword;
      localStorage.setItem("faculties", JSON.stringify(faculties));
      return true;
    }
    return false;
  };
