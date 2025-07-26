import React, { useState } from 'react';
import { QueryOutput } from '../types/api';

interface ResultCardProps {
  result: QueryOutput;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopiedField(fieldName);
      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    }
  };

  const CopyButton: React.FC<{ text: string; fieldName: string; size?: 'sm' | 'md' }> = ({ 
    text, 
    fieldName, 
    size = 'sm' 
  }) => (
    <button
      onClick={() => copyToClipboard(text, fieldName)}
      className={`btn btn-ghost btn-${size} btn-square tooltip tooltip-left`}
      data-tip={copiedField === fieldName ? "Copied!" : "Copy to clipboard"}
      aria-label={`Copy ${fieldName} to clipboard`}
    >
      {copiedField === fieldName ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-success"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      )}
    </button>
  );

  return (
    <div className="card bg-base-100 shadow-lg rounded-2xl">
      <div className="card-body p-6">
        <h2 className="card-title text-3xl font-bold text-primary flex items-center gap-3">
          <span role="img" aria-label="celebration">
            🎉
          </span>
          Your Search is Done!
        </h2>
        
        <div className="space-y-5">
          {/* LinkedIn Link Section */}
          <div className="bg-primary/10 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-base uppercase tracking-wide text-base-content/60">
                Try Your Search!
              </h3>
              <CopyButton text={result.example_link} fieldName="linkedin-link" />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={result.example_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-md rounded-lg gap-2 tooltip flex-1 sm:flex-none"
                aria-label="Open LinkedIn search in new tab"
                data-tip="Open your search on LinkedIn!"
              >
                <span role="img" aria-label="link">
                  🔗
                </span>
                Go to LinkedIn
              </a>
              <div className="text-xs text-base-content/60 bg-base-100 rounded-lg p-2 font-mono break-all">
                {result.example_link}
              </div>
            </div>
          </div>
          {/* Search Query Section */}
          <div className="bg-base-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-base uppercase tracking-wide text-base-content/60">
                Your Search Words
              </h3>
              <CopyButton text={result.raw_query} fieldName="search-query" />
            </div>
            <div className="relative group">
              <p className="font-mono text-base bg-base-100 p-4 rounded-lg border break-words">
                {result.raw_query}
              </p>
            </div>
          </div>


          {/* Collapsible Extra Details */}
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
                  <div className="flex items-center justify-between mb-2">
                    <strong>Special Code:</strong>
                    <CopyButton text={result.encoded} fieldName="encoded-query" />
                  </div>
                  <div className="relative">
                    <code className="block p-3 bg-base-100 rounded-lg text-sm break-words">
                      {result.encoded}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast notification for successful copy */}
        {copiedField && (
          <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Copied to clipboard!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;