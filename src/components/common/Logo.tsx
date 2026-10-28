import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const AavartanLogo: React.FC<LogoProps> = ({ className = "w-7 h-7", size = 28 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Segmented Cyclical Aperture Loop (Aavartan / Rotation) */}
      {/* Top Arc with notch */}
      <path
        d="M 10 4.2 A 12.5 12.5 0 0 1 25.5 8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Right Arc with notch */}
      <path
        d="M 27.8 12 A 12.5 12.5 0 0 1 24 26"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Bottom Arc with notch */}
      <path
        d="M 20 28 A 12.5 12.5 0 0 1 6.5 24"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Left Arc with notch */}
      <path
        d="M 4.2 20 A 12.5 12.5 0 0 1 8 6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Cycle directional notches / ticks */}
      <line x1="8" y1="3" x2="8" y2="6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="28.5" y1="9" x2="26" y2="11.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="22" y1="29" x2="22" y2="25.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="3.5" y1="21.5" x2="6" y2="19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />

      {/* Inner Concentric Ring */}
      <circle
        cx="16"
        cy="16"
        r="5.5"
        stroke="currentColor"
        strokeWidth="2.2"
        fill="none"
      />

      {/* Central Core Circle */}
      <circle
        cx="16"
        cy="16"
        r="2"
        fill="currentColor"
      />
    </svg>
  );
};
