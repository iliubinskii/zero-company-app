import { CategoryCreate, CategoryUpdate } from "./categories";
import { Equals } from "ts-toolbelt/out/Any/Equals";
import { preprocessBoolean } from "./common";
import zod from "zod";

const description = zod.string().min(1);

const name = zod.string().min(1);

const pinned = preprocessBoolean(zod.boolean());

const tagline = zod.string().min(1);

export const CategoryCreateValidationSchema = zod.strictObject({
  description,
  name,
  pinned: pinned.optional(),
  tagline
});

export const CategoryUpdateValidationSchema = zod.strictObject({
  description: description.optional(),
  name: name.optional(),
  pinned: pinned.optional(),
  tagline: tagline.optional()
});

// Type check the category create validation schema
((): Equals<
  keyof zod.infer<typeof CategoryCreateValidationSchema>,
  keyof CategoryCreate
> => 1)();

// Type check the category update validation schema
((): Equals<
  keyof zod.infer<typeof CategoryUpdateValidationSchema>,
  keyof CategoryUpdate
> => 1)();