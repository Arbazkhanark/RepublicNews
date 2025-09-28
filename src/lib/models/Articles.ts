// import type { ObjectId } from "mongodb"

// export interface News {
//   _id?: ObjectId
//   title: string
//   subtitle?: string
//   slug: string
//   content: string
//   excerpt: string
//   featuredImage?: string
//   gallery?: string[]
//   videos?: string[]
//   category: ObjectId
//   tags: string[]
//   author: ObjectId // Writer who created the news
//   contributor?: ObjectId // Person who brought the news
//   contributorName?: string
//   contributorSocialLinks?: {
//     twitter?: string
//     facebook?: string
//     instagram?: string
//     linkedin?: string
//   }
//   status: "draft" | "published" | "archived"
//   language: "en" | "hi"
//   translations?: {
//     title?: string
//     subtitle?: string
//     content?: string
//     excerpt?: string
//   }
//   layout: "standard" | "featured" | "minimal" | "magazine"
//   seoTitle?: string
//   seoDescription?: string
//   seoKeywords?: string[]
//   publishedAt?: Date
//   scheduledAt?: Date
//   views: number
//   likes: number
//   shares: number
//   readingTime: number
//   isBreaking: boolean
//   isFeatured: boolean
//   isSticky: boolean
//   createdAt: Date
//   updatedAt: Date
// }

// export interface NewsComment {
//   _id?: ObjectId
//   newsId: ObjectId
//   name: string
//   email: string
//   comment: string
//   isApproved: boolean
//   parentId?: ObjectId // For nested comments
//   createdAt: Date
// }






// import mongoose, { Schema, type Document } from "mongoose"

// export interface INews extends Document {
//   title: string
//   slug: string
//   content: string
//   excerpt: string
//   category: mongoose.Types.ObjectId
//   author: mongoose.Types.ObjectId
//   contributor?: mongoose.Types.ObjectId
//   contributorName?: string
//   contributorSocialLinks?: Record<string, string>
//   status: "draft" | "published" | "archived"
//   language: "en" | "hi"
//   layout: "standard" | "featured" | "minimal" | "magazine"
//   views: number
//   likes: number
//   shares: number
//   readingTime: number
//   isBreaking: boolean
//   isFeatured: boolean
//   isSticky: boolean
//   createdAt: Date
//   updatedAt: Date
// }

// const NewsSchema = new Schema<INews>(
//   {
//     title: { type: String, required: true },
//     slug: { type: String, required: true, unique: true },
//     content: { type: String, required: true },
//     excerpt: { type: String, required: true },
//     category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
//     author: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     contributor: { type: Schema.Types.ObjectId, ref: "User" },
//     contributorName: String,
//     contributorSocialLinks: { type: Map, of: String },
//     status: { type: String, enum: ["draft", "published", "archived"], required: true },
//     language: { type: String, enum: ["en", "hi"], required: true },
//     layout: { type: String, enum: ["standard", "featured", "minimal", "magazine"], required: true },
//     views: { type: Number, default: 0 },
//     likes: { type: Number, default: 0 },
//     shares: { type: Number, default: 0 },
//     readingTime: Number,
//     isBreaking: { type: Boolean, default: false },
//     isFeatured: { type: Boolean, default: false },
//     isSticky: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// )

// export const News = mongoose.models.News || mongoose.model<INews>("News", NewsSchema)
















// import mongoose, { Schema, Document, Types } from "mongoose";

// export interface ISourcePersonSocial {
//   twitter?: string;
//   facebook?: string;
//   instagram?: string;
//   linkedin?: string;
// }

// export interface ILayoutConfig {
//   showAuthor: boolean;
//   showDate: boolean;
//   showCategory: boolean;
//   showSocialShare: boolean;
//   imagePosition: "top" | "left" | "right" | "center";
//   textAlign: "left" | "center" | "right" | "justify";
// }

