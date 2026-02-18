import { useQuery } from "@tanstack/react-query";
import { projectMemberService } from "../../services/projectMemberService";

export const useGetProjectMembersQuery = (projectId: string) => {
    return useQuery({
        queryKey: ['projectMembers', projectId],
        queryFn: async () => {
            const response = await projectMemberService.getProjectMembers(projectId);
            return response.data;
        }
    });
};