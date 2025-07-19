import React from 'react';
import { QueryOutput } from '../types/api';

interface ResultCardProps {
  result: QueryOutput;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => (
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title text-2xl flex items-center gap-2">
        <span role="img" aria-label="celebration">🎉</span>
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
            <span role="img" aria-label="link">🔗</span>
            Open LinkedIn Search
          </a>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" aria-label="Toggle technical details" />
          <div className="collapse-title font-medium">
            <span role="img" aria-label="nerd">🤓</span> Technical Details (for grown-ups)
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

export default ResultCard;