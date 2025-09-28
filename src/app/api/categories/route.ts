// import { NextResponse } from "next/server";
// import slugify from "slugify";
// import { Category } from "@/lib/models/Category";
// import { connectToDatabase } from "@/lib/mongodb";
// import { withAdminAuth } from "@/lib/auth/middleware";

// export const GET = async () => {
//   try {
//     await connectToDatabase();
//     const categories = await Category.find({ isActive: true })
//       .sort({ order: 1 })
//       .lean();
//     return NextResponse.json({ categories });
//   } catch (error) {
//     console.error("Fetch categories error:", error);
//     return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
//   }
// };

// export const POST = withAdminAuth(async (req, user) => {
//   try {
//     await connectToDatabase();
//     const data = await req.json();
//     const { name, description, color, icon, parentId, order = 0, isActive = true, seoTitle, seoDescription } = data;

//     if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

//     const slug = slugify(name, { lower: true, strict: true });
//     const exists = await Category.findOne({ slug });
//     if (exists) return NextResponse.json({ error: "Category with this name already exists." }, { status: 409 });

//     const cat = new Category({ name, slug, description, color, icon, parentId: parentId || null, order, isActive, seoTitle, seoDescription });
//     await cat.save();
//     return NextResponse.json({ message: "Category created", category: cat }, { status: 201 });
//   } catch (error) {
//     console.error("Create category error:", error);
//     return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
//   }
// });

// export const PUT = withAdminAuth(async (req, user) => {
//   try {
//     await connectToDatabase();
//     const { id, ...updates } = await req.json();
//     if (!id) return NextResponse.json({ error: "Category ID is required" }, { status: 400 });

//     if (updates.name) updates.slug = slugify(updates.name, { lower: true, strict: true });
//     const updated = await Category.findByIdAndUpdate(id, updates, { new: true });
//     if (!updated) return NextResponse.json({ error: "Category not found" }, { status: 404 });

//     return NextResponse.json({ message: "Category updated", category: updated });
//   } catch (error) {
//     console.error("Update category error:", error);
//     return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
//   }
// });

// export const DELETE = withAdminAuth(async (req, user) => {
//   try {
//     await connectToDatabase();
//     const { id } = await req.json();
//     if (!id) return NextResponse.json({ error: "Category ID is required" }, { status: 400 });

//     const deleted = await Category.findByIdAndDelete(id);
//     if (!deleted) return NextResponse.json({ error: "Category not found" }, { status: 404 });

//     return NextResponse.json({ message: "Category deleted" });
//   } catch (error) {
//     console.error("Delete category error:", error);
//     return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
//   }
// });
















import { NextResponse, type NextRequest } from "next/server"
import slugify from "slugify"
import { connectToDatabase } from "@/lib/mongodb"
// import { Category } from "@/lib/models/index"
import { withAdminAuth } from "@/lib/auth/middleware"
import { getCategoryModel } from "@/lib/models"

// GET /api/categories
export const GET = async () => {
  try {
    await connectToDatabase();
    console.log("Connected to database for fetching categories");
    const Category= getCategoryModel();
    const categories = await Category.find({ isActive: true }).sort({ order: 1 }).lean()
    return NextResponse.json({ categories })
  } catch (error) {
    console.error("❌ Fetch categories error:", error)
    return NextResponse.json({ error: "Failed to fetch categories. Please try again later." }, { status: 500 })
  }
}

// POST /api/categories
export const POST = withAdminAuth(async (req: NextRequest, user: any) => {
  try {
    await connectToDatabase()
    const data = await req.json()

    const {
      name,
      description,
      color,
      icon,
      parentCategoryName,
      order = 0,
      isActive = true,
      seoTitle,
      seoDescription,
    } = data

    if (!name) {
      return NextResponse.json({ error: "Category name is required." }, { status: 400 })
    }

    const slug = slugify(name, { lower: true, strict: true })

    const Category= getCategoryModel();
    const exists = await Category.findOne({ slug })
    if (exists) {
      return NextResponse.json({ error: "Category with this name already exists." }, { status: 409 })
    }

    const newCategory = new Category({
      name,
      slug,
      description,
      color,
      icon,
      parentCategoryName: parentCategoryName || null,
      order,
      isActive,
      seoTitle,
      seoDescription,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await newCategory.save()

    return NextResponse.json({ message: "✅ Category created successfully.", category: newCategory }, { status: 201 })
  } catch (error) {
    console.error("❌ Create category error:", error)
    return NextResponse.json({ error: "Failed to create category. Please check inputs and try again." }, { status: 500 })
  }
})

// PUT /api/categories
export const PUT = withAdminAuth(async (req: NextRequest, user: any) => {
  try {
    await connectToDatabase()
    const { id, ...updates } = await req.json()

    if (!id) {
      return NextResponse.json({ error: "Category ID is required." }, { status: 400 })
    }

    if (updates.name) {
      updates.slug = slugify(updates.name, { lower: true, strict: true })

      // Prevent duplicate slug on update
      const Category= getCategoryModel();
      const duplicate = await Category.findOne({ slug: updates.slug, _id: { $ne: id } })
      if (duplicate) {
        return NextResponse.json({ error: "Another category with this name already exists." }, { status: 409 })
      }
    }

    updates.updatedAt = new Date()

    const Category= getCategoryModel();
    const updated = await Category.findByIdAndUpdate(id, updates, { new: true })

    if (!updated) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 })
    }

    return NextResponse.json({ message: "✅ Category updated successfully.", category: updated })
  } catch (error) {
    console.error("❌ Update category error:", error)
    return NextResponse.json({ error: "Failed to update category. Please try again." }, { status: 500 })
  }
})

// DELETE /api/categories
export const DELETE = withAdminAuth(async (req: NextRequest, user: any) => {
  try {
    await connectToDatabase()
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ error: "Category ID is required." }, { status: 400 })
    }

    const Category= getCategoryModel();
    const deleted = await Category.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 })
    }

    return NextResponse.json({ message: "🗑️ Category deleted successfully." })
  } catch (error) {
    console.error("❌ Delete category error:", error)
    return NextResponse.json({ error: "Failed to delete category. Please try again." }, { status: 500 })
  }
})
