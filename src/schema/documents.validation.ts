import {
  DigitalDocumentValidationSchema,
  DocType,
  IdValidationSchema,
  SignatoryValidationSchema
} from "./common";
import type {
  DocumentCreate,
  DocumentUpdate,
  ExistingDocument
} from "./documents";
import type { ValidationResult } from "./common";
import zod from "zod";

const _id = IdValidationSchema;

const company = zod.string().min(1);

const createdAt = zod.string().min(1);

const doc = DigitalDocumentValidationSchema.optional();

const metadata = zod.string().min(1).optional();

const signatories = zod.array(SignatoryValidationSchema);

const type = zod.enum([DocType.FoundingAgreement]);

export const ExistingDocumentValidationSchema = zod.strictObject({
  _id,
  company,
  createdAt,
  doc,
  metadata,
  signatories,
  type
});

export const DocumentCreateValidationSchema =
  ExistingDocumentValidationSchema.omit({ _id: true });

export const DocumentUpdateValidationSchema = zod.strictObject({
  doc: doc.optional()
});

// Type check the existing document validation schema
((): ValidationResult<ExistingDocument> | undefined => {
  const result = ExistingDocumentValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the document create validation schema
((): ValidationResult<DocumentCreate> | undefined => {
  const result = DocumentCreateValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the document update validation schema
((): ValidationResult<DocumentUpdate> | undefined => {
  const result = DocumentUpdateValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();