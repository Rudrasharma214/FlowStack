import { emailLayout } from '../../../config/emailTemplate.js';

export const sendProjectInviteTokenTemplate = ({
    invitedUserName,
    email,
    projectName,
    inviterName,
    inviteLink
}) => {

    const body = `

<!-- ================= TITLE ================= -->
<tr>
<td>
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">
<h1 style="
margin:0;
font-family:Arial,Helvetica,sans-serif;
font-size:26px;
font-weight:bold;
color:#111111;">
Project Invitation
</h1>
</td>
</tr>
</table>
</td>
</tr>

<tr><td height="20">&nbsp;</td></tr>

<!-- ================= GREETING ================= -->
<tr>
<td>
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="left" style="padding:0 40px;">
<p style="
margin:0;
font-family:Arial,Helvetica,sans-serif;
font-size:14px;
color:#333333;">
Hi ${invitedUserName} (${email}),
</p>
</td>
</tr>
</table>
</td>
</tr>

<tr><td height="25">&nbsp;</td></tr>

<!-- ================= MESSAGE ================= -->
<tr>
<td>
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="left" style="padding:0 40px;">
<p style="
margin:0;
font-family:Arial,Helvetica,sans-serif;
font-size:14px;
color:#555555;
line-height:22px;">
<strong>${inviterName}</strong> has invited you to collaborate on the project
<strong>${projectName}</strong>.
</p>
</td>
</tr>
</table>
</td>
</tr>

<tr><td height="30">&nbsp;</td></tr>

<!-- ================= CTA BUTTON ================= -->
<tr>
<td align="center">
<table cellpadding="0" cellspacing="0">
<tr>
<td bgcolor="#f6a545" style="border-radius:4px;">
<a href="${inviteLink}" style="
display:inline-block;
padding:12px 26px;
font-family:Arial,Helvetica,sans-serif;
font-size:14px;
color:#ffffff;
text-decoration:none;
font-weight:bold;">
View Invitation
</a>
</td>
</tr>
</table>
</td>
</tr>

<tr><td height="30">&nbsp;</td></tr>

<!-- ================= FOOTER NOTE ================= -->
<tr>
<td>
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="left" style="padding:0 40px;">
<p style="
margin:0;
font-family:Arial,Helvetica,sans-serif;
font-size:12px;
color:#777777;
line-height:18px;">
If you weren’t expecting this invitation, you can safely ignore this email.
</p>
</td>
</tr>
</table>
</td>
</tr>
`;

    return emailLayout({
        title: `Invitation to join ${projectName}`,
        body
    });
};
