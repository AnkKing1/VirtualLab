import React from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Overview Panel */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Metrics Cards */}
          {[
            { title: "Total Users", count: 1200 },
            { title: "Active Labs", count: 35 },
            { title: "Pending Approvals", count: 15 },
            { title: "Notifications", count: 7 },
          ].map((metric, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-lg p-4 text-center"
            >
              <h3 className="text-lg font-semibold">{metric.title}</h3>
              <p className="text-3xl font-bold text-indigo-600">{metric.count}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* User Management */}
      <section>
        <h2 className="text-2xl font-bold mb-4">User Management</h2>

        {/* Tabs for Pending Requests and Registered Users */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <div className="flex space-x-4 border-b border-gray-200 mb-4">
            <button className="text-indigo-600 font-semibold border-b-2 border-indigo-600 py-2">
              Pending Requests
            </button>
            <button className="text-gray-600 hover:text-indigo-600 py-2">
              Registered Users
            </button>
          </div>

          {/* Pending Requests Table */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Pending Approvals</h3>
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Role</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[{ name: "John Doe", role: "Student", email: "john@example.com" }].map(
                  (user, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border">{user.name}</td>
                      <td className="px-4 py-2 border">{user.role}</td>
                      <td className="px-4 py-2 border">{user.email}</td>
                      <td className="px-4 py-2 border">
                        <button className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600">
                          Approve
                        </button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                          Reject
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
