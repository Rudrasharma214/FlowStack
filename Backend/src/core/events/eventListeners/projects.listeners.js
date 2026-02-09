import env from '../../../config/env.js';
import { sendEmail } from '../../../config/sendMail.js';
import { sendProjectInviteTokenTemplate } from '../../templates/projectTemplates/sendInviteToken.template.js';
import eventBus from '../eventBus.events.js';

eventBus.on('invite_member', async (data) => {
    const {
        token,
        email,
        projectName,
        inviterName,
        invitedUserName
    } = data;

    const inviteLink = `${env.FRONTEND_URL}/project-invite?token=${token}`;

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