const ProjectDashboard = () => {
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
        {[
          { label: 'Total Projects', value: '12', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Active', value: '8', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Completed', value: '3', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'On Hold', value: '1', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} rounded-lg p-5`}
          >
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
            <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Project List */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Projects</h2>
          <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition">
            + New Project
          </button>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-zinc-800">
          {[
            { name: 'Website Redesign', status: 'Active', progress: 65, tasks: '16/24', team: 5 },
            { name: 'Mobile App Development', status: 'Active', progress: 40, tasks: '7/18', team: 4 },
            { name: 'Backend API Migration', status: 'Active', progress: 85, tasks: '10/12', team: 3 },
            { name: 'Analytics Dashboard', status: 'On Hold', progress: 30, tasks: '4/15', team: 2 },
          ].map((project) => (
            <div
              key={project.name}
              className="px-5 py-4 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === 'Active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{project.tasks} tasks</span>
                  <span>{project.team} members</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-1.5">
                <div
                  className="bg-amber-500 h-1.5 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;