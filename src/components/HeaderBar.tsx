import React from 'react';
import { ArrowLeft, Info, HelpCircle } from 'lucide-react';
import { Screen } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';

interface HeaderBarProps {
  currentScreen: Screen;
  onBack: () => void;
  language: Language;
  onToggleLanguage: () => void;
  onOpenInfo: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentScreen,
  onBack,
  language,
  onToggleLanguage,
  onOpenInfo,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="relative bg-[#E2136E] text-white px-4 pt-3 pb-3 shadow-md">
      {/* Top action row */}
      <div className="flex items-center justify-between">
        {/* Left slot: Back button or Brand logo */}
        <div className="flex items-center gap-2">
          {currentScreen !== 'mobile_number' ? (
            <button
              onClick={onBack}
              aria-label="Go back"
              className="p-1.5 -ml-1 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              {/* bKash-inspired geometric origami bird logo */}
              <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center p-1 shadow-sm">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M6 8L34 20L20 24L14 34L12 22Z" fill="#E2136E" />
                  <path d="M20 24L34 20L26 32Z" fill="#C90E5F" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-base tracking-tight leading-none text-white block">
                  {t.appName}
                </span>
                <span className="text-[10px] text-pink-100 font-medium tracking-wide">
                  Remittance
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Center slot: Screen title on inner screens */}
        {currentScreen !== 'mobile_number' && (
          <div className="text-center">
            <span className="font-semibold text-sm tracking-tight text-white block">
              {currentScreen === 'verification' ? t.identityVerification : t.redirecting}
            </span>
          </div>
        )}

        {/* Right slot: Language Toggle & Info Help */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleLanguage}
            title="Toggle Language"
            className="px-2.5 py-1 text-xs font-semibold bg-white/15 hover:bg-white/25 text-white rounded-md transition-colors"
          >
            {language === 'en' ? 'বাংলা' : 'ENG'}
          </button>

          <button
            onClick={onOpenInfo}
            aria-label="Demo info"
            title="Prototype Information"
            className="p-1 text-white/90 hover:text-white hover:bg-white/15 rounded-full transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
