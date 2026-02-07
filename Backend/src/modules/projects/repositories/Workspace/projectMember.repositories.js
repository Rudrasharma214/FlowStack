import ProjectMember from '../../models/Workspace/projectMember.model.js';

export class ProjectMemberRepository {
    /* Create Project Member */
    async createProjectMember(data, transaction = null) {
        return await ProjectMember.create(data, { transaction });
    }
};