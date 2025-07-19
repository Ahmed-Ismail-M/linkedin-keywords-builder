import React from 'react';
import { SectionType } from '../types/api';
import { sectionConfigs } from '../config/sectionConfigs';

interface InputSectionProps {
  type: SectionType;
  list: string[];
  setter: React.Dispatch<React.SetStateAction<string[]>>;
  onAddItem: (setter: React.Dispatch<React.SetStateAction<string[]>>) => void;
  onRemoveItem: (list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => void;
  onUpdateItem: (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  type,
  list,
  setter,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
}) => {
  const config = sectionConfigs[type];

  return (
    <div
      className={`card bg-${config.color}/10 border border-${config.color}/20 rounded-2xl shadow-md`}
    >
      <div className="card-body p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl" role="img" aria-label={config.title}>
            {config.icon}
          </span>
          <h3 className="card-title text-2xl font-bold text-{config.color}">
            {config.title}
          </h3>
        </div>
        <p className="text-base text-base-content/70 mb-4">
          {config.description}
        </p>

        <div className="space-y-3">
          {list.map((item, index) => (
            <div key={`${type}-${index}`} className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Type a word..."
                className="input input-bordered input-md flex-1 text-base rounded-lg"
                value={item}
                onChange={(e) => onUpdateItem(setter, index, e.target.value)}
                aria-label={`${config.title} word ${index + 1}`}
              />
              {list.length > 1 && (
                <button
                  className="btn btn-error btn-circle btn-md hover:bg-error/80"
                  onClick={() => onRemoveItem(list, setter, index)}
                  aria-label={`Remove ${config.title} word ${index + 1}`}
                  type="button"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            className={`btn btn-${config.color} btn-md rounded-lg gap-2 mt-4 tooltip`}
            onClick={() => onAddItem(setter)}
            type="button"
            aria-label={`Add another ${config.title} word`}
            data-tip="Add another word!"
          >
            <span className="text-xl">+</span>
            Add More
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputSection;