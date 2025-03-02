import React, { useState, useEffect } from "react";

const PasswordStrengthIndicator = ({ password }) => {
  const [strength, setStrength] = useState("");

  useEffect(() => {
    const calculateStrength = (password) => {
      if (!password) return "";
      if (password.length < 6) return "Weak";
      if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8) {
        return "Strong";
      }
      return "Medium";
    };

    setStrength(calculateStrength(password));
  }, [password]); // Recalculate whenever `password` changes

  return (
    <div className="mt-1 text-sm">
      <p className={strength === "Strong" ? "text-green-600" : strength === "Medium" ? "text-yellow-600" : "text-red-600"}>
        Strength: {strength}
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;
