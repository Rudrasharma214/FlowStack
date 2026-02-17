import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useActiveGetPlan } from '../hooks/useQueriesHooks/usePlanQueries';
import { PlanCard } from '../components/PlanCard';
import { type Plan } from '../types/plan.types';

export const Plans: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useActiveGetPlan();
  const plans = data?.data;

  const handleSelectPlan = (planId: string | number) => {
    navigate(`/subscription/${planId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-transparent">
        <p className="text-gray-900 dark:text-white">Loading plans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-transparent">
        <p className="text-red-500">Error loading plans. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold sm:text-5xl text-gray-900 dark:text-white">
            Choose Your Plan
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Select the best plan for your team and start reaching your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans?.map((plan: Plan) => (
            <PlanCard 
              key={plan.id} 
              plan={plan} 
              onSelect={handleSelectPlan} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
