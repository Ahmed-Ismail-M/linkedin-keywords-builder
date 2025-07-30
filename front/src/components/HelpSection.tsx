import { useTranslation } from "@/hooks/useTranslation";
import React from "react";
const HelpSection: React.FC = () => {
  const { t, isRTL } = useTranslation();

  return (
    <div className="mt-6 card bg-info/10 border border-info/20 rounded-2xl shadow-md mx-2 sm:mx-4">
      <div className="card-body p-4 sm:p-6">
        <h3 className={`card-title text-xl sm:text-2xl font-bold text-info flex items-center gap-3 mb-4 ${
          isRTL ? 'flex-row-reverse' : ''
        }`}>
          <span
            role="img"
            aria-label={isRTL ? "مصباح" : "lightbulb"}
            className="text-2xl sm:text-3xl"
          >
            💡
          </span>
          {t('howToUseThis')}
        </h3>
        <div className="space-y-3 text-sm sm:text-base">
          <p className={`flex flex-col sm:flex-row items-start gap-2 ${
            isRTL ? 'sm:flex-row-reverse text-right' : ''
          }`}>
            <span className="badge badge-success badge-md sm:badge-lg w-fit">
              {t('mustHaveSkills')}
            </span>
            <span>{t('mustHaveSkillsDesc')}</span>
          </p>
          <p className={`flex flex-col sm:flex-row items-start gap-2 ${
            isRTL ? 'sm:flex-row-reverse text-right' : ''
          }`}>
            <span className="badge badge-warning badge-md sm:badge-lg w-fit">
              {t('niceToHaveExtras')}
            </span>
            <span>{t('niceToHaveExtrasDesc')}</span>
          </p>
          <p className={`flex flex-col sm:flex-row items-start gap-2 ${
            isRTL ? 'sm:flex-row-reverse text-right' : ''
          }`}>
            <span className="badge badge-error badge-md sm:badge-lg w-fit">
              {t('notInterested')}
            </span>
            <span>{t('notInterestedDesc')}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;