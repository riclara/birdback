import Joi from 'joi'

const staffStatusValues = ['COURTESY', 'AFFILIATE', 'ACTIVE', 'CONSULTING', 'ASSOCIATE', 'COMMUNITY', 'HONORARY', 'TEACHING', 'PROVISIONAL']
const providerTypeValues = ['NP', 'MD', 'ARNP', 'PA', 'DPM', 'DO']
const statusValues = ['APPROVED', 'READY_FOR_REVIEW', 'AWAITING_DECISION', 'AWAITING_CREDENTIALS', 'UNDER_REVIEW', 'DENIED']

// common validations
const id = Joi.string().length(24).hex().required()
const providerType = Joi.string().valid(providerTypeValues)
const staffStatus = Joi.string().valid(staffStatusValues)
const status = Joi.string().valid(statusValues)

// schema for creation
const providerCreateDataSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  middleName: Joi.string().length(1).uppercase().required(),
  email: Joi.string().email().required(),
  specialty: id,
  projectedStartDate: Joi.date().iso().required(),
  employerId: Joi.number().required(),
  providerType,
  staffStatus,
  assignedTo: Joi.number().required(),
  status,
  createdBy: Joi.number().required()
})

// schema for update
const providerUpdateDataSchema = Joi.object().keys({
  _id: id,
  firstName: Joi.string(),
  lastName: Joi.string(),
  middleName: Joi.string().length(1).uppercase(),
  email: Joi.string().email(),
  specialty: Joi.string().length(24).hex(),
  projectedStartDate: Joi.date().iso(),
  employerId: Joi.number(),
  providerType,
  staffStatus,
  assignedTo: Joi.number(),
  status,
  updatedBy: Joi.number().required()
})

const providerIdDataSchema = Joi.object().keys({
  _id: id
})

export default {
  'get/:id': providerIdDataSchema,
  'delete/:id': providerIdDataSchema,
  'post/': providerCreateDataSchema,
  'put/': providerUpdateDataSchema
}
