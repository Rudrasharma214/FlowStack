import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { logger } from '@/services/logger';
import { useSubscriptionMutation } from '../hooks/useMutationsHooks/useSubscriptionMutation';
import { useActiveGetPlan } from '../hooks/useQueriesHooks/usePlanQueries';
import { type Plan } from '../types/plan.types';

const Subscription: React.FC = () => {
  const { planId: urlPlanId } = useParams<{ planId: string }>();
  const mutation = useSubscriptionMutation();
  const { data: plansData, isLoading: isLoadingPlans } = useActiveGetPlan();
  
  const [selectedPlanId, setSelectedPlanId] = useState<string>(urlPlanId || '');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [autoRenew, setAutoRenew] = useState<boolean>(true);

  useEffect(() => {
    if (urlPlanId) {
      setSelectedPlanId(urlPlanId);
    }
  }, [urlPlanId]);

  const handleSubscribe = () => {
    if (!selectedPlanId) {
      logger.error('No plan selected');
      return;
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    if (billingCycle === 'monthly') {
      endDate.setMonth(startDate.getMonth() + 1);
    } else {
      endDate.setFullYear(startDate.getFullYear() + 1);
    }

    const subscriptionData = {
      plan_id: selectedPlanId,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      billing_cycle: billingCycle,
      auto_renew: autoRenew,
      renewed_at: null,
    };

    mutation.mutate(subscriptionData, {
      onSuccess: () => {
        logger.info('Subscription successful!');
        // Ideally navigate to a success page or dashboard
      },
      onError: (error: any) => {
        logger.error('Subscription failed', error);
      },
    });
  };

  if (isLoadingPlans) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-transparent">
        <p className="text-gray-900 dark:text-white">Loading subscription details...</p>
      </div>
    );
  }

  const selectedPlan = plansData?.data?.find((p: Plan) => String(p.id) === selectedPlanId);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">Customize Your Subscription</h1>
        
        <div className="space-y-6">
          {/* Plan Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Plan
            </label>
            <select
              value={selectedPlanId}
              onChange={(e) => setSelectedPlanId(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
            >
              <option value="" disabled>Choose a plan</option>
              {plansData?.data?.map((plan: Plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} - ₹{billingCycle === 'monthly' ? plan.monthly_price : plan.yearly_price}
                </option>
              ))}
            </select>
          </div>

          {/* Billing Cycle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Billing Cycle
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`py-3 px-4 rounded-lg font-medium text-center border transition-all ${
                  billingCycle === 'monthly'
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-900/20 text-amber-600'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`py-3 px-4 rounded-lg font-medium text-center border transition-all ${
                  billingCycle === 'yearly'
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-900/20 text-amber-600'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Auto Renew Toggle */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto-renew subscription</span>
            <button
              type="button"
              onClick={() => setAutoRenew(!autoRenew)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                autoRenew ? 'bg-amber-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  autoRenew ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Summary */}
          {selectedPlan && (
            <div className="mt-8 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Selected Plan</span>
                <span className="font-semibold text-gray-900 dark:text-white">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Total Price</span>
                <span className="text-xl font-bold text-amber-600">
                  ₹{billingCycle === 'monthly' ? selectedPlan.monthly_price : selectedPlan.yearly_price}
                </span>
              </div>
            </div>
          )}
          
          <button
            onClick={handleSubscribe}
            disabled={mutation.isPending || !selectedPlanId}
            className="w-full mt-8 py-4 px-8 rounded-lg font-bold text-center transition-colors bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>

        {mutation.isSuccess && (
          <p className="mt-4 text-center text-green-600 dark:text-green-400 font-medium italic">
            Redirecting to dashboard...
          </p>
        )}
      </div>
    </div>
  );
};

export default Subscription;
