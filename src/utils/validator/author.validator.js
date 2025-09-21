import Joi from "joi";  

const full_name = Joi.string().trim().required().messages({
  "string.base": "Author full_name must be a string",
  "string.empty": "Author full_name cannot be empty",
  "any.required": "Author full_name is required"
});

const date_of_birth = Joi.date().required().messages({
  "date.base": "Author date_of_birth must be a valid date",
  "any.required": "Author date_of_birth is required"
});

const date_of_death = Joi.date().allow(null).messages({
  "date.base": "Author date_of_death must be a valid date"
});

const bio = Joi.string().trim().min(10).required().messages({
  "string.base": "Author bio must be a string",
  "string.empty": "Author bio cannot be empty",
  "string.min": "Author bio must be at least 10 characters long",
  "any.required": "Author bio is required"
});

const years_active = Joi.string().trim().required().messages({
  "string.base": "Years active must be a string",
  "string.empty": "Years active cannot be empty",
  "any.required": "Years active is required"
});

const photo = Joi.string().uri().messages({
  "string.base": "Photo must be a string",
  "string.empty": "Photo URL cannot be empty",
  "string.uri": "Photo must be a valid URL",
});

const public_id = Joi.string().uri().messages({
  "string.base": "public_id must be a string",
  "string.empty": "public_id URL cannot be empty",
  "string.uri": "public_id must be a valid URL",
});

const period = Joi.string().hex().length(24).required().messages({
  "string.base": "Period must be a string",
  "string.empty": "Period cannot be empty",
  "string.hex": "Period must be a valid ObjectId",
  "string.length": "Period must be 24 characters long",
  "any.required": "Period is required"
});

let authorSchema = Joi.object({full_name, date_of_birth, date_of_death, bio, years_active, photo, period, public_id });

const createAuthorSchema = (data) => {
  const schemaFields = {};

  if ("full_name" in data) schemaFields.full_name = full_name;
  if ("date_of_birth" in data) schemaFields.date_of_birth = date_of_birth;
  if ("date_of_death" in data) schemaFields.date_of_death = date_of_death;
  if ("bio" in data) schemaFields.bio = bio;
  if ("years_active" in data) schemaFields.years_active = years_active;
  if ("photo" in data) schemaFields.photo = photo;
  if ("period" in data) schemaFields.period = period;
  if ("public_id" in data) schemaFields.public_id = public_id;

  return Joi.object(schemaFields);
};

export  { createAuthorSchema, authorSchema };
