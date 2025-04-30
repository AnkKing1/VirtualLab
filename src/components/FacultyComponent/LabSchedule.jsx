import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const formItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const LabSchedule = () => {
  const { facultyId } = useParams();
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
      const labData = {
        title,
        description,
        semester,
        schedule,
        duration: Number(duration),
        createdBy: facultyId,
      };

      const response = await axios.post("/api/v1/labs/create", labData);

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
    <motion.div
      className="min-h-screen bg-gray-100 p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Schedule a New Lab
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            {
              label: "Title",
              name: "title",
              type: "text",
              placeholder: "Enter Lab Name",
            },
            {
              label: "Description",
              name: "description",
              type: "textarea",
              placeholder: "Enter Statement or Question",
              rows: 4,
            },
          ].map((field, index) => (
            <motion.div key={field.name} custom={index} variants={formItemVariants} initial="hidden" animate="visible">
              <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                  placeholder={field.placeholder}
                  rows={field.rows}
                  required
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                  placeholder={field.placeholder}
                  required
                />
              )}
            </motion.div>
          ))}

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            {["date", "time"].map((name, index) => (
              <motion.div key={name} custom={index + 2} variants={formItemVariants} initial="hidden" animate="visible">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </label>
                <input
                  type={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                  required
                />
              </motion.div>
            ))}
          </div>

          {/* Duration & Semester */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div custom={4} variants={formItemVariants} initial="hidden" animate="visible">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                placeholder="Enter duration"
                required
              />
            </motion.div>

            <motion.div custom={5} variants={formItemVariants} initial="hidden" animate="visible">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Semester</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                required
              >
                <option value="">Select Semester</option>
                {[...Array(8)].map((_, i) => {
                  const num = i + 1;
                  const suffix = 
                    num === 1 ? "st" :
                    num === 2 ? "nd" :
                    num === 3 ? "rd" : "th";

                  return (
                    <option key={num} value={`${num}${suffix}`}>
                      {num}{suffix} Semester
                    </option>
                  );
                })}
              </select>
            </motion.div>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Add Lab Schedule
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default LabSchedule;
