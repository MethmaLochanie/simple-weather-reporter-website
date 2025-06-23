import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
      <div className="w-32 h-32">
        <svg viewBox="-2 -2 28 28" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient-border" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333EA" />   {/* purple-600 */}
              <stop offset="50%" stopColor="#EC4899" />  {/* pink-500 */}
              <stop offset="100%" stopColor="#2563EB" /> {/* blue-600 */}
            </linearGradient>
          </defs>

          {/* Faint background path */}
          <path
            d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
            stroke="#D1D5DB"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Animated "snake" path */}
          <path
            d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
            stroke="url(#gradient-border)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="20 70"
          >
            <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-90"
                dur="2s"
                repeatCount="indefinite"
                calcMode="paced"
            />
          </path>
        </svg>
      </div>
    </div>
  );
};

export default Loader; 