import joi from 'joi';

export const projectMemberInviteSchema = joi.object({
    name: joi.string().min(2).max(100).required().messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name cannot exceed 100 characters',
        'any.required': 'Name is required'
    }),
    email: joi.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required'
    })
});