import React, { useEffect, useState } from "react";

const useToggle = (initialValue=true) => {
  const [isOn, setIsOn] = useState(initialValue);

  useEffect(() => {
    const saveTheme = localStorage.getItem("My-Theme");

    if (saveTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsOn(true);
    }
  }, []);

  const toggle = () => {
    if (isOn) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("My-Theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("My-Theme", "dark");
    }
    setIsOn(!isOn);
  };

  return [isOn, toggle];
};

export default useToggle;