// export interface IArticle extends Document {
//   title?: string; // English title (optional if Hindi exists)
//   titleHi?: string; // Hindi title (optional if English exists)
//   subtitle?: string;
//   subtitleHi?: string;
//   content?: string; // English content (optional if Hindi exists)
//   contentHi?: string; // Hindi content (optional if English exists)
//   excerpt?: string;
//   excerptHi?: string;
//   slug?: string;
//   slugHi?: string;
//   categoryId: Types.ObjectId;
//   featuredImage?: string;
//   heroArticle?: boolean;
//   mediaUrls: string[];
//   sourcePersonName?: string;
//   sourcePersonNameHi?: string;
//   sourcePersonSocial: ISourcePersonSocial;
//   layoutConfig: ILayoutConfig;
//   status: "draft" | "published" | "archived";
//   authorId: Types.ObjectId;
//   publishedAt?: Date;
//   views: number;
//   likes: number;
//   shares: number;
//   createdAt: Date;
//   updatedAt: Date;

//   // 👇 Custom method
//   generateSlug(text: string, isHindi?: boolean): string;
// }

// const SourcePersonSocialSchema = new Schema<ISourcePersonSocial>({
//   twitter: { type: String, default: "" },
//   facebook: { type: String, default: "" },
//   instagram: { type: String, default: "" },
//   linkedin: { type: String, default: "" },
// });

// const LayoutConfigSchema = new Schema<ILayoutConfig>({
//   showAuthor: { type: Boolean, default: true },
//   showDate: { type: Boolean, default: true },
//   showCategory: { type: Boolean, default: true },
//   showSocialShare: { type: Boolean, default: true },
//   imagePosition: {
//     type: String,
//     enum: ["top", "left", "right", "center"],
//     default: "top",
//   },
//   textAlign: {
//     type: String,
//     enum: ["left", "center", "right", "justify"],
//     default: "left",
//   },
// });

// const ArticleSchema = new Schema<IArticle>(
//   {
//     // 🔹 Multilingual Fields
//     title: { type: String, trim: true, maxlength: 200 },
//     titleHi: { type: String, trim: true, maxlength: 200 },
//     subtitle: { type: String, trim: true, maxlength: 300 },
//     subtitleHi: { type: String, trim: true, maxlength: 300 },
//     content: { type: String },
//     contentHi: { type: String },
//     excerpt: { type: String, trim: true, maxlength: 500 },
//     excerptHi: { type: String, trim: true, maxlength: 500 },

//     // 🔹 Slugs (unique but optional)
//     slug: { type: String, unique: true, sparse: true, lowercase: true },
//     slugHi: { type: String, unique: true, sparse: true },

//     // 🔹 Relations
//     // categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
//     categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
//     authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },

//     // 🔹 Media
//     featuredImage: { type: String, default: "" },
//     heroArticle: { type: Boolean, default: false },
//     mediaUrls: [{ type: String }],

//     // 🔹 Source info
//     sourcePersonName: { type: String, trim: true },
//     sourcePersonNameHi: { type: String, trim: true },
//     sourcePersonSocial: { type: SourcePersonSocialSchema, default: () => ({}) },

//     // 🔹 Layout options
//     layoutConfig: { type: LayoutConfigSchema, default: () => ({}) },

//     // 🔹 Status
//     status: {
//       type: String,
//       enum: ["draft", "published", "archived"],
//       default: "draft",
//     },
//     publishedAt: { type: Date },

//     // 🔹 Analytics
//     views: { type: Number, default: 0 },
//     likes: { type: Number, default: 0 },
//     shares: { type: Number, default: 0 },
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }
// );

// // 📌 Indexes
// ArticleSchema.index({ status: 1, publishedAt: -1 });
// ArticleSchema.index({ categoryId: 1, status: 1 });
// ArticleSchema.index({ authorId: 1, status: 1 });
// ArticleSchema.index({ slug: 1 });
// ArticleSchema.index({ slugHi: 1 });

// // 📌 Virtual Relations
// ArticleSchema.virtual("category", {
//   ref: "Category",
//   localField: "categoryId",
//   foreignField: "_id",
//   justOne: true,
// });

// ArticleSchema.virtual("author", {
//   ref: "User",
//   localField: "authorId",
//   foreignField: "_id",
//   justOne: true,
// });

