import React from "react";
import { useQueryBuilder } from "../hooks/useQueryBuilder";
import InputSection from "./InputSection";
import ResultCard from "./ResultCard";
import HelpSection from "./HelpSection";
import ThemeSection from "./ThemeSection";
import { LanguageSwitcher } from "./LanguageSwitcher";

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
<div className="min-h-screen px-4 sm:px-6 py-6">
  {/* Theme Button */}
  <LanguageSwitcher variant="dropdown" size="sm" />
  <div className="fixed top-2 end-2 sm:top-4 sm:end-2 z-50">
    <ThemeSection />
  </div>

  <div className="max-w-4xl mx-auto w-full">
    {/* Header */}
    <header className="text-center mb-10">
      <h1 className="text-2xl sm:text-5xl font-extrabold text-primary mb-4 flex items-center justify-center gap-3 animate-fade-in">
        <span role="img" aria-label="magnifying glass">🔍</span> LinkedIn Job Search!
      </h1>
      <p className="text-base sm:text-xl text-base-content/70 max-w-full sm:max-w-2xl mx-auto leading-relaxed">
        Easily add your must-have skills and desired roles to find relevant opportunities on LinkedIn.
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
      <div className="alert alert-error rounded-lg mb-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          <span role="img" aria-label="error">⚠️</span> {error}
        </div>
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
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              <span className="loading loading-spinner" aria-hidden="true"></span>
              Building...
            </>
          ) : (
            <>
              <span role="img" aria-label="rocket">🚀</span>
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
            <span role="img" aria-label="reset">🔄</span>
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
