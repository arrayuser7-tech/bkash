import React from 'react';
import { ExternalLink, ShieldCheck, CheckCircle2, ArrowLeft, Globe, Lock, AlertTriangle } from 'lucide-react';
import { IdentityIllustration } from './IdentityIllustration';
import { PhoneValidationResult } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';

interface ScreenVerificationProps {
  validation: PhoneValidationResult;
  onChangeNumber: () => void;
  onProceedToPayoneer: () => void;
  language: Language;
}

export const ScreenVerification: React.FC<ScreenVerificationProps> = ({
  validation,
  onChangeNumber,
  onProceedToPayoneer,
  language,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="flex flex-col flex-1 px-5 pt-3 pb-6 overflow-y-auto">
      {/* Identity Illustration */}
      <div className="py-2 flex justify-center">
        <IdentityIllustration className="w-44 h-32" />
      </div>

      {/* Screen Title & Description */}
      <div className="text-center mt-1 mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 border border-pink-200/80 rounded-full text-[#E2136E] text-xs font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Step 2 of 2 · Partner Authorization</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {t.identityVerification}
        </h1>
        <p className="text-xs text-slate-500 mt-1.5 max-w-xs mx-auto leading-relaxed">
          {t.verificationSubtitle}
        </p>
      </div>

      <div className="space-y-3.5">
        {/* Masked Phone Number Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {t.linkedNumber}
            </span>
            <button
              onClick={onChangeNumber}
              className="text-xs font-bold text-[#E2136E] hover:text-[#C90E5F] hover:underline"
            >
              {t.changeNumber}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs">
                🇧🇩
              </div>
              <div>
                <span className="font-mono font-bold text-slate-900 text-base tabular-nums">
                  {validation.maskedNumber || '+880 17•• ••••89'}
                </span>
                {validation.operator && (
                  <p className="text-[11px] text-slate-500 font-medium">
                    {validation.operator.name} Network
                  </p>
                )}
              </div>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Ready
            </span>
          </div>
        </div>

        {/* Explicit No OTP / PIN / NID Card */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-emerald-900">
              No Sensitive Credentials Required
            </p>
            <p className="text-[11px] text-emerald-700 mt-0.5 leading-snug">
              {t.noOtpNotice}
            </p>
          </div>
        </div>

        {/* External Redirect Destination Warning & Transparency Box */}
        <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-3.5">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-xs mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{t.externalDestinationTag}</span>
          </div>
          <p className="text-[11px] text-amber-900 leading-relaxed">
            {t.externalRedirectNotice}
          </p>
          <p className="text-[10px] text-amber-700 mt-1 font-medium">
            {t.demoDisclaimer}
          </p>
        </div>

        {/* Primary Action Button: Continue to Payoneer */}
        <div className="pt-2 space-y-2">
          <button
            onClick={onProceedToPayoneer}
            className="w-full py-4 px-6 rounded-2xl font-bold text-sm bg-[#E2136E] hover:bg-[#C90E5F] text-white flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{t.continueToPayoneer}</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            onClick={onChangeNumber}
            className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go back to change number</span>
          </button>
        </div>
      </div>
    </div>
  );
};
