import { themes } from "@/config/themeConfigs";
import { ThemeBuilder } from "@/hooks/themeBuilder";
import React, { useEffect, useState, useRef } from "react";

const ThemeSection: React.FC = () => {
  const { theme, setTheme } = ThemeBuilder();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [previewTheme, setPreviewTheme] = useState<string | null>(null);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", previewTheme || theme);
  }, [theme, previewTheme]);

  // useEffect(() => {
  //   document.documentElement.setAttribute("data-theme", theme);
  // }, [theme]);

  // Filter themes based on search term
  const filteredThemes = themes.filter(
    (themeOption) =>
      themeOption.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      themeOption.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current theme details for display
  const currentTheme = themes.find((t) => t.name === theme);

  const handleThemeSelect = (themeName: string) => {
    setTheme(themeName);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleToggle = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    if (!nextOpen) {
      setSearchTerm("");
      setPreviewTheme(null); // revert preview
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
        setPreviewTheme(null); // revert preview
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <div
        onClick={handleToggle}
        className="btn btn-ghost btn-circle btn-lg hover:bg-base-200 transition-all duration-300 tooltip tooltip-left cursor-pointer"
        data-tip="Change colors!"
      >
        <div className="flex items-center justify-center">
          {currentTheme ? (
            <span className="text-2xl">{currentTheme.icon}</span>
          ) : (
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
          )}
        </div>
      </div>

      {/* Enhanced Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-base-100/95 backdrop-blur-md border border-base-300/50 rounded-xl shadow-2xl z-50">
          {/* Header with Search */}
          <div className="p-4 border-b border-base-300/30">
            <h3 className="font-semibold text-base-content mb-3">
              Choose Theme
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search themes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-sm input-bordered w-full pl-10 bg-base-200/50"
                autoFocus
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Scrollable Theme List */}
          <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
            {filteredThemes.length > 0 ? (
              <div className="p-2">
                {filteredThemes.map((themeOption) => (
                  <div
                    key={themeOption.name}
                    onClick={() => handleThemeSelect(themeOption.name)}
                    onMouseEnter={() => setPreviewTheme(themeOption.name)}
                    onMouseLeave={() => setPreviewTheme(null)}
                    className={`flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-all duration-200 cursor-pointer group ${
                      theme === themeOption.name
                        ? "bg-primary/20 text-primary font-semibold ring-2 ring-primary/30"
                        : "hover:scale-[1.02]"
                    }`}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                      {themeOption.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">
                        {themeOption.label}
                      </div>
                      <div className="text-xs text-base-content/60 truncate">
                        {themeOption.category}
                      </div>
                    </div>
                    {theme === themeOption.name && (
                      <svg
                        className="w-5 h-5 text-primary flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-base-content/60">
                <svg
                  className="w-12 h-12 mx-auto mb-3 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p>No themes found</p>
                <p className="text-sm">Try a different search term</p>
              </div>
            )}
          </div>

          {/* Footer with count */}
          <div className="p-3 border-t border-base-300/30 text-center">
            <p className="text-xs text-base-content/60">
              {filteredThemes.length} of {themes.length} themes
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSection;
