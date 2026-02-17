import React from 'react';
import type { PlanCardProps } from '../types/plan.types';

export const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect }) => {
  return (
    <div
      key={plan.id}
      className="rounded-2xl shadow-xl overflow-hidden flex flex-col transition-transform hover:scale-105 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
    >
      <div className="p-8 flex-1">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{plan.description}</p>
        <div className="mt-8">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            ₹{plan.monthly_price}
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/month</span>
        </div>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          or ₹{plan.yearly_price}/year
        </div>
      </div>
      <div className="p-8 pt-0">
        <button
          onClick={() => onSelect?.(plan.id)}
          className="w-full py-4 px-8 rounded-lg font-bold text-center transition-colors bg-amber-600 hover:bg-amber-700 text-white"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
