// import { NextRequest, NextResponse } from "next/server"
// import { withAdminAuth, withAuth } from "@/lib/auth/middleware"
// import slugify from "slugify"
// import { connectToDatabase } from "@/lib/mongodb"
// import { getArticleModel, getCategoryModel, getUserModel } from "@/lib/models"
// // import { Article } from "@/lib/models/index"

// // Utility: Standard Response
// const response = (
//   success: boolean,
//   data: any = null,
//   message: string = "",
//   status: number = 200
// ) => {
//   return NextResponse.json({ success, message, data }, { status })
// }

// // Get single article by ID
// export async function GET(
//   request: NextRequest, 
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectToDatabase()
    
//     const { id } =await params;
//     getUserModel();
//     getCategoryModel();
//     const Article= getArticleModel();
//     const article = await Article.findById(id)
//       .populate('author','name email profileImage socialLinks') // Updated field name
//       .populate('categories', 'name slug') // Updated field name


//       console.log(article, "ARTICLEEEEEEEEEEEEEEEEEEEEEEE");

//     if (!article) {
//       return response(false, null, "Article not found", 404)
//     }

//     return response(true, article, "Article fetched successfully")
//   } catch (error) {
//     console.error("Get article error:", error)
//     return response(false, null, "Failed to fetch article", 500)
//   }
// }