// // 📌 Slug Method
// ArticleSchema.methods.generateSlug = function (
//   text: string,
//   isHindi: boolean = false
// ): string {
//   const slug = text
//     .toLowerCase()
//     .replace(/[^\w\u0900-\u097F]+/g, "-") // allow Hindi chars
//     .replace(/^-+|-+$/g, "")
//     .substring(0, 100);

//   const timestamp = Date.now().toString(36);
//   return `${slug}-${timestamp}`;
// };

// // 📌 Slug generation + validation
// ArticleSchema.pre<IArticle>("save", function (next) {
//   if (!this.title && !this.titleHi) {
//     return next(
//       new Error("At least one title (English or Hindi) is required.")
//     );
//   }
//   if (!this.content && !this.contentHi) {
//     return next(
//       new Error("At least one content (English or Hindi) is required.")
//     );
//   }

//   if (this.isModified("title") && this.title) {
//     this.slug = this.generateSlug(this.title);
//   }
//   if (this.isModified("titleHi") && this.titleHi) {
//     this.slugHi = this.generateSlug(this.titleHi, true);
//   }

//   if (this.isModified("status") && this.status === "published" && !this.publishedAt) {
//     this.publishedAt = new Date();
//   }

//   next();
// });

// const Article =
//   mongoose.models.Article ||
//   mongoose.model<IArticle>("Article", ArticleSchema);

// export default Article;



















// models/Article.ts
import mongoose, { Schema, type Document } from 'mongoose';
import { registerModel } from '../mongodb';
import { getUserModel } from "@/lib/models/User";


export interface IArticle extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  author: mongoose.Types.ObjectId;
  categories: mongoose.Types.ObjectId[];
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  meta: {
    views: number;
    likes: number;
    shares: number;
  };
  seoTitle?: string;
  seoDescription?: string;
  isFeatured: boolean;
  isBreaking: boolean;
  allowComments: boolean;
  createdBy: mongoose.Types.ObjectId;
  updatedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 200
    },
    slug: { 
      type: String, 
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    content: { 
      type: String, 
      required: true 
    },
    excerpt: { 
      type: String,
      maxlength: 300 
    },
    featuredImage: { 
      type: String,
      default: null
    },
    author: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    categories: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Category',
      required: true 
    }],
    tags: [{ 
      type: String,
      trim: true,
      lowercase: true
    }],
    status: { 
      type: String, 
      enum: ['draft', 'published', 'archived'], 
      default: 'draft' 
    },
    publishedAt: { 
      type: Date,
      default: null
    },
    meta: {
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      shares: { type: Number, default: 0 }
    },
    seoTitle: { 
      type: String,
      maxlength: 200 
    },
    seoDescription: { 
      type: String,
      maxlength: 300 
    },
    isFeatured: { 
      type: Boolean, 
      default: false 
    },
    isBreaking: { 
      type: Boolean, 
      default: false 
    },
    allowComments: { 
      type: Boolean, 
      default: true 
    },
    createdBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    updatedBy: { 
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
// ArticleSchema.index({ slug: 1 }, { unique: true });
ArticleSchema.index({ author: 1 });
ArticleSchema.index({ categories: 1 });
ArticleSchema.index({ status: 1 });
ArticleSchema.index({ publishedAt: -1 });
ArticleSchema.index({ isFeatured: 1 });
ArticleSchema.index({ isBreaking: 1 });
ArticleSchema.index({ 'meta.views': -1 });
ArticleSchema.index({ 'meta.likes': -1 });
ArticleSchema.index({ tags: 1 });
ArticleSchema.index({ createdAt: -1 });

// Virtual for reading time
ArticleSchema.virtual('readingTime').get(function(this: IArticle) {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
});

// Virtual for featured image URL
ArticleSchema.virtual('featuredImageURL').get(function(this: IArticle) {
  return this.featuredImage ? `/uploads/articles/${this.featuredImage}` : '/images/default-article.jpg';
});

// Pre-save middleware
ArticleSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '-');
  }
  
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  // Auto-generate excerpt from content if not provided
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 150) + '...';
  }
  
  next();
});

// export const Article = registerModel<IArticle>('Article', ArticleSchema);

export function getArticleModel() {
  return registerModel<IArticle>('Article', ArticleSchema);
}