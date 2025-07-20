import { themes } from "@/config/themeConfigs";
import { ThemeBuilder } from "@/hooks/themeBuilder";
import React, { useEffect } from "react";

const ThemeSection: React.FC = () => {
  const { theme, setTheme } = ThemeBuilder();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle btn-lg hover:bg-base-200 transition-all duration-300 tooltip"
        data-tip="Change colors!"
      >
        <svg
          className="w-6 h-6"
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
        className="dropdown-content menu p-3 shadow-lg bg-base-100/95 backdrop-blur-md border border-base-300/50 rounded-xl w-60"
      >
        {themes.map((themeOption) => (
          <li key={themeOption.name}>
            <a
              onClick={() => setTheme(themeOption.name)}
              className={`flex items-center gap-3 p-2 rounded-lg hover:bg-primary/10 transition-all duration-200 text-base ${
                theme === themeOption.name
                  ? "bg-primary/20 text-primary font-bold"
                  : ""
              }`}
            >
              <span className="text-xl">{themeOption.icon}</span>
              {themeOption.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSection;
