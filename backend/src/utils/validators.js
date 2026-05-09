const Joi = require('joi');

const auditSchema = Joi.object({
  tools: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      plan: Joi.string().required(),
      monthlySpend: Joi.number().min(0).required(),
      seats: Joi.number().min(1).required(),
    })
  ).required(),
  teamSize: Joi.number().min(1).required(),
  primaryUseCase: Joi.string().optional().allow(''),
});

const leadSchema = Joi.object({
  email: Joi.string().email().required(),
  company: Joi.string().optional().allow(''),
  role: Joi.string().optional().allow(''),
  teamSize: Joi.number().optional().allow(null),
  reportId: Joi.string().required(),
});

module.exports = {
  auditSchema,
  leadSchema,
};
