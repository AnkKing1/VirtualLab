import { useState } from "react";
import { Link } from "react-router-dom";

const LabSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    labName: "",
    statement: "",
    date: "",
    time: "",
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.labName ||
      !formData.statement ||
      !formData.date ||
      !formData.time ||
      !formData.duration
    ) {
      alert("All fields are required!");
      return;
    }
    setSchedules([...schedules, formData]);
    setFormData({
      labName: "",
      statement: "",
      date: "",
      time: "",
      duration: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Lab Scheduling
        </h2>

        {/* Form for scheduling a lab */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Lab Name
            </label>
            <input
              type="text"
              name="labName"
              value={formData.labName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              placeholder="Enter Lab Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Statement/Question
            </label>
            <textarea
              name="statement"
              value={formData.statement}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              placeholder="Enter Statement or Question"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Duration (minutes)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              placeholder="Enter duration in minutes"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Add Schedule
          </button>
        </form>

        {/* Display Scheduled Labs
        {schedules.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Scheduled Labs</h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Lab Name</th>
                    <th className="border border-gray-300 px-4 py-2">Statement</th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Time</th>
                    <th className="border border-gray-300 px-4 py-2">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((schedule, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">{schedule.labName}</td>
                      <td className="border border-gray-300 px-4 py-2">{schedule.statement}</td>
                      <td className="border border-gray-300 px-4 py-2">{schedule.date}</td>
                      <td className="border border-gray-300 px-4 py-2">{schedule.time}</td>
                      <td className="border border-gray-300 px-4 py-2">{schedule.duration} mins</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-4">
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default LabSchedule;
