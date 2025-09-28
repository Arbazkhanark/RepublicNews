// import mongoose, { Schema, Document, model, models } from "mongoose";
// import { ObjectId } from "mongodb";

// export interface INewsletterCampaign extends Document {
//   subject: string;
//   content: string;
//   htmlContent: string;
//   language: "en" | "hi" | "both";
//   status: "draft" | "scheduled" | "sent";
//   scheduledAt?: Date;
//   sentAt?: Date;
//   recipients: number;
//   opens: number;
//   clicks: number;
//   createdBy: ObjectId;
//   createdAt: Date;
// }

// const NewsletterCampaignSchema = new Schema<INewsletterCampaign>({
//   subject: { type: String, required: true },
//   content: { type: String, required: true },
//   htmlContent: { type: String, required: true },
//   language: { type: String, enum: ["en", "hi", "both"], required: true },
//   status: { type: String, enum: ["draft", "scheduled", "sent"], required: true },
//   scheduledAt: { type: Date },
//   sentAt: { type: Date },
//   recipients: { type: Number, required: true, default: 0 },
//   opens: { type: Number, required: true, default: 0 },
//   clicks: { type: Number, required: true, default: 0 },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   createdAt: { type: Date, required: true, default: Date.now },
// });

// // export const NewsletterCampaign = model<INewsletterCampaign>(
// //   "NewsletterCampaign",
// //   NewsletterCampaignSchema
// // );


// // ✅ Prevent OverwriteModelError:
// export const NewsletterCampaign =
//   models.NewsletterCampaign || model<INewsletterCampaign>("NewsletterCampaign", NewsletterCampaignSchema);

















// models/NewsletterCampaign.ts
import mongoose, { Schema, type Document } from 'mongoose';
import { registerModel } from '../mongodb';

export interface INewsletterCampaign extends Document {
  title: string;
  subject: string;
  content: string;
  template: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'cancelled';
  scheduledFor?: Date;
  sentAt?: Date;
  recipients: {
    allSubscribers: boolean;
    categories: mongoose.Types.ObjectId[];
    specificEmails: string[];
  };
  statistics: {
    totalRecipients: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
  };
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const NewsletterCampaignSchema = new Schema<INewsletterCampaign>(
  {
    title: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 200
    },
    subject: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 150
    },
    content: { 
      type: String, 
      required: true 
    },
    template: { 
      type: String, 
      default: 'default'
    },
    status: { 
      type: String, 
      enum: ['draft', 'scheduled', 'sending', 'sent', 'cancelled'], 
      default: 'draft' 
    },
    scheduledFor: { 
      type: Date,
      default: null
    },
    sentAt: { 
      type: Date,
      default: null
    },
    recipients: {
      allSubscribers: { type: Boolean, default: false },
      categories: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Category' 
      }],
      specificEmails: [{ 
        type: String,
        lowercase: true
      }]
    },
    statistics: {
      totalRecipients: { type: Number, default: 0 },
      delivered: { type: Number, default: 0 },
      opened: { type: Number, default: 0 },
      clicked: { type: Number, default: 0 },
      bounced: { type: Number, default: 0 },
      unsubscribed: { type: Number, default: 0 }
    },
    createdBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
  },
  { 
    timestamps: true 
  }
);

// Indexes
NewsletterCampaignSchema.index({ status: 1 });
NewsletterCampaignSchema.index({ scheduledFor: 1 });
NewsletterCampaignSchema.index({ sentAt: -1 });
NewsletterCampaignSchema.index({ createdAt: -1 });
NewsletterCampaignSchema.index({ createdBy: 1 });

// Pre-save middleware
NewsletterCampaignSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'sent' && !this.sentAt) {
    this.sentAt = new Date();
  }
  next();
});

// export const NewsletterCampaign = registerModel<INewsletterCampaign>('NewsletterCampaign', NewsletterCampaignSchema);

export function getNewsletterCampaignModel() {
  return registerModel<INewsletterCampaign>('NewsletterCampaign', NewsletterCampaignSchema);
}
