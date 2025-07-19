import React, { useEffect } from "react";
import { SectionType, QueryOutput } from "../types/api";
import { sectionConfigs } from "../config/sectionConfigs";
import { themeBuilder } from "../hooks/themeBuilder";
import { useQueryBuilder } from "../hooks/useQueryBuilder";
import { themes } from "@/config/themeConfigs";

// HelpSection Component
const HelpSection: React.FC = () => (
  <div className="mt-8 card bg-info/10 border border-info/20 rounded-2xl shadow-md">
    <div className="card-body p-6">
      <h3 className="card-title text-2xl font-bold text-info flex items-center gap-3">
        <span role="img" aria-label="lightbulb">
          💡
        </span>
        How to Use This!
      </h3>
      <div className="space-y-4 text-base">
        <p className="flex items-start gap-2">
          <span className="badge badge-success badge-lg">Must Have</span>
          <span>These words are in ALL your results!</span>
        </p>
        <p className="flex items-start gap-2">
          <span className="badge badge-warning badge-lg">Nice to Have</span>
          <span>Results might have SOME of these words!</span>
        </p>
        <p className="flex items-start gap-2">
          <span className="badge badge-error badge-lg">Don't Want</span>
          <span>These words won't show up in results!</span>
        </p>
      </div>
    </div>
  </div>
);

// InputSection Component
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
      className={`card bg-${config.color}/10 border border-${config.color}/20 rounded-2xl shadow-md`}
    >
      <div className="card-body p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl" role="img" aria-label={config.title}>
            {config.icon}
          </span>
          <h3 className="card-title text-2xl font-bold text-{config.color}">
            {config.title}
          </h3>
        </div>
        <p className="text-base text-base-content/70 mb-4">
          {config.description}
        </p>

        <div className="space-y-3">
          {list.map((item, index) => (
            <div key={`${type}-${index}`} className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Type a word..."
                className="input input-bordered input-md flex-1 text-base rounded-lg"
                value={item}
                onChange={(e) => onUpdateItem(setter, index, e.target.value)}
                aria-label={`${config.title} word ${index + 1}`}
              />
              {list.length > 1 && (
                <button
                  className="btn btn-error btn-circle btn-md hover:bg-error/80"
                  onClick={() => onRemoveItem(list, setter, index)}
                  aria-label={`Remove ${config.title} word ${index + 1}`}
                  type="button"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            className={`btn btn-${config.color} btn-md rounded-lg gap-2 mt-4 tooltip`}
            onClick={() => onAddItem(setter)}
            type="button"
            aria-label={`Add another ${config.title} word`}
            data-tip="Add another word!"
          >
            <span className="text-xl">+</span>
            Add More
          </button>
        </div>
      </div>
    </div>
  );
};

// ResultCard Component
interface ResultCardProps {
  result: QueryOutput;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => (
  <div className="card bg-base-100 shadow-lg rounded-2xl">
    <div className="card-body p-6">
      <h2 className="card-title text-3xl font-bold text-primary flex items-center gap-3">
        <span role="img" aria-label="celebration">
          🎉
        </span>
        Your Search is Done!
      </h2>

      <div className="space-y-5">
        <div className="bg-base-200 rounded-lg p-5">
          <h3 className="font-semibold text-base uppercase tracking-wide text-base-content/60 mb-3">
            Your Search Words
          </h3>
          <p className="font-mono text-base bg-base-100 p-4 rounded-lg border break-words">
            {result.raw_query}
          </p>
        </div>

        <div className="bg-primary/10 rounded-lg p-5">
          <h3 className="font-semibold text-base uppercase tracking-wide text-base-content/60 mb-3">
            Try Your Search!
          </h3>
          <a
            href={result.example_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-md rounded-lg gap-2 tooltip"
            aria-label="Open LinkedIn search in new tab"
            data-tip="Open your search on LinkedIn!"
          >
            <span role="img" aria-label="link">
              🔗
            </span>
            Go to LinkedIn
          </a>
        </div>

        <div className="collapse collapse-arrow bg-base-200 rounded-lg">
          <input type="checkbox" aria-label="Toggle extra details" />
          <div className="collapse-title font-semibold text-base flex items-center gap-2">
            <span role="img" aria-label="nerd">
              🤓
            </span>
            Extra Details
          </div>
          <div className="collapse-content p-4">
            <div className="space-y-3">
              <div>
                <strong>Special Code:</strong>
                <code className="block mt-2 p-3 bg-base-100 rounded-lg text-sm break-words">
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

// ThemeSection Component
const ThemeSection: React.FC = () => {
  const { theme, setTheme } = themeBuilder();
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

// QueryBuilder Component
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="fixed top-4 right-4 z-50">
        <ThemeSection />
      </div>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-primary mb-3 flex items-center justify-center gap-3">
            <span role="img" aria-label="magnifying glass">
              🔍
            </span>
            Fun Search Maker
          </h1>
          <p className="text-xl text-base-content/70">
            Pick words to find what you want. It's super easy!
          </p>
        </header>

        {/* Form */}
        <div className="space-y-6 mb-10">
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
          <div className="alert alert-error rounded-lg mb-6 shadow-md">
            <span role="img" aria-label="error">
              ⚠️
            </span>
            <span>{error}</span>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => window.location.reload()}
              aria-label="Retry"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center mb-10">
          <div className="flex gap-4 justify-center">
            <button
              className="btn btn-primary btn-lg rounded-lg gap-3 tooltip"
              onClick={handleSubmit}
              disabled={loading || isSubmitDisabled}
              type="button"
              aria-label="Create search query"
              data-tip="Make your search now!"
            >
              {loading ? (
                <>
                  <span
                    className="loading loading-spinner"
                    aria-hidden="true"
                  ></span>
                  Building...
                </>
              ) : (
                <>
                  <span role="img" aria-label="rocket">
                    🚀
                  </span>
                  Make My Search!
                </>
              )}
            </button>

            {result && (
              <button
                className="btn btn-outline btn-lg rounded-lg gap-3 tooltip"
                onClick={resetForm}
                type="button"
                aria-label="Start over"
                data-tip="Start a new search!"
              >
                <span role="img" aria-label="reset">
                  🔄
                </span>
                Try Again
              </button>
            )}
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

export default QueryBuilder;