// // Update article
// export const PATCH = withAdminAuth(async (
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) => {
//   try {
//     await connectToDatabase()
//     const { id } = params
//     const body = await req.json()

//     const Article= getArticleModel();
//     const article = await Article.findById(id)
//     if (!article) {
//       return response(false, null, "Article not found", 404)
//     }

//     const {
//       title,
//       titleHi,
//       content,
//       contentHi,
//       excerpt,
//       status,
//       categories, // Updated field name (array of category IDs)
//       featuredImage,
//       mediaUrls,
//       sourcePersonName,
//       sourcePersonNameHi,
//       sourcePersonSocial,
//       layoutConfig,
//       seoTitle,
//       seoDescription,
//       seoKeywords,
//       scheduledAt,
//       tags,
//       isFeatured,
//       isBreaking,
//       allowComments
//     } = body

//     // ✅ If updating slug/title
//     if (title) {
//       const slug = slugify(title, { lower: true, strict: true })
//       const exists = await Article.findOne({ slug, _id: { $ne: id } })
//       if (exists) {
//         return response(false, null, "Another article with this title already exists", 409)
//       }
//       article.slug = slug
//       article.title = title
//     }

//     if (titleHi) {
//       const slugHi = slugify(titleHi, { lower: true, strict: true, locale: "hi" })
//       const existsHi = await Article.findOne({ slugHi, _id: { $ne: id } })
//       if (existsHi) {
//         return response(false, null, "Another article with this Hindi title already exists", 409)
//       }
//       article.slugHi = slugHi
//       article.titleHi = titleHi
//     }

//     // ✅ Update fields according to new schema
//     if (content !== undefined) article.content = content
//     if (contentHi !== undefined) article.contentHi = contentHi
//     if (excerpt !== undefined) article.excerpt = excerpt
//     if (status !== undefined) article.status = status
//     if (categories !== undefined) article.categories = categories // Updated field name
//     if (featuredImage !== undefined) article.featuredImage = featuredImage
//     if (mediaUrls !== undefined) article.mediaUrls = mediaUrls
//     if (sourcePersonName !== undefined) article.sourcePersonName = sourcePersonName
//     if (sourcePersonNameHi !== undefined) article.sourcePersonNameHi = sourcePersonNameHi
//     if (sourcePersonSocial !== undefined) article.sourcePersonSocial = sourcePersonSocial
//     if (layoutConfig !== undefined) article.layoutConfig = layoutConfig
//     if (seoTitle !== undefined) article.seoTitle = seoTitle
//     if (seoDescription !== undefined) article.seoDescription = seoDescription
//     if (seoKeywords !== undefined) article.seoKeywords = seoKeywords
//     if (scheduledAt !== undefined) article.scheduledAt = new Date(scheduledAt)
//     if (tags !== undefined) article.tags = tags
//     if (isFeatured !== undefined) article.isFeatured = isFeatured
//     if (isBreaking !== undefined) article.isBreaking = isBreaking
//     if (allowComments !== undefined) article.allowComments = allowComments

//     // ✅ Update publishedAt if status changed to published
//     if (status === "published" && !article.publishedAt) {
//       article.publishedAt = new Date()
//     }
    
//     // ✅ If status changed to draft, reset publishedAt
//     if (status === "draft") {
//       article.publishedAt = null
//     }

//     // ✅ Auto-generate excerpt if not provided and content is updated
//     if ((content !== undefined || contentHi !== undefined) && !excerpt) {
//       const contentToUse = content || contentHi || ""
//       article.excerpt = contentToUse.substring(0, 150) + (contentToUse.length > 150 ? "..." : "")
//     }

//     // ✅ Update meta information if needed
//     if (body.meta) {
//       if (body.meta.views !== undefined) article.meta.views = body.meta.views
//       if (body.meta.likes !== undefined) article.meta.likes = body.meta.likes
//       if (body.meta.shares !== undefined) article.meta.shares = body.meta.shares
//     }

//     await article.save()

//     // Populate the updated article for response
//     const updatedArticle = await Article.findById(id)
//       .populate('author', 'name email profileImage')
//       .populate('categories', 'name slug')

//     return response(true, updatedArticle, "Article updated successfully", 200)
//   } catch (err: any) {
//     console.error("PATCH /articles/:id error:", err)
//     return response(false, null, "Failed to update article", 500)
//   }
// })

// // Delete article
// export const DELETE = withAdminAuth(async (
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) => {
//   try {
//     await connectToDatabase()
//     const { id } = params

//     const Article= getArticleModel();
//     const article = await Article.findById(id)
//     if (!article) {
//       return response(false, null, "Article not found", 404)
//     }

//     await Article.findByIdAndDelete(id)

//     return response(true, null, "Article deleted successfully", 200)
//   } catch (err: any) {
//     console.error("DELETE /articles/:id error:", err)
//     return response(false, null, "Failed to delete article", 500)
//   }
// })









import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/auth/middleware";
import slugify from "slugify";
import { connectToDatabase } from "@/lib/mongodb";
import { getArticleModel, getCategoryModel, getUserModel, IArticle } from "@/lib/models";
import mongoose from "mongoose";

// Define proper types for response data
interface ResponseData {
  success: boolean;
  message: string;
  data: IArticle | null;
}

interface ErrorResponse {
  success: boolean;
  message: string;
  data: null;
}

// Type for request body with optional meta updates
interface UpdateArticleBody {
  title?: string;
  titleHi?: string;
  content?: string;
  contentHi?: string;
  excerpt?: string;
  status?: 'draft' | 'published' | 'archived';
  categories?: mongoose.Types.ObjectId[];
  featuredImage?: string;
  mediaUrls?: string[];
  sourcePersonName?: string;
  sourcePersonNameHi?: string;
  sourcePersonSocial?: string;
  layoutConfig?: Record<string, unknown>;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  scheduledAt?: string | Date;
  tags?: string[];
  isFeatured?: boolean;
  isBreaking?: boolean;
  allowComments?: boolean;
  meta?: {
    views?: number;
    likes?: number;
    shares?: number;
  };
}

// Utility: Standard Response
const response = (
  success: boolean,
  data: IArticle | null = null,
  message: string = "",
  status: number = 200
): NextResponse<ResponseData | ErrorResponse> => {
  return NextResponse.json({ success, message, data }, { status });
};

// GET handler (no auth middleware, so params can stay as is)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ResponseData | ErrorResponse>> {
  try {
    await connectToDatabase();

    const { id } = await params;

    getUserModel();
    getCategoryModel();
    const Article = getArticleModel();

    const article: IArticle | null = await Article.findById(id)
      .populate("author", "name email profileImage socialLinks")
      .populate("categories", "name slug");

    if (!article) {
      return response(false, null, "Article not found", 404);
    }

    return response(true, article, "Article fetched successfully");
  } catch (error: unknown) {
    console.error("Get article error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch article";
    return response(false, null, errorMessage, 500);
  }
}

// PATCH handler wrapped in withAdminAuth
export const PATCH = withAdminAuth(async (req: NextRequest) => {
  try {
    await connectToDatabase();

    // Extract ID from URL path (assuming URL like /api/articles/:id)
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return response(false, null, "ID parameter missing", 400);
    }

    const body: UpdateArticleBody = await req.json();

    const Article = getArticleModel();
    const article = await Article.findById(id);

    if (!article) {
      return response(false, null, "Article not found", 404);
    }

    const {
      title,
      titleHi,
      content,
      contentHi,
      excerpt,
      status,
      categories,
      featuredImage,
      mediaUrls,
      sourcePersonName,
      sourcePersonNameHi,
      sourcePersonSocial,
      layoutConfig,
      seoTitle,
      seoDescription,
      seoKeywords,
      scheduledAt,
      tags,
      isFeatured,
      isBreaking,
      allowComments,
      meta,
    } = body;

    if (title) {
      const slug = slugify(title, { lower: true, strict: true });
      const exists = await Article.findOne({ slug, _id: { $ne: id } });
      if (exists) {
        return response(false, null, "Another article with this title already exists", 409);
      }
      article.slug = slug;
      article.title = title;
    }

    if (titleHi) {
      const slugHi = slugify(titleHi, { lower: true, strict: true, locale: "hi" });
      const existsHi = await Article.findOne({ slugHi, _id: { $ne: id } });
      if (existsHi) {
        return response(false, null, "Another article with this Hindi title already exists", 409);
      }
      // Use proper type casting instead of any
      const articleWithHindi = article as IArticle & {
        slugHi?: string;
        titleHi?: string;
        contentHi?: string;
        mediaUrls?: string[];
        sourcePersonName?: string;
        sourcePersonNameHi?: string;
        sourcePersonSocial?: string;
        layoutConfig?: Record<string, unknown>;
        seoKeywords?: string[];
        scheduledAt?: Date;
      };
      
      articleWithHindi.slugHi = slugHi;
      articleWithHindi.titleHi = titleHi;
    }

    if (content !== undefined) article.content = content;
    
    if (contentHi !== undefined) {
      const articleWithHindi = article as IArticle & { contentHi?: string };
      articleWithHindi.contentHi = contentHi;
    }
    
    if (excerpt !== undefined) article.excerpt = excerpt;
    if (status !== undefined) article.status = status;
    if (categories !== undefined) article.categories = categories;
    if (featuredImage !== undefined) article.featuredImage = featuredImage;
    
    if (mediaUrls !== undefined) {
      const articleWithMedia = article as IArticle & { mediaUrls?: string[] };
      articleWithMedia.mediaUrls = mediaUrls;
    }
    
    if (sourcePersonName !== undefined) {
      const articleWithSource = article as IArticle & { sourcePersonName?: string };
      articleWithSource.sourcePersonName = sourcePersonName;
    }
    
    if (sourcePersonNameHi !== undefined) {
      const articleWithSourceHi = article as IArticle & { sourcePersonNameHi?: string };
      articleWithSourceHi.sourcePersonNameHi = sourcePersonNameHi;
    }
    
    if (sourcePersonSocial !== undefined) {
      const articleWithSocial = article as IArticle & { sourcePersonSocial?: string };
      articleWithSocial.sourcePersonSocial = sourcePersonSocial;
    }
    
    if (layoutConfig !== undefined) {
      const articleWithLayout = article as IArticle & { layoutConfig?: Record<string, unknown> };
      articleWithLayout.layoutConfig = layoutConfig;
    }
    
    if (seoTitle !== undefined) article.seoTitle = seoTitle;
    if (seoDescription !== undefined) article.seoDescription = seoDescription;
    
    if (seoKeywords !== undefined) {
      const articleWithSeo = article as IArticle & { seoKeywords?: string[] };
      articleWithSeo.seoKeywords = seoKeywords;
    }
    
    if (scheduledAt !== undefined) {
      const articleWithSchedule = article as IArticle & { scheduledAt?: Date };
      articleWithSchedule.scheduledAt = new Date(scheduledAt);
    }
    
    if (tags !== undefined) article.tags = tags;
    if (isFeatured !== undefined) article.isFeatured = isFeatured;
    if (isBreaking !== undefined) article.isBreaking = isBreaking;
    if (allowComments !== undefined) article.allowComments = allowComments;

    if (meta) {
      if (meta.views !== undefined) article.meta.views = meta.views;
      if (meta.likes !== undefined) article.meta.likes = meta.likes;
      if (meta.shares !== undefined) article.meta.shares = meta.shares;
    }

if (article) {
  if (status === "published" && !article.publishedAt) {
    article.publishedAt = new Date();
  }

  if (status === "draft") {
    article.publishedAt = null;
  }
}


    if ((content !== undefined || contentHi !== undefined) && !excerpt) {
      const contentToUse = content || contentHi || "";
      article.excerpt = contentToUse.substring(0, 150) + (contentToUse.length > 150 ? "..." : "");
    }

    await article.save();

    const updatedArticle = await Article.findById(id)
      .populate("author", "name email profileImage")
      .populate("categories", "name slug");

    return response(true, updatedArticle, "Article updated successfully", 200);
  } catch (error: unknown) {
    console.error("PATCH /articles/:id error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update article";
    return response(false, null, errorMessage, 500);
  }
});

// DELETE handler wrapped in withAdminAuth
export const DELETE = withAdminAuth(async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return response(false, null, "ID parameter missing", 400);
    }

    const Article = getArticleModel();
    const article = await Article.findById(id);

    if (!article) {
      return response(false, null, "Article not found", 404);
    }

    await Article.findByIdAndDelete(id);

    return response(true, null, "Article deleted successfully", 200);
  } catch (error: unknown) {
    console.error("DELETE /articles/:id error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to delete article";
    return response(false, null, errorMessage, 500);
  }
});