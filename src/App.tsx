import React, { useState } from 'react';
import { Screen, PhoneValidationResult } from './types';
import { validateBDPhoneNumber } from './utils/phoneValidation';
import { Language, TRANSLATIONS } from './utils/translations';
import { Navbar } from './components/Navbar';
import { ScreenMobileNumber } from './components/ScreenMobileNumber';
import { ScreenVerification } from './components/ScreenVerification';
import { ScreenRedirect } from './components/ScreenRedirect';
import { InfoModal } from './components/InfoModal';
import {
  ShieldCheck,
  Zap,
  Globe2,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
  Smartphone,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  FileCheck,
} from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('mobile_number');
  const [phoneInput, setPhoneInput] = useState<string>('01712345678');
  const [language, setLanguage] = useState<Language>('en');
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  const t = TRANSLATIONS[language];
  const currentValidation: PhoneValidationResult = validateBDPhoneNumber(phoneInput);

  const handleContinueFromScreen1 = (val: PhoneValidationResult) => {
    setPhoneInput(val.rawDigits);
    setCurrentScreen('verification');
  };

  const handleChangeNumber = () => {
    setCurrentScreen('mobile_number');
  };

  const handleProceedToPayoneer = () => {
    setCurrentScreen('redirect');
  };

  const handleCancelRedirect = () => {
    setCurrentScreen('verification');
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const handleSelectSample = (sampleNum: string) => {
    setPhoneInput(sampleNum);
    setCurrentScreen('mobile_number');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* 1. Persistent Top Notice Banner */}
      <div className="bg-slate-900 text-white py-2 px-4 text-center border-b border-slate-800 text-xs sm:text-sm font-medium z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-pink-400 shrink-0" />
          <span>{t.notAffiliatedNotice}</span>
          <button
            onClick={() => setIsInfoOpen(true)}
            className="underline text-pink-300 hover:text-pink-200 ml-2 text-xs cursor-pointer"
          >
            Read Disclosures
          </button>
        </div>
      </div>

      {/* 2. Top Navigation Bar */}
      <Navbar
        currentScreen={currentScreen}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onOpenInfo={() => setIsInfoOpen(true)}
        onNavigateHome={() => setCurrentScreen('mobile_number')}
      />

      {/* 3. Hero & Main Web Application Split Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Context, Value Proposition & Step Progression */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              {/* Kicker label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 border border-pink-200 text-[#E2136E] rounded-full text-xs font-bold mb-4">
                <Globe2 className="w-3.5 h-3.5" />
                <span>International Remittance & Payoneer Integration</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Receive International Earnings Instantly with{' '}
                <span className="text-[#E2136E]">bKash</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Connect your verified Bangladesh mobile number with Payoneer to transfer freelance,
                e-commerce, and cross-border income directly to your bKash wallet 24/7 in Bangladeshi Taka (BDT).
              </p>
            </div>

            {/* Interactive Step Indicator Strip */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Remittance Authorization Flow
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Step 1 */}
                <button
                  onClick={() => setCurrentScreen('mobile_number')}
                  className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    currentScreen === 'mobile_number'
                      ? 'bg-pink-50/80 border-[#E2136E] ring-1 ring-[#E2136E]/20'
                      : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${currentScreen === 'mobile_number' ? 'text-[#E2136E]' : 'text-slate-500'}`}>
                      Step 1
                    </span>
                    {currentValidation.isValid && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                  </div>
                  <p className="text-xs font-semibold text-slate-800">
                    Mobile Number
                  </p>
                  <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                    +880 Local Check
                  </span>
                </button>

                {/* Step 2 */}
                <button
                  onClick={() => {
                    if (currentValidation.isValid) setCurrentScreen('verification');
                  }}
                  disabled={!currentValidation.isValid}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    currentScreen === 'verification'
                      ? 'bg-pink-50/80 border-[#E2136E] ring-1 ring-[#E2136E]/20'
                      : currentValidation.isValid
                      ? 'bg-slate-50 border-slate-200/80 hover:bg-slate-100 cursor-pointer'
                      : 'bg-slate-50/50 border-slate-200/40 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${currentScreen === 'verification' ? 'text-[#E2136E]' : 'text-slate-500'}`}>
                      Step 2
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <p className="text-xs font-semibold text-slate-800">
                    Verification
                  </p>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Payoneer Link
                  </span>
                </button>

                {/* Step 3 */}
                <button
                  onClick={() => {
                    if (currentValidation.isValid) setCurrentScreen('redirect');
                  }}
                  disabled={!currentValidation.isValid}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    currentScreen === 'redirect'
                      ? 'bg-pink-50/80 border-[#E2136E] ring-1 ring-[#E2136E]/20'
                      : currentValidation.isValid
                      ? 'bg-slate-50 border-slate-200/80 hover:bg-slate-100 cursor-pointer'
                      : 'bg-slate-50/50 border-slate-200/40 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${currentScreen === 'redirect' ? 'text-[#E2136E]' : 'text-slate-500'}`}>
                      Step 3
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <p className="text-xs font-semibold text-slate-800">
                    Redirect
                  </p>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    payoneer.com
                  </span>
                </button>
              </div>
            </div>

            {/* Trust & Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-pink-50 text-[#E2136E] flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">Instant BDT Credit</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Funds transfer straight into your bKash wallet 24/7 with real-time currency conversion.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">Zero Sensitive Credentials</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  No OTP, PIN, password, or NID scans collected on this portal. Verified locally.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">Payoneer Global Network</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Receive payouts from Upwork, Fiverr, Amazon, and international direct clients.
                </p>
              </div>
            </div>

            {/* Quick Demo Number Selector for Reviewers */}
            <div className="p-4 bg-slate-100/70 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-700 block">
                  1-Click Test Numbers:
                </span>
                <span className="text-[11px] text-slate-500">
                  Quickly test operator detection & validation
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSelectSample('01712345678')}
                  className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-pink-50 hover:text-[#E2136E] text-slate-700 rounded-lg border border-slate-200 shadow-2xs transition-colors"
                >
                  GP (01712-345678)
                </button>
                <button
                  onClick={() => handleSelectSample('01912345678')}
                  className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-pink-50 hover:text-[#E2136E] text-slate-700 rounded-lg border border-slate-200 shadow-2xs transition-colors"
                >
                  Banglalink (01912-345678)
                </button>
                <button
                  onClick={() => handleSelectSample('01812345678')}
                  className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-pink-50 hover:text-[#E2136E] text-slate-700 rounded-lg border border-slate-200 shadow-2xs transition-colors"
                >
                  Robi (01812-345678)
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Web Application Action Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/40 overflow-hidden">
              {/* Card Top Brand Strip */}
              <div className="bg-gradient-to-r from-[#E2136E] to-[#C90E5F] text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center p-1">
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <path d="M6 8L34 20L20 24L14 34L12 22Z" fill="#E2136E" />
                      <path d="M20 24L34 20L26 32Z" fill="#C90E5F" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-extrabold text-base tracking-tight block">
                      {t.appName}
                    </span>
                    <span className="text-[10px] text-pink-100 font-medium">
                      Web Remittance Flow
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-full text-white inline-block">
                    {currentScreen === 'mobile_number' && 'Step 1 of 2'}
                    {currentScreen === 'verification' && 'Step 2 of 2'}
                    {currentScreen === 'redirect' && 'Redirecting'}
                  </span>
                </div>
              </div>

              {/* Active Screen Flow */}
              <div className="p-2 sm:p-4 bg-white">
                {currentScreen === 'mobile_number' && (
                  <ScreenMobileNumber
                    initialPhone={phoneInput}
                    onContinue={handleContinueFromScreen1}
                    language={language}
                  />
                )}

                {currentScreen === 'verification' && (
                  <ScreenVerification
                    validation={currentValidation}
                    onChangeNumber={handleChangeNumber}
                    onProceedToPayoneer={handleProceedToPayoneer}
                    language={language}
                  />
                )}

                {currentScreen === 'redirect' && (
                  <ScreenRedirect
                    onCancel={handleCancelRedirect}
                    language={language}
                  />
                )}
              </div>

              {/* Card Footer Assurance */}
              <div className="bg-slate-50 border-t border-slate-100 px-6 py-3 text-center">
                <p className="text-[11px] font-medium text-slate-500 flex items-center justify-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#E2136E]" />
                  <span>Secure 256-bit encryption · Official Payoneer redirect</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Bottom Detailed Information Strip */}
        <section className="mt-16 pt-12 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-slate-900">
              How the bKash × Payoneer Web Remittance Works
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              A transparent, 3-step cross-border transfer process designed for Bangladeshi professionals and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#E2136E] font-bold text-base flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">
                1. Enter Mobile Number
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide your active Bangladesh mobile number (+880). The number is checked locally in your browser to verify valid Bangladesh operator formatting.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#E2136E] font-bold text-base flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">
                2. Review Verification Details
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your phone number is masked for privacy. No OTP, PIN, password, or NID scans are asked on this portal, keeping your credentials secure.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#E2136E] font-bold text-base flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">
                3. Authorize on Payoneer
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You are navigated directly to Payoneer’s official website (payoneer.com) in this tab to authorize linking and start receiving international payments.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Web Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 text-slate-600 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E2136E] rounded-lg flex items-center justify-center p-1.5">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M6 8L34 20L20 24L14 34L12 22Z" fill="#FFFFFF" />
                <path d="M20 24L34 20L26 32Z" fill="#FCE7F3" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm">
                bKash Remittance Web Portal
              </span>
              <p className="text-xs text-slate-500">
                Independent Demonstration Prototype
              </p>
            </div>
          </div>

          <div className="text-center md:text-right text-xs text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700">
              {t.notAffiliatedNotice}
            </p>
            <p>
              bKash is a registered trademark of bKash Limited. Payoneer is a registered trademark of Payoneer Inc.
            </p>
          </div>
        </div>
      </footer>

      {/* Disclosures Modal */}
      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </div>
  );
}
