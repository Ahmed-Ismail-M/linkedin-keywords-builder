'use client';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types/languge';

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'toggle' | 'tabs';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'dropdown',
  size = 'md',
  className = '',
}) => {
  const { language, setLanguage, t, isRTL } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const sizeClasses = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  };

  if (variant === 'dropdown') {
    return (
      <div className={`dropdown ${isRTL ? 'dropdown-end' : 'dropdown-start'} ${className}`}>
        <div
          tabIndex={0}
          role="button"
          className={`btn btn-ghost ${sizeClasses[size]} gap-2`}
          aria-label={t('language')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.605 0 3.192.083 4.75.371m-4.75-.371v10.75m0-10.75a48.474 48.474 0 00-6.01.371m6.01-.371c1.605 0 3.192.083 4.75.371m-4.75-.371v10.75m0-10.75H3m6.75 0v10.75m0 0l5.25-11.25L21 21m-9-3h7.5"
            />
          </svg>
          <span className="hidden sm:inline">{t('language')}</span>
          <svg
            className="fill-current w-3 h-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
        >
          <li>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`${language === 'en' ? 'active' : ''}`}
            >
              🇺🇸 {t('english')}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleLanguageChange('ar')}
              className={`${language === 'ar' ? 'active' : ''}`}
            >
              🇸🇦 {t('arabic')}
            </button>
          </li>
        </ul>
      </div>
    );
  }

  if (variant === 'toggle') {
    return (
      <div className={`form-control ${className}`}>
        <label className="label cursor-pointer gap-2">
          <span className="label-text">EN</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={language === 'ar'}
            onChange={(e) => handleLanguageChange(e.target.checked ? 'ar' : 'en')}
          />
          <span className="label-text">AR</span>
        </label>
      </div>
    );
  }

  if (variant === 'tabs') {
    return (
      <div className={`tabs tabs-boxed ${className}`}>
        <button
          className={`tab ${language === 'en' ? 'tab-active' : ''}`}
          onClick={() => handleLanguageChange('en')}
        >
          🇺🇸 EN
        </button>
        <button
          className={`tab ${language === 'ar' ? 'tab-active' : ''}`}
          onClick={() => handleLanguageChange('ar')}
        >
          🇸🇦 AR
        </button>
      </div>
    );
  }

  return null;
};