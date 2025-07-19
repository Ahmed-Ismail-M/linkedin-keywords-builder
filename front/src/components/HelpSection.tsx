import React from "react";

const HelpSection: React.FC = () => (
  <div className="mt-6 card bg-info/10 border border-info/20 rounded-2xl shadow-md mx-2 sm:mx-4">
    <div className="card-body p-4 sm:p-6">
      <h3 className="card-title text-xl sm:text-2xl font-bold text-info flex items-center gap-3 mb-4">
        <span
          role="img"
          aria-label="lightbulb"
          className="text-2xl sm:text-3xl"
        >
          💡
        </span>
        How to Use This!
      </h3>
      <div className="space-y-3 text-sm sm:text-base">
        <p className="flex flex-col sm:flex-row items-start gap-2">
          <span className="badge badge-success badge-md sm:badge-lg w-fit">
            Must-Have Skills
          </span>
          <span>These skills are in ALL your job results!</span>
        </p>
        <p className="flex flex-col sm:flex-row items-start gap-2">
          <span className="badge badge-warning badge-md sm:badge-lg w-fit">
            Nice-to-Have Extras
          </span>
          <span>Some of these extras might show up!</span>
        </p>
        <p className="flex flex-col sm:flex-row items-start gap-2">
          <span className="badge badge-error badge-md sm:badge-lg w-fit">
            Not Interested
          </span>
          <span>These won’t appear in your job results!</span>
        </p>
      </div>
    </div>
  </div>
);

export default HelpSection;
