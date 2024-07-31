// components/ui/dashboard/dashboard-card.tsx

import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  href: string;
  className?: string; 
  children: ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, href, className, children }) => {
  return (
    <div className={`bg-white p-6 shadow-lg rounded-xl ${className}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default DashboardCard;
