// LabSchedule.js
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LabScheduleContext } from "../../context/LabScheduleContext";

const LabSchedule = () => {
  const { scheduledLabs, addLab } = useContext(LabScheduleContext);

  const [formData, setFormData] = useState({
    labName: "",
    statement: "",
    date: "",
    time: "",
    duration: "",
    semester: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { labName, statement, date, time, duration, semester } = formData;
    
    if (!labName || !statement || !date || !time || !duration || !semester) {
      alert("All fields are required!");
      return;
    }

    const newLab = {
      ...formData,
      id: Date.now(),
    };
    addLab(newLab);

    setFormData({
      labName: "",
      statement: "",
      date: "",
      time: "",
      duration: "",
      semester: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Schedule a New Lab</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Lab Name</label>
            <input
              type="text"
              name="labName"
              value={formData.labName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
              placeholder="Enter Lab Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Statement/Question</label>
            <textarea
              name="statement"
              value={formData.statement}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
              placeholder="Enter Statement or Question"
              rows="4"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                placeholder="Enter duration in minutes"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Semester</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                required
              >
                <option value="">Select Semester</option>
                <option value="1st">1st Semester</option>
                <option value="2nd">2nd Semester</option>
                <option value="3rd">3rd Semester</option>
                <option value="4th">4th Semester</option>
                <option value="5th">5th Semester</option>
                <option value="6th">6th Semester</option>
                <option value="7th">7th Semester</option>
                <option value="8th">8th Semester</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Add Lab Schedule
          </button>
        </form>

        {scheduledLabs.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Scheduled Labs</h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Lab Name</th>
                    <th className="border border-gray-300 px-4 py-2">Statement</th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Time</th>
                    <th className="border border-gray-300 px-4 py-2">Duration</th>
                    <th className="border border-gray-300 px-4 py-2">Semester</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledLabs.map((schedule, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">{schedule.labName}</td>
                      <td className="border border-gray-300 px-4 py-2">{schedule.statement}</td>
                      <td className="border border-gray-300 px-4 py-2">{schedule.date}</td>
                      <td className="border border-gray-300 px-4 py-2">{schedule.time}</td>
                      <td className="border border-gray-300 px-4 py-2">{schedule.duration} mins</td>
                      <td className="border border-gray-300 px-4 py-2">{schedule.semester}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default LabSchedule;
