import React from 'react';
import { Zap } from 'lucide-react';

interface BadgeProps {
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ className }) => {
  return (
    <div className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white ${className}`}>
      <Zap size={12} className="mr-1" />
      Built with Bolt.new
    </div>
  );
};

export default Badge;