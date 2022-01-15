import Joi from 'joi';

export const FileUploadSchema = Joi.object({
  folderId: Joi.string().max(16).min(16),

  password: Joi.string().min(4).max(256).default('').trim(),

  protected: Joi.boolean().default(true).required(),
});

export const FileDownloadSchema = Joi.object({
  'folder-key': Joi.string().min(4).max(256).trim(),
});

export const FilePatchSchema = Joi.object({
  name: Joi.string().min(4).max(256).trim(),
});
