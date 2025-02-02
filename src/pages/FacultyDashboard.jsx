import React from "react";
import FacultyNavbar from "../components/Dashboard/FacultyNavbar";
import { Link } from "react-router-dom";
const FacultyDashboard = () => {
  return (
    <div>
        <FacultyNavbar/>
    
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Welcome Message */}
      <h1 className="text-3xl font-bold mb-6">Welcome, Faculty!</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow flex items-center">
          <div className="text-3xl font-bold text-blue-600 mr-4">3</div>
          <div>
            <h3 className="text-lg font-semibold">Active Classes</h3>
            <p className="text-sm text-gray-600">Manage your ongoing courses.</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow flex items-center">
          <div className="text-3xl font-bold text-green-600 mr-4">2</div>
          <div>
            <h3 className="text-lg font-semibold">Upcoming Lab Sessions</h3>
            <p className="text-sm text-gray-600">Prepare for scheduled labs.</p>
          </div>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow flex items-center">
          <div className="text-3xl font-bold text-yellow-600 mr-4">5</div>
          <div>
            <h3 className="text-lg font-semibold">Assignments Graded</h3>
            <p className="text-sm text-gray-600">Review recent submissions.</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <ul className="space-y-3">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
              <span className="text-gray-700">Maintenance scheduled for 10/30 at 2 PM.</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
              <span className="text-gray-700">New lab resources uploaded to Class A.</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-4"></div>
              <span className="text-gray-700">Reminder: Grading deadline is 10/31.</span>
            </li>
          </ul>
        </div>
        
      </section>

      {/* Class Summary */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Class Summary</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 p-2 text-left">Class Name</th>
                <th className="border border-gray-200 p-2 text-left">Students</th>
                <th className="border border-gray-200 p-2 text-left">Lab Sessions</th>
                <th className="border border-gray-200 p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 p-2">Class A</td>
                <td className="border border-gray-200 p-2">30</td>
                <td className="border border-gray-200 p-2">5</td>
                <td className="border border-gray-200 p-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-2">Class B</td>
                <td className="border border-gray-200 p-2">25</td>
                <td className="border border-gray-200 p-2">3</td>
                <td className="border border-gray-200 p-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-2">Class C</td>
                <td className="border border-gray-200 p-2">20</td>
                <td className="border border-gray-200 p-2">4</td>
                <td className="border border-gray-200 p-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
    </div>
  );
};

export default FacultyDashboard;
