// import { useContext } from "react";
// import { useParams } from "react-router-dom";
// import { LabScheduleContext } from "../../context/LabScheduleContext";

// const LabDetails = () => {
//   const { id } = useParams(); // Extract ID from URL
//   console.log(String(id))
//   const { scheduledLabs } = useContext(LabScheduleContext);

//   // Find the lab matching the current ID
//   const lab = scheduledLabs.find((lab) => lab.id.toString() === id);

//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg">
//       {lab ? (
//         <div>
//           <h2 className="text-xl font-bold text-gray-800">{lab.labName}</h2>
//           <p className="text-gray-600">{lab.statement}</p>
//           <div className="mt-2 p-2 bg-gray-100 rounded">
//             <strong>Date:</strong> {lab.date} <br />
//             <strong>Time:</strong> {lab.time} <br />
//             <strong>Duration:</strong> {lab.duration} mins
//           </div>
//         </div>
//       ) : (
//         <p className="text-red-500">No lab details found.</p>
//       )}
//     </div>
//   );
// };

// export default LabDetails;
import React from 'react'

const LabDetails = () => {
  return (
    <div>LabDetails</div>
  )
}

export default LabDetails
