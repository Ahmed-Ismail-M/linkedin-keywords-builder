import { themes } from "@/config/themeConfigs";
import { themeBuilder } from "@/hooks/themeBuilder";
import React, { useEffect } from "react";

const ThemeSection: React.FC = () => {
  const { theme, setTheme } = themeBuilder();
   useEffect(() => {
    // Set data-theme attribute dynamically
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <div className="dropdown ">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle hover:bg-white/50 transition-all duration-300"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100/95 backdrop-blur-md border border-base-300/50 rounded-2xl w-56"
      >
        {themes.map((themeOption) => (
          <li key={themeOption.name}>
            <a
              onClick={() => setTheme(themeOption.name)}
              className={`flex items-center gap-3 hover:bg-primary/10 transition-all duration-200 ${
                theme === themeOption.name
                  ? "bg-primary/20 text-primary font-semibold"
                  : ""
              }`}
            >
              <span className="text-lg">{themeOption.icon}</span>
              {themeOption.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSection;
