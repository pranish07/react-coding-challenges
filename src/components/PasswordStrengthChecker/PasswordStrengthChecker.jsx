import { useState } from "react";
import "./PasswordStrengthChecker.css";

export const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [passwordStatus, setPasswordStatus] = useState("");

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    calculateStrength(newPassword);
  };

  const calculateStrength = (password) => {
    let strength = 0;

    // Check password length
    if (password.length >= 6 && password.length <= 32) {
      strength += Math.min(password.length / 4, 3);
    } else if (password.length < 3) {
      strength = 0;
    }

    // Check for character types
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    // Ensure max strength is 10
    strength = Math.min(strength, 10);

    setStrength(strength);
    setPasswordStatus(getPasswordStatus(strength));
  };

  const getPasswordStatus = (strength) => {
    if (strength > 8) return "Strong";
    if (strength > 6 && strength <= 8) return "Moderate";
    if (strength > 3 && strength <= 6) return "Weak";
    return "Very Weak";
  };

  const getStatusColor = () => {
    switch (passwordStatus) {
      case "Strong":
        return "green";
      case "Moderate":
        return "orange";
      case "Weak":
        return "red";
      default:
        return "darkred";
    }
  };

  return (
    <section className="password-section">
      <h1 className="password-heading">Password Strength Checker</h1>
      <input
        type="text"
        value={password}
        onChange={handlePasswordChange}
        className="password-input-text"
        placeholder="Enter your password"
      />
      <progress value={strength} max="10" className="progress-bar"/>
      <p>Strength of our password(out of 10) is {strength}</p>
      <p style={{ color: getStatusColor() }}>{passwordStatus}</p>
    </section>
  );
};
