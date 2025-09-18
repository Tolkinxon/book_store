import Joi from "joi";

const title = Joi.string().trim().required().messages({
  "string.base": "Book title must be a string",
  "string.empty": "Book title cannot be empty",
  "any.required": "Book title is required"
});

const pages = Joi.number().min(10).required().messages({
  "number.base": "Book pages must be a number",
  "number.min": "Book pages must be at least 10",
  "any.required": "Book pages is required"
});

const published_year = Joi.number().required().messages({
  "number.base": "Published year must be a number",
  "any.required": "Published year is required"
});

const genre = Joi.string().trim().required().messages({
  "string.base": "Book genre must be a string",
  "string.empty": "Book genre cannot be empty",
  "any.required": "Book genre is required"
});

const publisher = Joi.string().trim().required().messages({
  "string.base": "Publisher must be a string",
  "string.empty": "Publisher cannot be empty",
  "any.required": "Publisher is required"
});

const author = Joi.string().hex().length(24).required().messages({
  "string.base": "Book author must be a string",
  "string.empty": "Book author cannot be empty",
  "string.hex": "Book author must be a valid ObjectId",
  "string.length": "Book author must be 24 characters long",
  "any.required": "Book author is required"
});

const description = Joi.string().trim().min(20).required().messages({
  "string.base": "Book description must be a string",
  "string.empty": "Book description cannot be empty",
  "string.min": "Book description must be at least 20 characters long",
  "any.required": "Book description is required"
});

const cover_image = Joi.string().uri().required().messages({
  "string.base": "Book cover image must be a string",
  "string.empty": "Book cover image cannot be empty",
  "string.uri": "Book cover image must be a valid URL",
  "any.required": "Book cover image is required"
});

const period = Joi.string().hex().length(24).required().messages({
  "string.base": "Period must be a string",
  "string.empty": "Period cannot be empty",
  "string.hex": "Period must be a valid ObjectId",
  "string.length": "Period must be 24 characters long",
  "any.required": "Period is required"
});

let bookSchema = Joi.object({
  title,
  pages,
  published_year,
  genre,
  publisher,
  author,
  description,
  cover_image,
  period
});

const createBookSchema = (data) => {
  const schemaFields = {};

  if ("title" in data) schemaFields.title = title;
  if ("pages" in data) schemaFields.pages = pages;
  if ("published_year" in data) schemaFields.published_year = published_year;
  if ("genre" in data) schemaFields.genre = genre;
  if ("publisher" in data) schemaFields.publisher = publisher;
  if ("author" in data) schemaFields.author = author;
  if ("description" in data) schemaFields.description = description;
  if ("cover_image" in data) schemaFields.cover_image = cover_image;
  if ("period" in data) schemaFields.period = period;

  return Joi.object(schemaFields);
};

export { createBookSchema, bookSchema };
