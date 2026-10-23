import React, { useEffect, useState } from 'react';
import { ExternalLink, Loader2, ArrowLeft, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';

interface ScreenRedirectProps {
  onCancel: () => void;
  language: Language;
}

export const ScreenRedirect: React.FC<ScreenRedirectProps> = ({ onCancel, language }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(3);
  const [hasAttemptedRedirect, setHasAttemptedRedirect] = useState(false);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    // Attempt redirect after countdown
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const triggerRedirect = () => {
    setHasAttemptedRedirect(true);
    try {
      // In compliance with requirements: redirect in the same browser tab
      window.location.href = 'https://www.payoneer.com/';
    } catch (e) {
      console.warn('Redirect caught by sandbox or browser:', e);
    }
  };

  return (
    <div className="flex flex-col flex-1 px-5 pt-8 pb-6 justify-between text-center overflow-y-auto">
      <div>
        {/* Animated radar/redirect pulse */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-pink-100 animate-ping opacity-75" />
          <div className="absolute inset-2 rounded-full bg-pink-50 border-2 border-pink-200" />
          <div className="relative w-14 h-14 rounded-full bg-[#E2136E] text-white flex items-center justify-center shadow-lg shadow-pink-500/30">
            <Loader2 className="w-7 h-7 animate-spin" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {t.redirecting}
        </h1>
        <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto leading-relaxed">
          {t.redirectNote}
        </p>

        {/* Destination box */}
        <div className="mt-5 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>TARGET DESTINATION</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified URL
            </span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200 text-slate-900 font-mono text-xs break-all">
            <ExternalLink className="w-4 h-4 text-[#E2136E] shrink-0" />
            <span className="font-semibold">https://www.payoneer.com/</span>
          </div>

          <div className="mt-3 flex items-start gap-2 text-slate-600 text-[11px] leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>
              <strong>External Platform:</strong> This prototype does not claim verification has succeeded. Verification must be completed directly with Payoneer.
            </p>
          </div>
        </div>

        {/* Countdown display */}
        <div className="mt-4">
          <span className="text-xs font-semibold text-slate-500">
            Auto-navigating in <span className="font-bold text-[#E2136E] text-sm tabular-nums">{secondsRemaining}s</span>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-6 space-y-2.5">
        <a
          href="https://www.payoneer.com/"
          target="_self"
          className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-[#E2136E] hover:bg-[#C90E5F] text-white flex items-center justify-center gap-2 shadow-md shadow-pink-500/20 active:scale-[0.98] transition-all"
        >
          <span>Open Payoneer Directly</span>
          <ExternalLink className="w-4 h-4" />
        </a>

        <button
          onClick={onCancel}
          className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.cancelRedirect}</span>
        </button>
      </div>
    </div>
  );
};
