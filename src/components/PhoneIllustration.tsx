import React from 'react';

export const PhoneIllustration: React.FC<{ className?: string }> = ({ className = 'w-48 h-40' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 240 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id="magentaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2136E" />
            <stop offset="100%" stopColor="#C90E5F" />
          </linearGradient>
          <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
          <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#E2136E" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Ambient background soft circle */}
        <circle cx="120" cy="100" r="76" fill="#FCE7F3" fillOpacity="0.5" />
        <circle cx="170" cy="50" r="32" fill="#FDF2F8" />
        <circle cx="65" cy="140" r="24" fill="#FDF2F8" />

        {/* Decorative micro dots */}
        <circle cx="50" cy="55" r="3" fill="#E2136E" fillOpacity="0.3" />
        <circle cx="185" cy="135" r="3.5" fill="#E2136E" fillOpacity="0.4" />
        <circle cx="195" cy="95" r="2" fill="#E2136E" fillOpacity="0.3" />

        {/* Smartphone body */}
        <rect
          x="82"
          y="28"
          width="76"
          height="144"
          rx="18"
          fill="url(#phoneGrad)"
          stroke="#334155"
          strokeWidth="2.5"
        />

        {/* Smartphone screen glass */}
        <rect
          x="86"
          y="34"
          width="68"
          height="132"
          rx="14"
          fill="url(#cardGrad)"
        />

        {/* Phone speaker / notch */}
        <rect x="110" y="38" width="20" height="3" rx="1.5" fill="#0F172A" />

        {/* Screen header banner */}
        <rect x="86" y="44" width="68" height="28" fill="url(#magentaGrad)" />
        <circle cx="120" cy="58" r="8" fill="#FFFFFF" fillOpacity="0.25" />
        <path
          d="M117 58L119 60L124 55"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Screen input mock lines */}
        <rect x="94" y="80" width="52" height="12" rx="4" fill="#F1F5F9" />
        <circle cx="100" cy="86" r="3" fill="#E2136E" />
        <rect x="106" y="84" width="24" height="4" rx="2" fill="#94A3B8" />

        <rect x="94" y="98" width="52" height="12" rx="4" fill="#F1F5F9" />
        <rect x="98" y="102" width="36" height="4" rx="2" fill="#CBD5E1" />

        {/* Screen action button */}
        <rect x="94" y="122" width="52" height="14" rx="5" fill="url(#magentaGrad)" />
        <rect x="108" y="127" width="24" height="4" rx="2" fill="#FFFFFF" />

        {/* Floating Remittance BDT & Shield Card Left */}
        <g filter="url(#softGlow)">
          <rect
            x="32"
            y="72"
            width="56"
            height="50"
            rx="12"
            fill="#FFFFFF"
            stroke="#F1F5F9"
            strokeWidth="1.5"
          />
          {/* bKash styled bird / origami paper fold touch */}
          <path
            d="M48 84L60 92L52 98L44 94Z"
            fill="#E2136E"
          />
          <text
            x="50"
            y="112"
            fill="#1E293B"
            fontSize="10"
            fontWeight="bold"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            ৳ BDT
          </text>
        </g>

        {/* Floating Payoneer / Global Card Right */}
        <g filter="url(#softGlow)">
          <rect
            x="152"
            y="66"
            width="58"
            height="52"
            rx="12"
            fill="#FFFFFF"
            stroke="#F1F5F9"
            strokeWidth="1.5"
          />
          {/* Global circular currency badge */}
          <circle cx="181" cy="85" r="11" fill="#FFF1F6" stroke="#E2136E" strokeWidth="1.5" />
          <path
            d="M178 81H183M178 85H184M178 89H182"
            stroke="#E2136E"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <text
            x="167"
            y="108"
            fill="#475569"
            fontSize="9"
            fontWeight="600"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            Global
          </text>
        </g>

        {/* Connection curved dashed line between cards */}
        <path
          d="M75 75 C100 50, 140 50, 165 70"
          stroke="#E2136E"
          strokeWidth="2"
          strokeDasharray="4 3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};
