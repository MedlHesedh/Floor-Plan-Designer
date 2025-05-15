import React, { useState } from 'react';

interface TabsProps {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`
                py-4 px-6 text-sm font-medium transition-colors duration-200 ease-in-out
                ${
                  activeTab === index
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="py-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;