import eventBus from "../eventBus.events";

eventBus.on('user_signup', async (payload) => {
    // Handle user signup event
    // send verification email
});

eventBus.on('user_login', async (payload) => {
    // Handle user login event
    // login otp
});

eventBus.on('email_verification', async (payload) => {
    // Handle email verification event
    // welcome email
});

eventBus.on('reset_password', async (payload) => {
    // Handle reset password event
    // send reset password email
});

eventBus.on('successful_password_reset', async (payload) => {
    // Handle successful password reset event
    // send confirmation email
});

