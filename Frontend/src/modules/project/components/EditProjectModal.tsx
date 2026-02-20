import { useState, useEffect, type FormEvent } from 'react';
import { useUpdateProjectMutation } from '../hooks/useMutationHooks/useProjectMutation';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '@/shared/components';
import { PROJECT_STATUS_LABELS, type Project } from '../types/project.types';
import type { UpdateProjectData } from '../types/serviceTypes/projectService.types';

interface EditProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

const STATUS_OPTIONS = (
    Object.entries(PROJECT_STATUS_LABELS) as [
        UpdateProjectData['status'],
        string,
    ][]
);

const EditProjectModal = ({ project, onClose }: EditProjectModalProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<UpdateProjectData['status']>('inactive');
    const [errors, setErrors] = useState<{ name?: string }>({});

    const queryClient = useQueryClient();
    const updateMutation = useUpdateProjectMutation(project?.id ?? '');

    // Sync form fields when project changes
    useEffect(() => {
        if (project) {
            setName(project.name);
            setDescription(project.description ?? '');
            setStatus(project.status);
            setErrors({});
        }
    }, [project]);

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

        updateMutation.mutate(
            {
                name: name.trim(),
                description: description.trim() || undefined,
                status,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['projects'] });
                    onClose();
                },
            }
        );
    };

    const handleClose = () => {
        if (!updateMutation.isPending) {
            onClose();
        }
    };

    if (!project) return null;

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
                        Edit Project
                    </h2>
                    <button
                        onClick={handleClose}
                        disabled={updateMutation.isPending}
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
                        id="edit-project-name"
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
                        disabled={updateMutation.isPending}
                    />

                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="edit-project-description"
                            className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Description
                        </label>
                        <textarea
                            id="edit-project-description"
                            rows={3}
                            placeholder="Enter project description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={updateMutation.isPending}
                            className="px-4 py-2.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 resize-none disabled:opacity-60 disabled:cursor-not-allowed w-full"
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="edit-project-status"
                            className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Status
                        </label>
                        <select
                            id="edit-project-status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as UpdateProjectData['status'])}
                            disabled={updateMutation.isPending}
                            className="px-4 py-2.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed w-full"
                        >
                            {STATUS_OPTIONS.map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* API error */}
                    {updateMutation.isError && (
                        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                            {updateMutation.error instanceof Error
                                ? updateMutation.error.message
                                : 'Failed to update project. Please try again.'}
                        </p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={updateMutation.isPending}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg transition disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={updateMutation.isPending}
                            className="px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition disabled:opacity-50 flex items-center gap-2"
                        >
                            {updateMutation.isPending && (
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            )}
                            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProjectModal;
