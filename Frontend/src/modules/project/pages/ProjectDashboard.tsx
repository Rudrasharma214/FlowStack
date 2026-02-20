import { useState, useMemo } from 'react';
import { useGetProjectsQuery } from '../hooks/useQueriesHooks/useProjectQueries';
import ProjectList from '../components/ProjectList';
import CreateProjectModal from '../components/CreateProjectModal';
import type { Project } from '../types/project.types';

const ProjectDashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { data } = useGetProjectsQuery();

  const stats = useMemo(() => {
    const projectList: Project[] = (data as { projects: Project[] })?.projects ?? [];

    const total = projectList.length;
    const active = projectList.filter((p) => p.status === 'active').length;
    const completed = projectList.filter((p) => p.status === 'completed').length;
    const inProgress = projectList.filter((p) => p.status === 'in_progress').length;

    return [
      { label: 'Total Projects', value: total, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
      { label: 'Active', value: active, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
      { label: 'Completed', value: completed, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
      { label: 'In Progress', value: inProgress, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    ];
  }, [data]);

  const handleProjectClick = (project: Project) => {
    console.log('Navigate to project:', project.id);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage and track all your projects
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-lg p-5`}>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
            <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Project List */}
      <ProjectList
        onCreateClick={() => setIsCreateModalOpen(true)}
        onProjectClick={handleProjectClick}
      />

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default ProjectDashboard;