import { useState } from "react";

export const themeBuilder = () => {
  const [theme, setTheme] = useState("lofi");

  return { theme, setTheme };
};
