import React, { useState, useEffect } from 'react';
import { ArrowRight, X, ShieldCheck, CheckCircle2, AlertCircle, Smartphone } from 'lucide-react';
import { PhoneIllustration } from './PhoneIllustration';
import { validateBDPhoneNumber } from '../utils/phoneValidation';
import { PhoneValidationResult } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';

interface ScreenMobileNumberProps {
  initialPhone: string;
  onContinue: (validation: PhoneValidationResult) => void;
  language: Language;
}

const SAMPLE_NUMBERS = [
  { label: 'Grameenphone', number: '01712345678' },
  { label: 'Banglalink', number: '01912345678' },
  { label: 'Robi', number: '01812345678' },
];

export const ScreenMobileNumber: React.FC<ScreenMobileNumberProps> = ({
  initialPhone,
  onContinue,
  language,
}) => {
  const [phoneNumber, setPhoneNumber] = useState(initialPhone);
  const [isTouched, setIsTouched] = useState(false);
  const t = TRANSLATIONS[language];

  const validation = validateBDPhoneNumber(phoneNumber);

  useEffect(() => {
    if (initialPhone) {
      setPhoneNumber(initialPhone);
      setIsTouched(true);
    }
  }, [initialPhone]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
    // Allow only digits and spaces
    const clean = e.target.value.replace(/[^\d\s]/g, '');
    setPhoneNumber(clean);
  };

  const handleClear = () => {
    setPhoneNumber('');
    setIsTouched(false);
  };

  const handleSelectSample = (num: string) => {
    setPhoneNumber(num);
    setIsTouched(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTouched(true);
    if (validation.isValid) {
      onContinue(validation);
    }
  };

  return (
    <div className="flex flex-col flex-1 px-5 pt-4 pb-6 overflow-y-auto">
      {/* Top Illustration with subtle bounce */}
      <div className="py-2 flex justify-center">
        <PhoneIllustration className="w-48 h-36" />
      </div>

      {/* Heading & Subtitle */}
      <div className="text-center mt-2 mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {t.getStarted}
        </h1>
        <p className="text-xs text-slate-500 mt-1.5 max-w-xs mx-auto leading-relaxed">
          {t.phoneSubtitle}
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="bd-phone-input"
              className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#E2136E]" />
              {t.phoneLabel}
            </label>

            {/* Operator tag if detected */}
            {validation.operator && (
              <span
                style={{ backgroundColor: validation.operator.bgLight, color: validation.operator.logoColor }}
                className="text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: validation.operator.logoColor }}
                />
                {validation.operator.name}
              </span>
            )}
          </div>

          {/* Input field with Bangladesh Flag & Prefix */}
          <div className="relative flex items-center rounded-2xl border-2 transition-all bg-white shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-pink-500/20 focus-within:border-[#E2136E] border-slate-200">
            {/* Country code prefix */}
            <div className="flex items-center gap-1.5 pl-3.5 pr-2.5 py-3.5 bg-slate-50 border-r border-slate-200 select-none text-slate-800">
              <span className="text-base" role="img" aria-label="Bangladesh Flag">
                🇧🇩
              </span>
              <span className="text-xs font-bold text-slate-700 tracking-tight">
                +880
              </span>
            </div>

            {/* Main phone input */}
            <input
              id="bd-phone-input"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={phoneNumber}
              onChange={handleChange}
              placeholder={t.phonePlaceholder}
              className="w-full pl-3 pr-9 py-3.5 text-base font-semibold text-slate-900 tracking-wide placeholder:text-slate-400 placeholder:font-normal focus:outline-none bg-transparent tabular-nums"
              maxLength={13}
            />

            {/* Clear button or valid checkmark */}
            {phoneNumber && (
              <div className="absolute right-2.5 flex items-center gap-1">
                {validation.isValid ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Clear phone number"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Validation Feedback */}
          {isTouched && validation.errorMessage && (
            <p className="mt-1.5 text-xs text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {validation.errorMessage}
            </p>
          )}

          {validation.isValid && (
            <p className="mt-1.5 text-xs text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              Valid {validation.operator?.name || 'Bangladesh'} number format
            </p>
          )}
        </div>

        {/* Quick test sample pills */}
        <div className="pt-1">
          <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
            {t.quickDemoNumbers}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {SAMPLE_NUMBERS.map((sample) => (
              <button
                key={sample.number}
                type="button"
                onClick={() => handleSelectSample(sample.number)}
                className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-pink-50 hover:text-[#E2136E] text-slate-600 font-medium rounded-lg transition-colors border border-slate-200/60 active:scale-95"
              >
                {sample.label}: <span className="font-mono text-slate-800">{sample.number.slice(0, 5)}...</span>
              </button>
            ))}
          </div>
        </div>

        {/* Local Validation Guarantee Note */}
        <div className="flex items-start gap-2 p-3 bg-pink-50/70 border border-pink-100 rounded-xl text-slate-600 mt-2">
          <ShieldCheck className="w-4 h-4 text-[#E2136E] shrink-0 mt-0.5" />
          <p className="text-[11px] leading-tight text-slate-600">
            {t.localValidationNotice}
          </p>
        </div>

        {/* Primary Magenta Continue Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={!validation.isValid}
            className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
              validation.isValid
                ? 'bg-[#E2136E] hover:bg-[#C90E5F] text-white shadow-pink-500/20 active:scale-[0.98] cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            <span>{t.continue}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
