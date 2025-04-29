import { useState } from "react";
import { useParams } from "react-router-dom"; // ✅ get facultyId from URL
import axios from "axios";

const LabSchedule = () => {
  const { facultyId } = useParams(); // ✅ /faculty/dashboard/:facultyId
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    semester: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, date, time, duration, semester } = formData;

    if (!title || !description || !date || !time || !duration || !semester) {
      alert("All fields are required!");
      return;
    }

    try {
      const schedule = new Date(`${date}T${time}`);

      console.log(schedule);
      console.log(facultyId);

      const labData = {
        title,
        description,
        semester,
        schedule,
        duration:Number(duration),
        createdBy: facultyId, // ✅ Inject from URL param
      };

      console.log(labData); 

      const response = await axios.post("/api/v1/labs/create",labData
        // {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      );

      console.log(response);

      if (response.data.success) {
        alert("Lab scheduled successfully!");
        setFormData({
          title: "",
          description: "",
          date: "",
          time: "",
          duration: "",
          semester: "",
        });
      } else {
        alert("Failed to schedule lab.");
      }
    } catch (error) {
      console.error("Lab schedule error:", error);
      alert("Error while scheduling lab.");
    }
  };

  return (
  <div className="min-h-screen bg-gray-100 p-6">
  <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Schedule a New Lab</h2>

    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
          placeholder="Enter Lab Name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
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
  </div>
</div>
);
};

export default LabSchedule;
