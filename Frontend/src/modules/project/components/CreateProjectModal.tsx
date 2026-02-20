import { useState, type FormEvent } from 'react';
import { useProjectMutation } from '../hooks/useMutationHooks/useProjectMutation';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '@/shared/components';

interface CreateProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateProjectModal = ({ isOpen, onClose }: CreateProjectModalProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState<{ name?: string }>({});

    const queryClient = useQueryClient();
    const createMutation = useProjectMutation();

    const validate = (): boolean => {
        const newErrors: { name?: string } = {};
        if (!name.trim()) {
            newErrors.name = 'Project name is required';
        } else if (name.trim().length < 3) {
            newErrors.name = 'Project name must be at least 3 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        createMutation.mutate(
            {
                name: name.trim(),
                description: description.trim() || undefined,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['projects'] });
                    resetForm();
                    onClose();
                },
            }
        );
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setErrors({});
    };

    const handleClose = () => {
        if (!createMutation.isPending) {
            resetForm();
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-gray-200 dark:border-zinc-800 w-full max-w-md mx-4">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-zinc-800">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Create New Project
                    </h2>
                    <button
                        onClick={handleClose}
                        disabled={createMutation.isPending}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                    <Input
                        id="project-name"
                        label="Project Name"
                        placeholder="Enter project name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors({});
                        }}
                        error={errors.name}
                        required
                        fullWidth
                        disabled={createMutation.isPending}
                    />

                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="project-description"
                            className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Description
                        </label>
                        <textarea
                            id="project-description"
                            rows={3}
                            placeholder="Enter project description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={createMutation.isPending}
                            className="px-4 py-2.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 resize-none disabled:opacity-60 disabled:cursor-not-allowed w-full"
                        />
                    </div>

                    {/* Error message from API */}
                    {createMutation.isError && (
                        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                            {createMutation.error instanceof Error
                                ? createMutation.error.message
                                : 'Failed to create project. Please try again.'}
                        </p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={createMutation.isPending}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg transition disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={createMutation.isPending}
                            className="px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition disabled:opacity-50 flex items-center gap-2"
                        >
                            {createMutation.isPending && (
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            )}
                            {createMutation.isPending ? 'Creating...' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectModal;
