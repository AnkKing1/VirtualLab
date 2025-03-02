import React from "react";

const LabCard = ({ labTitle, language, date, time }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">{labTitle}</h3>
      <p className="text-sm text-gray-500">Language: <span className="font-medium">{language}</span></p>
      <div className="flex justify-between items-center mt-2 text-gray-600 text-sm">
        <p>{date}</p>
        <p>{time}</p>
      </div>
    </div>
  );
};

export default LabCard;
