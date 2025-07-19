import React, { useEffect } from "react";

const HelpSection: React.FC = () => (
  <div className="mt-12 card bg-info bg-opacity-10 border border-info border-opacity-20">
    <div className="card-body">
      <h3 className="card-title text-lg flex items-center gap-2">
        <span role="img" aria-label="lightbulb">
          💡
        </span>
        How it works
      </h3>
      <div className="text-sm space-y-2">
        <p>
          <strong>Must Have:</strong> All these words will be in every result
        </p>
        <p>
          <strong>Nice to Have:</strong> Results might have any of these words
        </p>
        <p>
          <strong>Don't Want:</strong> Results will never have these words
        </p>
      </div>
    </div>
  </div>
);

import { SectionType } from "../types/api";
import { sectionConfigs } from "../config/sectionConfigs";

interface InputSectionProps {
  type: SectionType;
  list: string[];
  setter: React.Dispatch<React.SetStateAction<string[]>>;
  onAddItem: (setter: React.Dispatch<React.SetStateAction<string[]>>) => void;
  onRemoveItem: (
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => void;
  onUpdateItem: (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  type,
  list,
  setter,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
}) => {
  const config = sectionConfigs[type];

  return (
    <div
      className={`card bg-${config.color} bg-opacity-10 border border-${config.color} border-opacity-20`}
    >
      <div className="card-body p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl" role="img" aria-label={config.title}>
            {config.icon}
          </span>
          <h3 className="card-title text-lg">{config.title}</h3>
        </div>
        <p className="text-sm opacity-70 mb-3">{config.description}</p>

        <div className="space-y-2">
          {list.map((item, index) => (
            <div key={`${type}-${index}`} className="flex gap-2">
              <input
                type="text"
                placeholder="Type here..."
                className="input input-bordered input-sm flex-1"
                value={item}
                onChange={(e) => onUpdateItem(setter, index, e.target.value)}
                aria-label={`${config.title} item ${index + 1}`}
              />
              {list.length > 1 && (
                <button
                  className="btn btn-ghost btn-sm btn-circle text-error hover:bg-error hover:text-error-content"
                  onClick={() => onRemoveItem(list, setter, index)}
                  aria-label={`Remove ${config.title} item ${index + 1}`}
                  type="button"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            className={`btn btn-${config.color} btn-outline btn-sm gap-1`}
            onClick={() => onAddItem(setter)}
            type="button"
            aria-label={`Add another ${config.title} item`}
          >
            <span className="text-lg">+</span>
            Add another
          </button>
        </div>
      </div>
    </div>
  );
};

import { QueryOutput } from "../types/api";

interface ResultCardProps {
  result: QueryOutput;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => (
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title text-2xl flex items-center gap-2">
        <span role="img" aria-label="celebration">
          🎉
        </span>
        Your Search is Ready!
      </h2>

      <div className="space-y-4">
        <div className="bg-base-200 rounded-lg p-4">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-base-content opacity-60 mb-2">
            Search Query
          </h3>
          <p className="font-mono text-sm break-all bg-base-100 p-3 rounded border">
            {result.raw_query}
          </p>
        </div>

        <div className="bg-primary bg-opacity-10 rounded-lg p-4">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-base-content opacity-60 mb-2">
            Try It Out!
          </h3>
          <a
            href={result.example_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary gap-2"
            aria-label="Open LinkedIn search in new tab"
          >
            <span role="img" aria-label="link">
              🔗
            </span>
            Open LinkedIn Search
          </a>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" aria-label="Toggle technical details" />
          <div className="collapse-title font-medium">
            <span role="img" aria-label="nerd">
              🤓
            </span>{" "}
            Technical Details (for grown-ups)
          </div>
          <div className="collapse-content">
            <div className="space-y-2">
              <div>
                <strong>Encoded:</strong>
                <code className="block mt-1 p-2 bg-base-100 rounded text-xs break-all">
                  {result.encoded}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

import { themes } from "@/config/themeConfigs";
import { themeBuilder } from "@/hooks/themeBuilder";

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

import { useQueryBuilder } from "../hooks/useQueryBuilder";

const QueryBuilder: React.FC = () => {
  const {
    mustHave,
    optionalOr,
    exclude,
    result,
    loading,
    error,
    setMustHave,
    setOptionalOr,
    setExclude,
    addItem,
    removeItem,
    updateItem,
    handleSubmit,
    resetForm,
    isSubmitDisabled,
  } = useQueryBuilder();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <ThemeSection />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            <span role="img" aria-label="magnifying glass">
              🔍
            </span>{" "}
            Smart Search Builder
          </h1>
          <p className="text-lg text-base-content opacity-70">
            Tell me what you want to find, and I'll help you build the perfect
            search!
          </p>
        </header>

        {/* Form */}
        <div>
          <div className="grid gap-6 mb-8">
            <InputSection
              type="mustHave"
              list={mustHave}
              setter={setMustHave}
              onAddItem={addItem}
              onRemoveItem={removeItem}
              onUpdateItem={updateItem}
            />
            <InputSection
              type="optionalOr"
              list={optionalOr}
              setter={setOptionalOr}
              onAddItem={addItem}
              onRemoveItem={removeItem}
              onUpdateItem={updateItem}
            />
            <InputSection
              type="exclude"
              list={exclude}
              setter={setExclude}
              onAddItem={addItem}
              onRemoveItem={removeItem}
              onUpdateItem={updateItem}
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="alert alert-error mb-4">
              <span role="img" aria-label="error">
                ⚠️
              </span>
              <span>{error}</span>
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center mb-8">
            <div className="flex gap-4 justify-center">
              <button
                className="btn btn-primary btn-lg gap-2"
                onClick={handleSubmit}
                disabled={loading || isSubmitDisabled}
                type="button"
                aria-label="Create search query"
              >
                {loading ? (
                  <>
                    <span
                      className="loading loading-spinner"
                      aria-hidden="true"
                    ></span>
                    Building your search...
                  </>
                ) : (
                  <>
                    <span role="img" aria-label="rocket">
                      🚀
                    </span>
                    Create My Search!
                  </>
                )}
              </button>

              {result && (
                <button
                  className="btn btn-outline btn-lg"
                  onClick={resetForm}
                  type="button"
                  aria-label="Start over"
                >
                  <span role="img" aria-label="reset">
                    🔄
                  </span>
                  Start Over
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        {result && <ResultCard result={result} />}

        {/* Help */}
        <HelpSection />
      </div>
    </div>
  );
};
