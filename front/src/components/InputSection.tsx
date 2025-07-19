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
  onUpdateItem
}) => {
  const config = sectionConfigs[type];
  
  return (
    <div className={`card bg-${config.color} bg-opacity-10 border border-${config.color} border-opacity-20`}>
      <div className="card-body p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl" role="img" aria-label={config.title}>
            {config.icon}
          </span>
          <h3 className="card-title text-lg">{config.title}</h3>
        </div>
        <p className="text-sm opacity-70 mb-3">{config.description}</p>
        
        <div className="space-y-2">
          {list.map((item, index) => (
            <div key={`${type}-${index}`} className="flex gap-2">
              <input
                type="text"
                placeholder="Type here..."
                className="input input-bordered input-sm flex-1"
                value={item}
                onChange={(e) => onUpdateItem(setter, index, e.target.value)}
                aria-label={`${config.title} item ${index + 1}`}
              />
              {list.length > 1 && (
                <button
                  className="btn btn-ghost btn-sm btn-circle text-error hover:bg-error hover:text-error-content"
                  onClick={() => onRemoveItem(list, setter, index)}
                  aria-label={`Remove ${config.title} item ${index + 1}`}
                  type="button"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          
          <button
            className={`btn btn-${config.color} btn-outline btn-sm gap-1`}
            onClick={() => onAddItem(setter)}
            type="button"
            aria-label={`Add another ${config.title} item`}
          >
            <span className="text-lg">+</span>
            Add another
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputSection;