import { useGetProjectMembersQuery } from '../hooks/useQueriesHooks/useProjectMemberQueries';

interface ProjectMember {
    id: number;
    project_id: number;
    user_id: number;
    role: 'owner' | 'admin' | 'member';
    added_by: number;
    user?: {
        id: number;
        name: string;
        email: string;
    };
}

const ROLE_STYLES: Record<ProjectMember['role'], { bg: string; text: string }> = {
    owner: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-800 dark:text-amber-400' },
    admin: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-400' },
    member: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-300' },
};

const getInitials = (name: string) =>
    name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

interface ProjectMembersProps {
    projectId: string;
}

const ProjectMembers = ({ projectId }: ProjectMembersProps) => {
    const { data, isLoading, isError } = useGetProjectMembersQuery(projectId);

    const members: ProjectMember[] =
        (data as { members?: ProjectMember[] })?.members ??
        (Array.isArray(data) ? (data as ProjectMember[]) : []);

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Members</h2>
                {!isLoading && !isError && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {members.length} {members.length === 1 ? 'member' : 'members'}
                    </span>
                )}
            </div>

            {isLoading && (
                <div className="divide-y divide-gray-200 dark:divide-zinc-800">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="px-6 py-3 flex items-center gap-3 animate-pulse">
                            <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-zinc-700 shrink-0" />
                            <div className="flex-1 space-y-1.5">
                                <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-700 rounded" />
                                <div className="h-3 w-48 bg-gray-200 dark:bg-zinc-700 rounded" />
                            </div>
                            <div className="h-5 w-14 bg-gray-200 dark:bg-zinc-700 rounded-full" />
                        </div>
                    ))}
                </div>
            )}

            {isError && (
                <div className="px-6 py-8 text-center">
                    <p className="text-sm text-red-500 dark:text-red-400">Failed to load members</p>
                </div>
            )}

            {!isLoading && !isError && members.length === 0 && (
                <div className="px-6 py-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">No members in this project yet.</p>
                </div>
            )}

            {!isLoading && !isError && members.length > 0 && (
                <div className="divide-y divide-gray-200 dark:divide-zinc-800">
                    {members.map((member) => {
                        const name = member.user?.name ?? `User #${member.user_id}`;
                        const email = member.user?.email;
                        const roleStyle = ROLE_STYLES[member.role] ?? ROLE_STYLES.member;

                        return (
                            <div
                                key={member.id}
                                className="px-6 py-3 flex items-center gap-3"
                            >
                                {/* Avatar */}
                                <div className="h-9 w-9 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                                    {getInitials(name)}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {name}
                                    </p>
                                    {email && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {email}
                                        </p>
                                    )}
                                </div>

                                {/* Role badge */}
                                <span
                                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize shrink-0 ${roleStyle.bg} ${roleStyle.text}`}
                                >
                                    {member.role}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ProjectMembers;
