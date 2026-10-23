import React from 'react';
import { Screen, PhoneValidationResult } from '../types';
import { Smartphone, Monitor, Shield, ExternalLink, RefreshCw, CheckCircle, Info } from 'lucide-react';
import { Language } from '../utils/translations';

interface DesktopCompanionProps {
  currentScreen: Screen;
  onSelectScreen: (screen: Screen) => void;
  isFrameEnabled: boolean;
  onToggleFrame: () => void;
  onSetTestNumber: (num: string) => void;
  language: Language;
  onToggleLanguage: () => void;
}

export const DesktopCompanion: React.FC<DesktopCompanionProps> = ({
  currentScreen,
  onSelectScreen,
  isFrameEnabled,
  onToggleFrame,
  onSetTestNumber,
  language,
  onToggleLanguage,
}) => {
  return (
    <aside className="hidden lg:flex flex-col w-80 xl:w-96 p-6 bg-white/90 backdrop-blur-md border-l border-slate-200/80 shrink-0 text-slate-800 space-y-6 overflow-y-auto max-h-screen">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E2136E]" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Prototype Evaluation Panel
          </span>
        </div>
        <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
          bKash-Inspired Mobile UI
        </h2>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Mobile financial app prototype demonstrating phone entry, identity verification, and external Payoneer redirect.
        </p>
      </div>

      {/* Screen Navigation Quick Switcher */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Flow Steps (Direct Jump)
        </label>
        <div className="grid grid-cols-1 gap-1.5">
          <button
            onClick={() => onSelectScreen('mobile_number')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
              currentScreen === 'mobile_number'
                ? 'bg-pink-50 text-[#E2136E] border border-pink-200'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
            }`}
          >
            <span>1. Mobile Number Entry</span>
            <span className="text-[10px] opacity-75 font-mono">01XXXXXXXXX</span>
          </button>

          <button
            onClick={() => onSelectScreen('verification')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
              currentScreen === 'verification'
                ? 'bg-pink-50 text-[#E2136E] border border-pink-200'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
            }`}
          >
            <span>2. Identity Verification</span>
            <span className="text-[10px] opacity-75 font-mono">Masked Phone</span>
          </button>

          <button
            onClick={() => onSelectScreen('redirect')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
              currentScreen === 'redirect'
                ? 'bg-pink-50 text-[#E2136E] border border-pink-200'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
            }`}
          >
            <span>3. Payoneer Redirect</span>
            <span className="text-[10px] opacity-75 font-mono">payoneer.com</span>
          </button>
        </div>
      </div>

      {/* Viewport & Device Toggles */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Display Settings
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onToggleFrame}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            {isFrameEnabled ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span>{isFrameEnabled ? 'Clean View' : 'Device Frame'}</span>
          </button>

          <button
            onClick={onToggleLanguage}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Language: {language === 'en' ? 'ENG' : 'বাংলা'}</span>
          </button>
        </div>
      </div>

      {/* Quick Test Numbers */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Quick Test Numbers (1-Click)
        </label>
        <div className="space-y-1.5">
          <button
            onClick={() => {
              onSetTestNumber('01712345678');
              onSelectScreen('mobile_number');
            }}
            className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-pink-50 hover:text-[#E2136E] text-xs font-medium text-slate-600 transition-colors border border-slate-200/60 flex items-center justify-between"
          >
            <span>Grameenphone (Valid)</span>
            <span className="font-mono text-[11px] text-slate-800">01712-345678</span>
          </button>

          <button
            onClick={() => {
              onSetTestNumber('01912345678');
              onSelectScreen('mobile_number');
            }}
            className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-pink-50 hover:text-[#E2136E] text-xs font-medium text-slate-600 transition-colors border border-slate-200/60 flex items-center justify-between"
          >
            <span>Banglalink (Valid)</span>
            <span className="font-mono text-[11px] text-slate-800">01912-345678</span>
          </button>

          <button
            onClick={() => {
              onSetTestNumber('01812345678');
              onSelectScreen('mobile_number');
            }}
            className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-pink-50 hover:text-[#E2136E] text-xs font-medium text-slate-600 transition-colors border border-slate-200/60 flex items-center justify-between"
          >
            <span>Robi (Valid)</span>
            <span className="font-mono text-[11px] text-slate-800">01812-345678</span>
          </button>
        </div>
      </div>

      {/* Design System Checklist */}
      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
        <span className="font-bold text-slate-900 block">Design Guidelines Compliance</span>
        <ul className="space-y-1 text-slate-600">
          <li className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Vivid bKash Magenta <code className="text-[#E2136E] font-bold">#E2136E</code></span>
          </li>
          <li className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Local phone validation only</span>
          </li>
          <li className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Masked phone on Screen 2</span>
          </li>
          <li className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>No OTP / PIN / NID requests</span>
          </li>
          <li className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Redirects to payoneer.com in same tab</span>
          </li>
          <li className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Persistent disclaimer notice</span>
          </li>
        </ul>
      </div>

      {/* Legal Footer Notice */}
      <div className="pt-2 text-[11px] text-slate-400 leading-tight">
        Independent demo prototype. Not affiliated with, sponsored by, or endorsed by bKash Limited or Payoneer Inc.
      </div>
    </aside>
  );
};
