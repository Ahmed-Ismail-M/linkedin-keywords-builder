import React from "react";
import { useQueryBuilder } from "../hooks/useQueryBuilder";
import InputSection from "./InputSection";
import ResultCard from "./ResultCard";
import HelpSection from "./HelpSection";
import ThemeSection from "./ThemeSection";

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
    <div className="min-h-screen  p-6">
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
