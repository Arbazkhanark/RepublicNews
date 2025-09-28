// import { type NextRequest, NextResponse } from "next/server"
// import { withAdminAuth, withAuth } from "@/lib/auth/middleware"
// import Article from "@/lib/models/Articles"
// import { connectToDatabase } from "@/lib/mongodb";
// import { Category } from "@/lib/models/Category"
// import {User} from "@/lib/models/User"
// import slugify from "slugify";

// // Get single news article
// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     // const article = findNews({ _id: params.id })
//     await connectToDatabase();
//     const { id } = await params;
//     const article = await Article.findOne({ _id: id })
//     .populate('categoryId').populate('authorId');
//     console.log(article, "ARTICLEEEEEEEEEEEEEEEEEEEEEEE")

//     if (!article) {
//       return NextResponse.json({ error: "Article not found" }, { status: 404 })
//     }

//     return NextResponse.json({ article })
//   } catch (error) {
//     console.error("Get article error:", error)
//     return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 })
//   }
// }












// /**
//  * Utility: Standard Response
//  */
// const response = (
//   success: boolean,
//   data: any = null,
//   message: string = "",
//   status: number = 200
// ) => {
//   return NextResponse.json({ success, message, data }, { status });
// };

// /**
//  * PATCH: Update an article
//  */
// export const PATCH = withAdminAuth(async (req: NextRequest,{ params }: { params: { id: string } }) => {
//   try {
//     const url = req.nextUrl || new URL(req.url)
//     const id = url.pathname.split("/").pop() || ""
//     console.log(id,"IDDDDDDDDDDDDDDDDDDDDDDD")
//     const body = await req.json();
//     // const user = req.body?.user; // from withAuth

//     await connectToDatabase();

//     const article = await Article.findById(id);
//     if (!article) {
//       return response(false, null, "Article not found", 404);
//     }


//     const {
//       title,
//       titleHi,
//       content,
//       contentHi,
//       excerpt,
//       status,
//       category,
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
//     } = body;

//     // ✅ If updating slug/title
//     if (title) {
//       const slug = slugify(title, { lower: true, strict: true });
//       const exists = await Article.findOne({ slug, _id: { $ne: id } });
//       if (exists) {
//         return response(false, null, "Another article with this title already exists", 409);
//       }
//       article.slug = slug;
//       article.title = title;
//     }

//     if (titleHi) {
//       const slugHi = slugify(titleHi, { lower: true, strict: true, locale: "hi" });
//       const existsHi = await Article.findOne({ slugHi, _id: { $ne: id } });
//       if (existsHi) {
//         return response(false, null, "Another article with this Hindi title already exists", 409);
//       }
//       article.slugHi = slugHi;
//       article.titleHi = titleHi;
//     }

//     // ✅ Update fields
//     if (content) article.content = content;
//     if (contentHi) article.contentHi = contentHi;
//     if (excerpt) article.excerpt = excerpt;
//     if (status) article.status = status;
//     if (category) article.categoryId = category;
//     if (featuredImage) article.featuredImage = featuredImage;
//     if (mediaUrls) article.mediaUrls = mediaUrls;
//     if (sourcePersonName) article.sourcePersonName = sourcePersonName;
//     if (sourcePersonNameHi) article.sourcePersonNameHi = sourcePersonNameHi;
//     if (sourcePersonSocial) article.sourcePersonSocial = sourcePersonSocial;
//     if (layoutConfig) article.layoutConfig = layoutConfig;
//     if (seoTitle) article.seoTitle = seoTitle;
//     if (seoDescription) article.seoDescription = seoDescription;
//     if (seoKeywords) article.seoKeywords = seoKeywords;
//     if (scheduledAt) article.scheduledAt = new Date(scheduledAt);

//     // ✅ Update publishedAt if status changed
//     if (status === "published" && !article.publishedAt) {
//       article.publishedAt = new Date();
//     }
//     if (status === "draft") {
//       article.publishedAt = null;
//     }

//     await article.save();

//     return response(true, { id: article._id }, "Article updated successfully", 200);
//   } catch (err: any) {
//     console.log("PATCH /articles/:id error:", err);
//     return response(false, null, "Failed to update article", 500);
//   }
// });

// /**
//  * DELETE: Delete an article
//  */
// export const DELETE = withAdminAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
//   try {

//     const url = req.nextUrl || new URL(req.url);
//     const id = url.pathname.split("/").pop() || "";

//     await connectToDatabase();

//     const article = await Article.findById(id);
//     if (!article) {
//       return response(false, null, "Article not found", 404);
//     }

//     await Article.findByIdAndDelete(id);

//     return response(true, null, "Article deleted successfully", 200);
//   } catch (err: any) {
//     console.log("DELETE /articles/:id error:", err);
//     return response(false, null, "Failed to delete article", 500);
//   }
// });






















import { NextRequest, NextResponse } from "next/server"
import { withAdminAuth, withAuth } from "@/lib/auth/middleware"
import slugify from "slugify"
import { connectToDatabase } from "@/lib/mongodb"
import { getArticleModel, getCategoryModel, getUserModel } from "@/lib/models"
// import { Article } from "@/lib/models/index"

