import React from 'react';

const HelpSection: React.FC = () => (
  <div className="mt-12 card bg-info bg-opacity-10 border border-info border-opacity-20">
    <div className="card-body">
      <h3 className="card-title text-lg flex items-center gap-2">
        <span role="img" aria-label="lightbulb">💡</span>
        How it works
      </h3>
      <div className="text-sm space-y-2">
        <p><strong>Must Have:</strong> All these words will be in every result</p>
        <p><strong>Nice to Have:</strong> Results might have any of these words</p>
        <p><strong>Don't Want:</strong> Results will never have these words</p>
      </div>
    </div>
  </div>
);

export default HelpSection;