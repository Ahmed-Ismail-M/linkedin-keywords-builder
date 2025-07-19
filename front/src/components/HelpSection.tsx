import React from "react";

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

export default HelpSection;
