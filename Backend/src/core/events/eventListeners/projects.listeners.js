import { sendEmail } from '../../../config/sendMail.js';
import { sendProjectInviteTokenTemplate } from '../../templates/projectTemplates/sendInviteToken.template.js';
import eventBus from '../eventBus.events.js';

eventBus.on('project.invite_member', async (data) => {
    const {
        token,
        email,
        projectName,
        inviterName,
        invitedUserName
    } = data;

    const inviteLink = `${process.env.FRONTEND_URL}/project-invite?token=${token}`;

    await sendEmail({
        to: email,
        subject: `Invitation to join project: ${projectName}`,
        html: sendProjectInviteTokenTemplate({
            invitedUserName,
            email,
            projectName,
            inviterName,
            inviteLink
        })
    });
});