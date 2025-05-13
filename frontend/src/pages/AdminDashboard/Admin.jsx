import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

export default function AdminDashboard() {
  const { adminId } = useParams();
  const [view, setView] = useState('student');
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const studentRes = await axios.get('/api/v1/student/get-students');
      const facultyRes = await axios.get('/api/v1/faculty/get-faculties');
      const adminRes = await axios.get(`/api/v1/admin/${adminId}`);

      setStudents(studentRes.data.students || []);
      setFaculties(facultyRes.data.faculties || []);
      setAdmin(adminRes.data.admin);
    };
    fetchData();
  }, [adminId]);

  const handleApprove = async (id, type) => {
    const endpoint = type === 'student' ? `/api/v1/admin/approve-student/${id}` : `/api/v1/admin/approve-faculty/${id}`;
    await axios.patch(endpoint);
    setStudents(prev => prev.map(s => (s._id === id ? { ...s, isApproved: true } : s)));
    setFaculties(prev => prev.map(f => (f._id === id ? { ...f, isApproved: true } : f)));
  };

  const handleReject = async (id, type) => {
    const endpoint = type === 'student' ? `/api/v1/admin/delete-student/${id}` : `/api/v1/admin/delete-faculty/${id}`;
    await axios.delete(endpoint);
    setStudents(prev => prev.filter(s => !(s._id === id && type === 'student')));
    setFaculties(prev => prev.filter(f => !(f._id === id && type === 'faculty')));
  };

  const approvedCount = students.filter(s => s.isApproved).length;
  const pendingCount = students.filter(s => !s.isApproved).length;
  const approvedFacultyCount = faculties.filter(f => f.isApproved).length;
  const pendingFacultyCount = faculties.filter(f => !f.isApproved).length;
  const currentData = view === 'student' ? students : faculties;

  return (
    <div className="p-6 space-y-8">
      {admin && (
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-xl text-white shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold">Welcome, {admin.name}</h2>
          <p className="text-sm">Email: {admin.email}</p>
        </motion.div>
      )}

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold">Total Students</h3>
          <p className="text-2xl font-bold">{students.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
          <h3 className="text-lg font-semibold">Approved Students</h3>
          <p className="text-2xl font-bold">{approvedCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-500">
          <h3 className="text-lg font-semibold">Pending Student Approvals</h3>
          <p className="text-2xl font-bold">{pendingCount}</p>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold">Total Faculties</h3>
          <p className="text-2xl font-bold">{faculties.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
          <h3 className="text-lg font-semibold">Approved Faculties</h3>
          <p className="text-2xl font-bold">{approvedFacultyCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-500">
          <h3 className="text-lg font-semibold">Pending Faculty Approvals</h3>
          <p className="text-2xl font-bold">{pendingFacultyCount}</p>
        </div>
      </motion.div>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="space-x-2">
          <button
            onClick={() => setView('student')}
            className={`px-4 py-2 rounded-md border ${view === 'student' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
          >
            Students
          </button>
          <button
            onClick={() => setView('faculty')}
            className={`px-4 py-2 rounded-md border ${view === 'faculty' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
          >
            Faculties
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(currentData) && currentData.map((user) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-2xl shadow-md p-4 bg-white space-y-2">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-600">Email: {user.email}</p>
              <p className="text-sm text-gray-600">Approved: {user.isApproved ? 'Yes' : 'No'}</p>
              <div className="flex gap-2 pt-2">
                {!user.isApproved && (
                  <button
                    onClick={() => handleApprove(user._id, view)}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleReject(user._id, view)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
