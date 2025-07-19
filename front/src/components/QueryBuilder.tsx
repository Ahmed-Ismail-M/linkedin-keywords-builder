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

export default QueryBuilder;
