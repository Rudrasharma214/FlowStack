import { useQueryClient } from '@tanstack/react-query';
import { useDeleteProjectMutation } from '../hooks/useMutationHooks/useProjectMutation';

interface DeleteButtonProps {
    projectId: string;
}

const DeleteButton = ({ projectId }: DeleteButtonProps) => {
    const queryClient = useQueryClient();
    const deleteMutation = useDeleteProjectMutation(projectId);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        deleteMutation.mutate(undefined, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['projects'] });
            },
        });
    };

    return (
        <button
            onClick={handleClick}
            disabled={deleteMutation.isPending}
            className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
            title="Delete project"
        >
            {deleteMutation.isPending ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            )}
        </button>
    );
};

export default DeleteButton;
