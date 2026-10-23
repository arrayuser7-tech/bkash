import React from 'react';
import { X, ShieldAlert, Smartphone, ExternalLink, Check, Sparkles } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 text-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-pink-50 border border-pink-200 flex items-center justify-center text-[#E2136E]">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Prototype Information</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <div className="p-3 bg-pink-50 rounded-2xl border border-pink-100">
            <span className="font-bold text-[#E2136E] block mb-1">
              Independent Demo Notice
            </span>
            <p>
              This application is an independent technical demonstration and is <strong>not affiliated with, endorsed by, or authorized by bKash Limited or Payoneer Inc.</strong>
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs">Features & Safety:</h4>
            <ul className="space-y-1.5 pl-1">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Local Validation:</strong> Phone numbers are validated strictly in your browser. Nothing is transmitted to any server.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>No Credentials:</strong> Does not request OTP, PIN, passwords, NID numbers, or document uploads.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>External Redirect:</strong> Directs safely to Payoneer’s official website (payoneer.com) in the same tab.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>No Verification Claims:</strong> Does not simulate or claim successful identity verification.</span>
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-slate-800 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
