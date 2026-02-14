import joi from 'joi';

export const createProjectSchema = joi.object({
  name: joi.string().max(255).required(),
  description: joi.string().max(1000).allow(null, ''),
});

export const updateProjectSchema = joi.object({
  name: joi.string().max(255).optional(),
  description: joi.string().max(1000).allow(null, '').optional(),
  status: joi
    .string()
    .valid('active', 'inactive', 'in_progress', 'completed')
    .optional(),
});
