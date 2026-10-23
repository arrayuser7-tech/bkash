import React, { useState } from 'react';
import { Screen, PhoneValidationResult } from './types';
import { validateBDPhoneNumber } from './utils/phoneValidation';
import { Language } from './utils/translations';
import { HeaderBar } from './components/HeaderBar';
import { ScreenMobileNumber } from './components/ScreenMobileNumber';
import { ScreenVerification } from './components/ScreenVerification';
import { ScreenRedirect } from './components/ScreenRedirect';
import { MobileFrame } from './components/MobileFrame';
import { DesktopCompanion } from './components/DesktopCompanion';
import { InfoModal } from './components/InfoModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('mobile_number');
  const [phoneInput, setPhoneInput] = useState<string>('01712345678');
  const [language, setLanguage] = useState<Language>('en');
  const [isFrameEnabled, setIsFrameEnabled] = useState<boolean>(true);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  // Compute validation on current phone input
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

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row antialiased text-slate-900 overflow-x-hidden">
      {/* Main interactive mobile view area */}
      <main className="flex-1 flex flex-col items-center justify-center p-0 sm:p-4 md:p-8 bg-radial from-slate-100 via-pink-50/20 to-slate-200/60 min-h-screen">
        {/* Subtle desktop title above phone */}
        <div className="hidden sm:flex items-center gap-2 mb-3 text-xs font-semibold text-slate-500">
          <span className="w-2 h-2 rounded-full bg-[#E2136E]" />
          <span>bKash · Mobile Remittance Prototype</span>
        </div>

        <MobileFrame isFrameEnabled={isFrameEnabled} language={language}>
          {/* Header Bar */}
          <HeaderBar
            currentScreen={currentScreen}
            onBack={() => {
              if (currentScreen === 'redirect') setCurrentScreen('verification');
              else if (currentScreen === 'verification') setCurrentScreen('mobile_number');
            }}
            language={language}
            onToggleLanguage={handleToggleLanguage}
            onOpenInfo={() => setIsInfoOpen(true)}
          />

          {/* Active Screen Content */}
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
        </MobileFrame>

        {/* Floating Quick Switcher on mobile/tablet viewports */}
        <div className="lg:hidden w-full max-w-sm px-4 mt-4 mb-2 flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={() => setIsInfoOpen(true)}
            className="text-[#E2136E] font-medium hover:underline flex items-center gap-1"
          >
            Disclaimer & Disclosures
          </button>
          <span>Language: {language === 'en' ? 'ENG' : 'বাংলা'}</span>
        </div>
      </main>

      {/* Desktop Companion evaluation sidebar */}
      <DesktopCompanion
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        isFrameEnabled={isFrameEnabled}
        onToggleFrame={() => setIsFrameEnabled((prev) => !prev)}
        onSetTestNumber={(num) => setPhoneInput(num)}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Prototype disclosures modal */}
      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </div>
  );
}
