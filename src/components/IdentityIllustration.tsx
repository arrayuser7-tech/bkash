import React from 'react';

export const IdentityIllustration: React.FC<{ className?: string }> = ({ className = 'w-44 h-36' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 220 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2136E" />
            <stop offset="100%" stopColor="#B50C55" />
          </linearGradient>
          <linearGradient id="payoneerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF4800" />
            <stop offset="100%" stopColor="#E2136E" />
          </linearGradient>
          <filter id="softGlow2" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#E2136E" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Ambient background soft glow */}
        <circle cx="110" cy="90" r="70" fill="#FCE7F3" fillOpacity="0.5" />
        <circle cx="50" cy="50" r="24" fill="#FDF2F8" />
        <circle cx="170" cy="130" r="28" fill="#FDF2F8" />

        {/* Outer concentric rings */}
        <circle cx="110" cy="90" r="58" stroke="#FBCFE8" strokeWidth="1.5" strokeDasharray="5 4" />
        <circle cx="110" cy="90" r="46" fill="#FFFFFF" filter="url(#softGlow2)" />

        {/* Identity Shield with checkmark */}
        <path
          d="M110 58L136 68V93C136 109 125 123 110 128C95 123 84 109 84 93V68L110 58Z"
          fill="url(#shieldGrad)"
        />

        {/* Biometric / User silhouette inside shield */}
        <circle cx="110" cy="80" r="7" fill="#FFFFFF" />
        <path
          d="M99 99C99 93 104 89 110 89C116 89 121 93 121 99"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Payoneer circular badge offset bottom right */}
        <g filter="url(#softGlow2)">
          <circle cx="145" cy="115" r="19" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="1.5" />
          {/* Stylized Payoneer circle emblem */}
          <circle cx="145" cy="115" r="13" stroke="url(#payoneerGlow)" strokeWidth="3" fill="none" />
          <path
            d="M141 115H149M145 111V119"
            stroke="#E2136E"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* Verified link spark badge offset top left */}
        <g filter="url(#softGlow2)">
          <circle cx="75" cy="65" r="15" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="1.5" />
          <path
            d="M70 65L73.5 68.5L80 62"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};
