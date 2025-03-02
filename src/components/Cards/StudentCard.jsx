import React from "react";

const StudentCard = ({ name, registrationNumber }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-500">Reg No: <span className="font-medium">{registrationNumber}</span></p>
    </div>
  );
};

export default StudentCard;
