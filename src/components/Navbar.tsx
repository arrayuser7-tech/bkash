import React from 'react';
import { HelpCircle, ShieldCheck, ExternalLink, Globe } from 'lucide-react';
import { Screen } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';

interface NavbarProps {
  currentScreen: Screen;
  language: Language;
  onToggleLanguage: () => void;
  onOpenInfo: () => void;
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  language,
  onToggleLanguage,
  onOpenInfo,
  onNavigateHome,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single element brand wordmark + logo */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-3 group text-left cursor-pointer"
          aria-label="bKash Remittance Home"
        >
          <div className="w-10 h-10 bg-[#E2136E] rounded-xl flex items-center justify-center p-2 shadow-sm transition-transform group-hover:scale-105">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M6 8L34 20L20 24L14 34L12 22Z" fill="#FFFFFF" />
              <path d="M20 24L34 20L26 32Z" fill="#FCE7F3" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-[#E2136E] transition-colors">
                {t.appName}
              </span>
              <span className="text-xs font-bold text-[#E2136E] bg-pink-50 border border-pink-100 px-2 py-0.5 rounded-md">
                Remit
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:block">
              {t.tagline}
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (single line, no wrapping) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <button
            onClick={onNavigateHome}
            className={`whitespace-nowrap transition-colors hover:text-[#E2136E] ${
              currentScreen === 'mobile_number' ? 'text-[#E2136E]' : ''
            }`}
          >
            {language === 'en' ? 'Remittance Portal' : 'রেমিট্যান্স পোর্টাল'}
          </button>
          <a
            href="https://www.bkash.com/en"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap transition-colors hover:text-[#E2136E] flex items-center gap-1"
          >
            <span>bKash Official</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
          <a
            href="https://www.payoneer.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap transition-colors hover:text-[#E2136E] flex items-center gap-1"
          >
            <span>Payoneer</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
          <button
            onClick={onOpenInfo}
            className="whitespace-nowrap transition-colors hover:text-[#E2136E]"
          >
            {language === 'en' ? 'Prototype Info' : 'প্রোটোটাইপ তথ্য'}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action & Language Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleLanguage}
            title="Toggle Language (English / বাংলা)"
            className="px-3 py-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5 text-[#E2136E]" />
            <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
          </button>

          <button
            onClick={onOpenInfo}
            className="px-3.5 py-1.5 text-xs font-semibold text-[#E2136E] bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Demo Disclosures</span>
            <span className="sm:hidden">Info</span>
          </button>
        </div>
      </div>
    </header>
  );
};