// Utility: Standard Response
const response = (
  success: boolean,
  data: any = null,
  message: string = "",
  status: number = 200
) => {
  return NextResponse.json({ success, message, data }, { status })
}

// Get single article by ID
export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase()
    
    const { id } =await params;
    getUserModel();
    getCategoryModel();
    const Article= getArticleModel();
    const article = await Article.findById(id)
      .populate('author','name email profileImage socialLinks') // Updated field name
      .populate('categories', 'name slug') // Updated field name


      console.log(article, "ARTICLEEEEEEEEEEEEEEEEEEEEEEE");

    if (!article) {
      return response(false, null, "Article not found", 404)
    }

    return response(true, article, "Article fetched successfully")
  } catch (error) {
    console.error("Get article error:", error)
    return response(false, null, "Failed to fetch article", 500)
  }
}

// Update article
export const PATCH = withAdminAuth(async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDatabase()
    const { id } = params
    const body = await req.json()

    const Article= getArticleModel();
    const article = await Article.findById(id)
    if (!article) {
      return response(false, null, "Article not found", 404)
    }

    const {
      title,
      titleHi,
      content,
      contentHi,
      excerpt,
      status,
      categories, // Updated field name (array of category IDs)
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
      allowComments
    } = body

    // ✅ If updating slug/title
    if (title) {
      const slug = slugify(title, { lower: true, strict: true })
      const exists = await Article.findOne({ slug, _id: { $ne: id } })
      if (exists) {
        return response(false, null, "Another article with this title already exists", 409)
      }
      article.slug = slug
      article.title = title
    }

    if (titleHi) {
      const slugHi = slugify(titleHi, { lower: true, strict: true, locale: "hi" })
      const existsHi = await Article.findOne({ slugHi, _id: { $ne: id } })
      if (existsHi) {
        return response(false, null, "Another article with this Hindi title already exists", 409)
      }
      article.slugHi = slugHi
      article.titleHi = titleHi
    }

    // ✅ Update fields according to new schema
    if (content !== undefined) article.content = content
    if (contentHi !== undefined) article.contentHi = contentHi
    if (excerpt !== undefined) article.excerpt = excerpt
    if (status !== undefined) article.status = status
    if (categories !== undefined) article.categories = categories // Updated field name
    if (featuredImage !== undefined) article.featuredImage = featuredImage
    if (mediaUrls !== undefined) article.mediaUrls = mediaUrls
    if (sourcePersonName !== undefined) article.sourcePersonName = sourcePersonName
    if (sourcePersonNameHi !== undefined) article.sourcePersonNameHi = sourcePersonNameHi
    if (sourcePersonSocial !== undefined) article.sourcePersonSocial = sourcePersonSocial
    if (layoutConfig !== undefined) article.layoutConfig = layoutConfig
    if (seoTitle !== undefined) article.seoTitle = seoTitle
    if (seoDescription !== undefined) article.seoDescription = seoDescription
    if (seoKeywords !== undefined) article.seoKeywords = seoKeywords
    if (scheduledAt !== undefined) article.scheduledAt = new Date(scheduledAt)
    if (tags !== undefined) article.tags = tags
    if (isFeatured !== undefined) article.isFeatured = isFeatured
    if (isBreaking !== undefined) article.isBreaking = isBreaking
    if (allowComments !== undefined) article.allowComments = allowComments

    // ✅ Update publishedAt if status changed to published
    if (status === "published" && !article.publishedAt) {
      article.publishedAt = new Date()
    }
    
    // ✅ If status changed to draft, reset publishedAt
    if (status === "draft") {
      article.publishedAt = null
    }

    // ✅ Auto-generate excerpt if not provided and content is updated
    if ((content !== undefined || contentHi !== undefined) && !excerpt) {
      const contentToUse = content || contentHi || ""
      article.excerpt = contentToUse.substring(0, 150) + (contentToUse.length > 150 ? "..." : "")
    }

    // ✅ Update meta information if needed
    if (body.meta) {
      if (body.meta.views !== undefined) article.meta.views = body.meta.views
      if (body.meta.likes !== undefined) article.meta.likes = body.meta.likes
      if (body.meta.shares !== undefined) article.meta.shares = body.meta.shares
    }

    await article.save()

    // Populate the updated article for response
    const updatedArticle = await Article.findById(id)
      .populate('author', 'name email profileImage')
      .populate('categories', 'name slug')

    return response(true, updatedArticle, "Article updated successfully", 200)
  } catch (err: any) {
    console.error("PATCH /articles/:id error:", err)
    return response(false, null, "Failed to update article", 500)
  }
})

// Delete article
export const DELETE = withAdminAuth(async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDatabase()
    const { id } = params

    const Article= getArticleModel();
    const article = await Article.findById(id)
    if (!article) {
      return response(false, null, "Article not found", 404)
    }

    await Article.findByIdAndDelete(id)

    return response(true, null, "Article deleted successfully", 200)
  } catch (err: any) {
    console.error("DELETE /articles/:id error:", err)
    return response(false, null, "Failed to delete article", 500)
  }
})