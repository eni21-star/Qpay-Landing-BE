import { HydratedDocument, InferSchemaType, Schema, model } from 'mongoose';

const contactSubmissionSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 255,
      index: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    sourceIp: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type ContactSubmissionDocument = HydratedDocument<
  InferSchemaType<typeof contactSubmissionSchema>
>;

export const ContactSubmissionModel = model('ContactSubmission', contactSubmissionSchema);
