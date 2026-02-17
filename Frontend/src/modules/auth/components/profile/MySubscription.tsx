import React from 'react';
import { useGetMySubscriptionQuery } from '../../../subscription/hooks/useQueriesHooks/useSubscriptionQueries';
import { useNavigate } from 'react-router-dom';

const MySubscription: React.FC = () => {
    const { data: subscriptionResponse, isLoading, error } = useGetMySubscriptionQuery();
    const navigate = useNavigate();
    const subscription = subscriptionResponse?.data;

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/30">
                Failed to load subscription details.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Subscription</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage your plan and billing preferences
                </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden p-6">
                {!subscription ? (
                    <div className="text-center py-4">
                       
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">No Active Subscription</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                            Choose a plan to get started.
                        </p>
                        <button
                            onClick={() => navigate('/plans')}
                            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors"
                        >
                            View Plans
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {subscription.plan?.name || 'Active Plan'}
                                </p>
                                    <p className="text-xs text-gray-500 truncate max-w-62.5 ">
                                    {subscription.plan?.description}
                                </p>
                            </div>
                            <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                                {subscription.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100 dark:border-zinc-800">
                            <div>
                                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Billing Cycle</p>
                                <p className="text-xs text-gray-900 dark:text-white font-medium capitalize">{subscription.billing_cycle}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Renewal Date</p>
                                <p className="text-xs text-gray-900 dark:text-white font-medium">
                                    {new Date(subscription.end_date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Auto-Renew</p>
                                <p className="text-xs text-gray-500">Automatically renew your subscription</p>
                            </div>
                            <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${subscription.auto_renew ? 'bg-amber-500' : 'bg-gray-200 dark:bg-zinc-700'}`}>
                                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${subscription.auto_renew ? 'translate-x-5' : 'translate-x-1'}`} />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                            <button 
                                onClick={() => navigate('/plans')}
                                className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
                            >
                                Change Plan
                            </button>
                            <p className="mt-1 text-xs text-gray-500">
                                Switch to a different plan or manage billing
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MySubscription;
