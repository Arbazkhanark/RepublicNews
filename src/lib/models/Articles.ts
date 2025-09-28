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
  publishedAt?: Date | null;
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