import React from 'react';
import { Wifi, Signal, Battery, AlertCircle } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';

interface MobileFrameProps {
  children: React.ReactNode;
  isFrameEnabled: boolean;
  language: Language;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  isFrameEnabled,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const currentTime = '9:41';

  return (
    <div
      className={`relative mx-auto transition-all duration-300 ${
        isFrameEnabled
          ? 'w-full max-w-[400px] h-[780px] max-h-[92vh] rounded-[44px] shadow-2xl border-[9px] border-slate-900 bg-white overflow-hidden flex flex-col ring-1 ring-slate-900/10'
          : 'w-full max-w-[420px] min-h-screen sm:min-h-[720px] sm:max-h-[90vh] sm:rounded-3xl shadow-xl bg-white border border-slate-200 overflow-hidden flex flex-col'
      }`}
    >
      {/* Phone Hardware Mockup: Dynamic Island / Speaker cutout on frame view */}
      {isFrameEnabled && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 w-24 h-5 bg-slate-900 rounded-full flex items-center justify-center pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-950/80 mr-2 border border-slate-800" />
          <div className="w-2 h-2 rounded-full bg-slate-950/80" />
        </div>
      )}

      {/* Realistic iOS/Android Status Bar */}
      <div className="w-full bg-[#E2136E] text-white px-6 pt-2 pb-1 flex items-center justify-between text-[11px] font-semibold tracking-tight select-none shrink-0 z-30">
        <span className="tabular-nums font-bold">{currentTime}</span>
        <div className="flex items-center gap-1.5 opacity-90">
          <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
          <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
          <Battery className="w-4 h-4 stroke-[2.5]" />
        </div>
      </div>

      {/* Main app screen body */}
      <div className="relative flex-1 flex flex-col bg-slate-50/50 overflow-hidden">
        {children}
      </div>

      {/* Persistent Visible Notice Banner */}
      <div className="shrink-0 bg-slate-900 text-white py-2 px-3 text-center border-t border-slate-800 z-30">
        <p className="text-[10px] sm:text-[11px] font-semibold tracking-tight text-slate-200 flex items-center justify-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-pink-400 shrink-0" />
          <span>{t.notAffiliatedNotice}</span>
        </p>
      </div>

      {/* Bottom Home Indicator Bar on framed mode */}
      {isFrameEnabled && (
        <div className="w-full bg-slate-900 pb-2 pt-1 flex justify-center shrink-0">
          <div className="w-28 h-1 bg-slate-600 rounded-full" />
        </div>
      )}
    </div>
  );
};
