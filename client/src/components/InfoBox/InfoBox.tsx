import React from 'react';

interface InfoBoxProps {
  type: 'info' | 'warning' | 'success';
  icon?: string;
  children: React.ReactNode;
}

const typeStyles: Record<string, string> = {
  info: 'bg-blue-100 border-blue-400 text-blue-800',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-800',
  success: 'bg-green-100 border-green-400 text-green-800',
};

const iconMap: Record<string, React.ReactNode> = {
  info: <span className="material-icons align-middle mr-2">info</span>,
  warning: <span className="material-icons align-middle mr-2">warning</span>,
  success: <span className="material-icons align-middle mr-2">check_circle</span>,
  location_off: <span className="material-icons align-middle mr-2">location_off</span>,
};

const InfoBox: React.FC<InfoBoxProps> = ({ type, icon, children }) => {
  return (
    <div className={`border-l-4 p-4 mb-4 rounded flex items-center shadow-sm ${typeStyles[type]}`}>
      {icon && iconMap[icon]}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default InfoBox; 