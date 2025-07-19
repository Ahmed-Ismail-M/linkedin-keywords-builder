import React from 'react';
import { QueryOutput } from '../types/api';

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

export default ResultCard;