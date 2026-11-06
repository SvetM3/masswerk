import React from 'react';

export default function AdBanner() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-6">
      <div className="w-full h-24 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center bg-gray-50/50 dark:bg-gray-900/50 transition-colors">
        <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-medium">
          Advertisement
        </span>
        {/* Later, you can paste your Google AdSense or network script right here */}
      </div>
    </div>
  );
}
