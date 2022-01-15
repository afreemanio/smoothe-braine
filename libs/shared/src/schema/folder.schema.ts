import Joi from 'joi';

export const CreateFolderSchema = Joi.object({
  password: Joi.string().min(4).max(256).default('').trim(),

  protected: Joi.boolean().default(true).required(),
});

export const FolderDownloadSchema = Joi.object({
  'folder-key': Joi.string().min(4).max(256).trim(),
});

export const FolderPatchSchema = Joi.object({
  name: Joi.string().min(4).max(256).trim(),

  'folder-key': Joi.string().min(4).max(256).trim(),

  password: Joi.string().min(4).max(256).default('').trim(),

  protected: Joi.boolean(),
});

export const FolderAccessSchema = Joi.object({
  id: Joi.string().min(16).max(16).alphanum().lowercase().required(),

  userId: Joi.string().max(16).min(16),
});

export const FolderKeySchema = Joi.object({
  'folder-key': Joi.string().min(4).max(256).trim(),
});
