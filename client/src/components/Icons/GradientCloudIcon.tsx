import React from 'react';

const GradientCloudIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  return (
    <svg 
      width="1em" 
      height="1em" 
      viewBox="-1 -1 26 26"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <defs>
        <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />   {/* violet-400 */}
          <stop offset="50%" stopColor="#F472B6" />  {/* pink-400 */}
          <stop offset="100%" stopColor="#38BDF8" /> {/* sky-400 */}
        </linearGradient>
      </defs>
      <path
        d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
        fill="none"
        stroke="url(#icon-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GradientCloudIcon; 