import { useState } from "react";

export const ThemeBuilder = () => {
  const [theme, setTheme] = useState("lofi");

  return { theme, setTheme };
};
