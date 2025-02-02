import React, { useState } from "react";

const ScheduleLab = () => {
  const [formData, setFormData] = useState({
    labName: "",
    batch: "",
    startTime: "",
    endTime: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Lab scheduled successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Schedule a New Lab</h2>
        <div className="mb-4">
          <label className="block mb-2">Lab Name</label>
          <input
            type="text"
            name="labName"
            value={formData.labName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Batch/Section</label>
          <select
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Batch</option>
            <option value="A">Batch A</option>
            <option value="B">Batch B</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Start Time</label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">End Time</label>
          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Lab Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Publish Lab
        </button>
      </form>
    </div>
  );
};

export default ScheduleLab;
