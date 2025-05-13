import React, { useState, useEffect } from "react";

const PasswordStrengthIndicator = ({ password, setStrength }) => {
  const [strength, setLocalStrength] = useState("");
  const [strengthPercent, setStrengthPercent] = useState(0);

  useEffect(() => {
    const calculateStrength = (password) => {
      if (!password) return { label: "", percent: 0 };
      let score = 0;

      if (password.length >= 8) score += 1;
      if (password.match(/[A-Z]/)) score += 1;
      if (password.match(/[a-z]/)) score += 1;
      if (password.match(/[0-9]/)) score += 1;
      if (password.match(/[\W_]/)) score += 1; // Special character

      if (score <= 2) return { label: "Weak", percent: 25 };
      if (score === 3) return { label: "Medium", percent: 50 };
      if (score === 4) return { label: "Good", percent: 75 };
      return { label: "Strong", percent: 100 };
    };

    const { label, percent } = calculateStrength(password);
    setLocalStrength(label);
    setStrengthPercent(percent);
    if (setStrength) setStrength(label); // Pass strength back to parent component

  }, [password, setStrength]); // Updates when `password` changes

  return (
    <div className="mt-2">
      <div className="w-full bg-gray-300 rounded h-2 overflow-hidden">
        <div
          className={`h-2 ${
            strength === "Strong"
              ? "bg-green-500"
              : strength === "Good"
              ? "bg-blue-500"
              : strength === "Medium"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{ width: `${strengthPercent}%` }}
        ></div>
      </div>
      <p
        className={`mt-1 text-sm font-medium ${
          strength === "Strong"
            ? "text-green-600"
            : strength === "Good"
            ? "text-blue-600"
            : strength === "Medium"
            ? "text-yellow-600"
            : "text-red-600"
        }`}
      >
        Strength: {strength}
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;
