import { useState } from "react";

export const toggleVisibilityHelper = () => {
  const [showPass, setShowPass] = useState("Показати");
  const [visibility, setVisibility] = useState(true);

  const toggleVisibility = () => {
    if (showPass === "Показати") {
      setShowPass("Сховати");
      setVisibility(!visibility);
    } else if (showPass === "Сховати") {
      setShowPass("Показати");
      setVisibility(!visibility);
    }
  };
  return {
    showPass,
    visibility,
    toggleVisibility,
  };
};
