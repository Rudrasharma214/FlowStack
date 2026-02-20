import type { Project } from '../types/project.types';

interface EditButtonProps {
    project: Project;
    onEdit: (project: Project) => void;
}

const EditButton = ({ project, onEdit }: EditButtonProps) => {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit(project);
    };

    return (
        <button
            onClick={handleClick}
            className="p-1 rounded text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 transition-colors"
            title="Edit project"
        >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        </button>
    );
};

export default EditButton;
