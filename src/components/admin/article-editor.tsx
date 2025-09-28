// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Switch } from "@/components/ui/switch"
// import { Save, Eye, Send, X, ImageIcon, Loader2 } from "lucide-react"
// import { RichTextEditor } from "@/components/admin/rich-text-editor"
// import { MediaUploader } from "@/components/admin/media-uploader"
// import { ArticlePreview } from "@/components/admin/article-preview"

// interface ArticleEditorProps {
//   articleId?: string
// }

// interface Category {
//   _id: string
//   name: string
//   slug: string
//   description: string
//   color: string
//   icon: string
//   parentCategoryName: string | null
//   order: number
//   isActive: boolean
//   seoTitle: string
//   seoDescription: string
//   createdAt: string
//   updatedAt: string
//   __v: number
// }

// // Simple toast implementation
// const useToast = () => {
//   const showToast = (title: string, description: string, variant: "default" | "destructive" = "default") => {
//     // Create a simple toast notification
//     const toast = document.createElement("div")
//     toast.className = `fixed top-4 right-4 p-4 rounded-md shadow-md z-50 ${
//       variant === "destructive" ? "bg-red-100 text-red-800 border border-red-200" : "bg-green-100 text-green-800 border border-green-200"
//     }`
//     toast.innerHTML = `
//       <div class="font-semibold">${title}</div>
//       <div class="text-sm">${description}</div>
//     `
    
//     document.body.appendChild(toast)
    
//     // Remove toast after 3 seconds
//     setTimeout(() => {
//       document.body.removeChild(toast)
//     }, 3000)
//   }

//   return {
//     toast: showToast
//   }
// }

// export function ArticleEditor({ articleId }: ArticleEditorProps) {
//   const [activeTab, setActiveTab] = useState("editor")
//   const [isLoading, setIsLoading] = useState(false)
//   const [categories, setCategories] = useState<Category[]>([])
//   const [groupedCategories, setGroupedCategories] = useState<{ [key: string]: Category[] }>({})
//   const { toast } = useToast()
  
//   const [article, setArticle] = useState({
//     title: "",
//     titleHi: "",
//     subtitle: "",
//     subtitleHi: "",
//     content: "",
//     contentHi: "",
//     excerpt: "",
//     excerptHi: "",
//     categoryId: "",
//     featuredImage: "",
//     mediaUrls: [] as string[],
//     sourcePersonName: "",
//     sourcePersonNameHi: "",
//     sourcePersonSocial: {
//       twitter: "",
//       facebook: "",
//       instagram: "",
//       linkedin: "",
//     },
//     layoutConfig: {
//       showAuthor: true,
//       showDate: true,
//       showCategory: true,
//       showSocialShare: true,
//       imagePosition: "top",
//       textAlign: "left",
//     },
//     status: "draft",
//     seoTitle: "",
//     seoDescription: "",
//     seoKeywords: [] as string[],
//     tags: [] as string[],
//     isBreaking: false,
//     isFeatured: false,
//     scheduledAt: "",
//   })

//   // Group categories by parent category
//   const groupCategories = (categories: Category[]) => {
//     const grouped: { [key: string]: Category[] } = {}
    
//     // First, find all parent categories (categories with no parentCategoryName)
//     const parentCategories = categories.filter(cat => !cat.parentCategoryName)
    
//     // Then group subcategories by their parent category
//     categories.forEach(category => {
//       if (category.parentCategoryName) {
//         if (!grouped[category.parentCategoryName]) {
//           grouped[category.parentCategoryName] = []
//         }
//         grouped[category.parentCategoryName].push(category)
//       }
//     })
    
//     // Add parent categories to the grouped object
//     parentCategories.forEach(parent => {
//       if (!grouped[parent.name]) {
//         grouped[parent.name] = []
//       }
//       // Add the parent category itself as the first item
//       grouped[parent.name].unshift(parent)
//     })
    
//     return grouped
//   }

//   // Fetch categories and article data if editing
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         // Fetch categories from API
//         const response = await fetch('/api/categories')
//         if (response.ok) {
//           const data = await response.json()
//           const categoriesData = data.categories || []
//           setCategories(categoriesData)
//           setGroupedCategories(groupCategories(categoriesData))
//         } else {
//           toast("Error", "Failed to fetch categories", "destructive")
//           // Fallback to empty array if API fails
//           setCategories([])
//           setGroupedCategories({})
//         }
//       } catch (error) {
//         console.error("Failed to fetch categories:", error)
//         toast("Error", "Failed to fetch categories", "destructive")
//         setCategories([])
//         setGroupedCategories({})
//         }
//       }
    
//       const fetchArticle = async () => {
//         if (!articleId) return
        
//         try {
//           setIsLoading(true)
//           const response = await fetch(`/api/news/${articleId}`)
//           if (response.ok) {
//             const data = await response.json()
//             const articleData = data.article // Extract article from response
            
//             // Ensure all fields have proper default values
//             const articleWithDefaults = {
//               ...articleData,
//               mediaUrls: articleData.mediaUrls || [],
//               sourcePersonSocial: articleData.sourcePersonSocial || {
//                 twitter: "",
//                 facebook: "",
//                 instagram: "",
//                 linkedin: "",
//               },
//               tags: articleData.tags || [],
//               seoKeywords: articleData.seoKeywords || [],
//               layoutConfig: articleData.layoutConfig || {
//                 showAuthor: true,
//                 showDate: true,
//                 showCategory: true,
//                 showSocialShare: true,
//                 imagePosition: "top",
//                 textAlign: "left",
//               },
//               sourcePersonName: articleData.sourcePersonName || "",
//               sourcePersonNameHi: articleData.sourcePersonNameHi || "",
//               subtitle: articleData.subtitle || "",
//               subtitleHi: articleData.subtitleHi || "",
//               excerpt: articleData.excerpt || "",
//               excerptHi: articleData.excerptHi || "",
//               seoTitle: articleData.seoTitle || "",
//               seoDescription: articleData.seoDescription || "",
//               isBreaking: articleData.isBreaking || false,
//               isFeatured: articleData.isFeatured || false,
//               scheduledAt: articleData.scheduledAt || ""
//             }
//             setArticle(articleWithDefaults)
//           } else {
//             toast("Error", "Failed to fetch article data", "destructive")
//           }
//         } catch (error) {
//           console.error("Failed to fetch article:", error)
//           toast("Error", "Failed to fetch article data", "destructive")
//         } finally {
//           setIsLoading(false)
//         }
//       }
    
//       fetchCategories()
//       if (articleId) {
//         fetchArticle()
//       }
//     }, [articleId])
    
//     const handleSave = async () => {
//       try {
//         setIsLoading(true)
//         const url = articleId ? `/api/news/${articleId}` : '/api/news'
//         const method = articleId ? 'PATCH' : 'POST'
        
//         const response = await fetch(url, {
//           method,
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           },
//           body: JSON.stringify({
//             title: article.title,
//             titleHi: article.titleHi,
//             subtitle: article.subtitle,
//             subtitleHi: article.subtitleHi,
//             content: article.content,
//             contentHi: article.contentHi,
//             excerpt: article.excerpt,
//             excerptHi: article.excerptHi,
//             category: article.categoryId,
//             featuredImage: article.featuredImage,
//             mediaUrls: article.mediaUrls || [],
//             sourcePersonName: article.sourcePersonName,
//             sourcePersonNameHi: article.sourcePersonNameHi,
//             sourcePersonSocial: article.sourcePersonSocial || {
//               twitter: "",
//               facebook: "",
//               instagram: "",
//               linkedin: "",
//             },
//             layoutConfig: article.layoutConfig || {
//               showAuthor: true,
//               showDate: true,
//               showCategory: true,
//               showSocialShare: true,
//               imagePosition: "top",
//               textAlign: "left",
//             },
//             status: "draft",
//             tags: article.tags || [],
//             isBreaking: article.isBreaking,
//             isFeatured: article.isFeatured,
//             seoTitle: article.seoTitle,
//             seoDescription: article.seoDescription,
//             seoKeywords: article.seoKeywords || [],
//             scheduledAt: article.scheduledAt
//           })
//         })
    
//         const data = await response.json()
    
//         if (response.ok) {
//           toast("Success", articleId ? "Article updated successfully" : "Article saved as draft")
          
//           if (!articleId && data.data?.articleId) {
//             // Redirect to edit page for the new article
//             window.location.href = `/admin/articles/${data.data.articleId}/edit`
//           }
//         } else {
//           throw new Error(data.message || "Failed to save article")
//         }
//       } catch (error: any) {
//         console.error("Error saving article:", error)
//         toast("Error", error.message || "Failed to save article", "destructive")
//       } finally {
//         setIsLoading(false)
//       }
//     }
    
//     const handlePublish = async () => {
//       try {
//         setIsLoading(true)
//         const url = articleId ? `/api/news/${articleId}` : '/api/news'
//         const method = articleId ? 'PATCH' : 'POST'
        
//         const response = await fetch(url, {
//           method,
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('admin-token')}`
//           },
//           body: JSON.stringify({
//             title: article.title,
//             titleHi: article.titleHi,
//             subtitle: article.subtitle,
//             subtitleHi: article.subtitleHi,
//             content: article.content,
//             contentHi: article.contentHi,
//             excerpt: article.excerpt,
//             excerptHi: article.excerptHi,
//             category: article.categoryId,
//             featuredImage: article.featuredImage,
//             mediaUrls: article.mediaUrls || [],
//             sourcePersonName: article.sourcePersonName,
//             sourcePersonNameHi: article.sourcePersonNameHi,
//             sourcePersonSocial: article.sourcePersonSocial || {
//               twitter: "",
//               facebook: "",
//               instagram: "",
//               linkedin: "",
//             },
//             layoutConfig: article.layoutConfig || {
//               showAuthor: true,
//               showDate: true,
//               showCategory: true,
//               showSocialShare: true,
//               imagePosition: "top",
//               textAlign: "left",
//             },
//             status: "published",
//             tags: article.tags || [],
//             isBreaking: article.isBreaking,
//             isFeatured: article.isFeatured,
//             seoTitle: article.seoTitle,
//             seoDescription: article.seoDescription,
//             seoKeywords: article.seoKeywords || [],
//             scheduledAt: article.scheduledAt
//           })
//         })
    
//         const data = await response.json()
    
//         if (response.ok) {
//           setArticle(prev => ({ ...prev, status: "published" }))
//           toast("Success", "Article published successfully")
//         } else {
//           throw new Error(data.message || "Failed to publish article")
//         }
//       } catch (error: any) {
//         console.error("Error publishing article:", error)
//         toast("Error", error.message || "Failed to publish article", "destructive")
//       } finally {
//         setIsLoading(false)
//       }
//     }
    
//     const handleMediaUpload = (url: string) => {
//       setArticle((prev) => ({
//         ...prev,
//         mediaUrls: [...(prev.mediaUrls || []), url],
//       }))
//     }
    
//     const removeMedia = (index: number) => {
//       setArticle((prev) => ({
//         ...prev,
//         mediaUrls: (prev.mediaUrls || []).filter((_, i) => i !== index),
//       }))
//     }
    
//     if (isLoading && articleId) {
//       return (
//         <div className="flex items-center justify-center h-64">
//           <Loader2 className="h-8 w-8 animate-spin" />
//           <span className="ml-2">Loading article...</span>
//         </div>
//       )
//     }
    
//     return (
//       <div className="space-y-6">
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <TabsList className="grid w-full grid-cols-3">
//             <TabsTrigger value="editor">Editor</TabsTrigger>
//             <TabsTrigger value="preview">Preview</TabsTrigger>
//             <TabsTrigger value="settings">Settings</TabsTrigger>
//           </TabsList>
    
//           <TabsContent value="editor" className="space-y-6">
//             <div className="grid gap-6 lg:grid-cols-3">
//               {/* Main Editor */}
//               <div className="lg:col-span-2 space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Article Content</CardTitle>
//                     <CardDescription>Write your article content in English and Hindi</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid gap-4 md:grid-cols-2">
//                       <div className="space-y-2">
//                         <Label htmlFor="title">Title (English)</Label>
//                         <Input
//                           id="title"
//                           placeholder="Enter article title..."
//                           value={article.title}
//                           onChange={(e) => setArticle((prev) => ({ ...prev, title: e.target.value }))}
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="titleHi">Title (Hindi)</Label>
//                         <Input
//                           id="titleHi"
//                           placeholder="लेख का शीर्षक दर्ज करें..."
//                           value={article.titleHi}
//                           onChange={(e) => setArticle((prev) => ({ ...prev, titleHi: e.target.value }))}
//                         />
//                       </div>
//                     </div>
    
//                     <div className="grid gap-4 md:grid-cols-2">
//                       <div className="space-y-2">
//                         <Label htmlFor="subtitle">Subtitle (English)</Label>
//                         <Input
//                           id="subtitle"
//                           placeholder="Enter subtitle..."
//                           value={article.subtitle}
//                           onChange={(e) => setArticle((prev) => ({ ...prev, subtitle: e.target.value }))}
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="subtitleHi">Subtitle (Hindi)</Label>
//                         <Input
//                           id="subtitleHi"
//                           placeholder="उपशीर्षक दर्ज करें..."
//                           value={article.subtitleHi}
//                           onChange={(e) => setArticle((prev) => ({ ...prev, subtitleHi: e.target.value }))}
//                         />
//                       </div>
//                     </div>
    
//                     <div className="space-y-2">
//                       <Label>Content (English)</Label>
//                       <RichTextEditor
//                         content={article.content}
//                         onChange={(content) => setArticle((prev) => ({ ...prev, content }))}
//                         placeholder="Write your article content here..."
//                       />
//                     </div>
    
//                     <div className="space-y-2">
//                       <Label>Content (Hindi)</Label>
//                       <RichTextEditor
//                         content={article.contentHi}
//                         onChange={(content) => setArticle((prev) => ({ ...prev, contentHi: content }))}
//                         placeholder="यहाँ अपना लेख लिखें..."
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>
    
//                 {/* Media Section */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center space-x-2">
//                       <ImageIcon className="h-5 w-5" />
//                       <span>Media</span>
//                     </CardTitle>
//                     <CardDescription>Upload images and videos for your article</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <MediaUploader onUpload={handleMediaUpload} />
    
//                     {(article.mediaUrls || []).length > 0 && (
//                       <div className="grid gap-4 md:grid-cols-2">
//                         {(article.mediaUrls || []).map((url, index) => (
//                           <div key={index} className="relative group">
//                             <img
//                               src={url || "/placeholder.svg"}
//                               alt={`Media ${index + 1}`}
//                               className="w-full h-32 object-cover rounded-lg border"
//                             />
//                             <Button
//                               variant="destructive"
//                               size="sm"
//                               className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
//                               onClick={() => removeMedia(index)}
//                             >
//                               <X className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </div>
    
//               {/* Sidebar */}
//               <div className="space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Publish</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="flex items-center space-x-2">
//                       <Badge variant={article.status === "published" ? "default" : "secondary"}>
//                         {article.status}
//                       </Badge>
//                     </div>
    
//                     <div className="flex flex-col space-y-2">
//                       <Button 
//                         onClick={handleSave} 
//                         variant="outline" 
//                         className="w-full bg-transparent"
//                         disabled={isLoading}
//                       >
//                         {isLoading ? (
//                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         ) : (
//                           <Save className="mr-2 h-4 w-4" />
//                         )}
//                         Save Draft
//                       </Button>
//                       <Button 
//                         onClick={() => setActiveTab("preview")} 
//                         variant="outline" 
//                         className="w-full"
//                         disabled={isLoading}
//                       >
//                         <Eye className="mr-2 h-4 w-4" />
//                         Preview
//                       </Button>
//                       <Button 
//                         onClick={handlePublish} 
//                         className="w-full"
//                         disabled={isLoading}
//                       >
//                         {isLoading ? (
//                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         ) : (
//                           <Send className="mr-2 h-4 w-4" />
//                         )}
//                         Publish
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
    
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Article Details</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="category">Category</Label>
//                       <Select
//                         value={article.categoryId}
//                         onValueChange={(value) => setArticle((prev) => ({ ...prev, categoryId: value }))}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {Object.entries(groupedCategories).map(([parentName, categoryGroup]) => (
//                             <div key={parentName}>
//                               {/* Parent category as header */}
//                               <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
//                                 {parentName}
//                               </div>
//                               {/* Subcategories */}
//                               {categoryGroup.map((category) => (
//                                 <SelectItem key={category._id} value={category._id}>
//                                   {category.parentCategoryName ? `- ${category.name}` : category.name}
//                                 </SelectItem>
//                               ))}
//                             </div>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
    
//                     <div className="space-y-2">
//                       <Label htmlFor="featuredImage">Featured Image URL</Label>
//                       <Input
//                         id="featuredImage"
//                         placeholder="https://example.com/image.jpg"
//                         value={article.featuredImage}
//                         onChange={(e) => setArticle((prev) => ({ ...prev, featuredImage: e.target.value }))}
//                       />
//                     </div>
    
//                     <div className="grid gap-4 md:grid-cols-2">
//                       <div className="space-y-2">
//                         <Label htmlFor="excerpt">Excerpt (English)</Label>
//                         <Textarea
//                           id="excerpt"
//                           placeholder="Brief summary..."
//                           rows={3}
//                           value={article.excerpt}
//                           onChange={(e) => setArticle((prev) => ({ ...prev, excerpt: e.target.value }))}
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="excerptHi">Excerpt (Hindi)</Label>
//                         <Textarea
//                           id="excerptHi"
//                           placeholder="संक्षिप्त सारांश..."
//                           rows={3}
//                           value={article.excerptHi}
//                           onChange={(e) => setArticle((prev) => ({ ...prev, excerptHi: e.target.value }))}
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
    
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Source Information</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid gap-4 md:grid-cols-2">
//                       <div className="space-y-2">
//                         <Label htmlFor="sourcePerson">Source Person Name (English)</Label>
//                         <Input
//                           id="sourcePerson"
//                           placeholder="Name of news source..."
//                           value={article.sourcePersonName}
//                           onChange={(e) => setArticle((prev) => ({ ...prev, sourcePersonName: e.target.value }))}
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="sourcePersonHi">Source Person Name (Hindi)</Label>
//                         <Input
//                           id="sourcePersonHi"
//                           placeholder="समाचार स्रोत का नाम..."
//                           value={article.sourcePersonNameHi}
//                           onChange={(e) => setArticle((prev) => ({ ...prev, sourcePersonNameHi: e.target.value }))}
//                         />
//                       </div>
//                     </div>
    
//                     <div className="space-y-2">
//                       <Label>Social Media Links</Label>
//                       <div className="space-y-2">
//                         <Input
//                           placeholder="Twitter handle"
//                           value={article.sourcePersonSocial?.twitter || ""}
//                           onChange={(e) =>
//                             setArticle((prev) => ({
//                               ...prev,
//                               sourcePersonSocial: { 
//                                 ...(prev.sourcePersonSocial || {
//                                   twitter: "",
//                                   facebook: "",
//                                   instagram: "",
//                                   linkedin: "",
//                                 }), 
//                                 twitter: e.target.value 
//                               },
//                             }))
//                           }
//                         />
//                         <Input
//                           placeholder="Facebook profile"
//                           value={article.sourcePersonSocial?.facebook || ""}
//                           onChange={(e) =>
//                             setArticle((prev) => ({
//                               ...prev,
//                               sourcePersonSocial: { 
//                                 ...(prev.sourcePersonSocial || {
//                                   twitter: "",
//                                   facebook: "",
//                                   instagram: "",
//                                   linkedin: "",
//                                 }), 
//                                 facebook: e.target.value 
//                               },
//                             }))
//                           }
//                         />
//                         <Input
//                           placeholder="Instagram handle"
//                           value={article.sourcePersonSocial?.instagram || ""}
//                           onChange={(e) =>
//                             setArticle((prev) => ({
//                               ...prev,
//                               sourcePersonSocial: { 
//                                 ...(prev.sourcePersonSocial || {
//                                   twitter: "",
//                                   facebook: "",
//                                   instagram: "",
//                                   linkedin: "",
//                                 }), 
//                                 instagram: e.target.value 
//                               },
//                             }))
//                           }
//                         />
//                         <Input
//                           placeholder="LinkedIn profile"
//                           value={article.sourcePersonSocial?.linkedin || ""}
//                           onChange={(e) =>
//                             setArticle((prev) => ({
//                               ...prev,
//                               sourcePersonSocial: { 
//                                 ...(prev.sourcePersonSocial || {
//                                   twitter: "",
//                                   facebook: "",
//                                   instagram: "",
//                                   linkedin: "",
//                                 }), 
//                                 linkedin: e.target.value 
//                               },
//                             }))
//                           }
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </TabsContent>
    
//           <TabsContent value="preview">
//             <ArticlePreview article={article} />
//           </TabsContent>
    
//           <TabsContent value="settings">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Layout Settings</CardTitle>
//                 <CardDescription>Customize how your article will appear to readers</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="showAuthor">Show Author</Label>
//                     <Switch
//                       id="showAuthor"
//                       checked={article.layoutConfig?.showAuthor ?? true}
//                       onCheckedChange={(checked) =>
//                         setArticle((prev) => ({
//                           ...prev,
//                           layoutConfig: { 
//                             ...(prev.layoutConfig || {
//                               showAuthor: true,
//                               showDate: true,
//                               showCategory: true,
//                               showSocialShare: true,
//                               imagePosition: "top",
//                               textAlign: "left",
//                             }), 
//                             showAuthor: checked 
//                           },
//                         }))
//                       }
//                     />
//                   </div>
    
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="showDate">Show Date</Label>
//                     <Switch
//                       id="showDate"
//                       checked={article.layoutConfig?.showDate ?? true}
//                       onCheckedChange={(checked) =>
//                         setArticle((prev) => ({
//                           ...prev,
//                           layoutConfig: { 
//                             ...(prev.layoutConfig || {
//                               showAuthor: true,
//                               showDate: true,
//                               showCategory: true,
//                               showSocialShare: true,
//                               imagePosition: "top",
//                               textAlign: "left",
//                             }), 
//                             showDate: checked 
//                           },
//                         }))
//                       }
//                     />
//                   </div>
    
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="showCategory">Show Category</Label>
//                     <Switch
//                       id="showCategory"
//                       checked={article.layoutConfig?.showCategory ?? true}
//                       onCheckedChange={(checked) =>
//                         setArticle((prev) => ({
//                           ...prev,
//                           layoutConfig: { 
//                             ...(prev.layoutConfig || {
//                               showAuthor: true,
//                               showDate: true,
//                               showCategory: true,
//                               showSocialShare: true,
//                               imagePosition: "top",
//                               textAlign: "left",
//                             }), 
//                             showCategory: checked 
//                           },
//                         }))
//                       }
//                     />
//                   </div>
    
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="showSocialShare">Show Social Share</Label>
//                     <Switch
//                       id="showSocialShare"
//                       checked={article.layoutConfig?.showSocialShare ?? true}
//                       onCheckedChange={(checked) =>
//                         setArticle((prev) => ({
//                           ...prev,
//                           layoutConfig: { 
//                             ...(prev.layoutConfig || {
//                               showAuthor: true,
//                               showDate: true,
//                               showCategory: true,
//                               showSocialShare: true,
//                               imagePosition: "top",
//                               textAlign: "left",
//                             }), 
//                             showSocialShare: checked 
//                           },
//                         }))
//                       }
//                     />
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="isBreaking">Breaking News</Label>
//                     <Switch
//                       id="isBreaking"
//                       checked={article.isBreaking}
//                       onCheckedChange={(checked) =>
//                         setArticle((prev) => ({
//                           ...prev,
//                           isBreaking: checked,
//                         }))
//                       }
//                     />
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="isFeatured">Featured Article</Label>
//                     <Switch
//                       id="isFeatured"
//                       checked={article.isFeatured}
//                       onCheckedChange={(checked) =>
//                         setArticle((prev) => ({
//                           ...prev,
//                           isFeatured: checked,
//                         }))
//                       }
//                     />
//                   </div>
//                 </div>
    
//                 <div className="space-y-2">
//                   <Label>Image Position</Label>
//                   <Select
//                     value={article.layoutConfig?.imagePosition || "top"}
//                     onValueChange={(value) =>
//                       setArticle((prev) => ({
//                         ...prev,
//                         layoutConfig: { 
//                           ...(prev.layoutConfig || {
//                             showAuthor: true,
//                             showDate: true,
//                             showCategory: true,
//                             showSocialShare: true,
//                             imagePosition: "top",
//                             textAlign: "left",
//                           }), 
//                           imagePosition: value 
//                         },
//                       }))
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="top">Top</SelectItem>
//                       <SelectItem value="left">Left</SelectItem>
//                       <SelectItem value="right">Right</SelectItem>
//                       <SelectItem value="center">Center</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
    
//                 <div className="space-y-2">
//                   <Label>Text Alignment</Label>
//                   <Select
//                     value={article.layoutConfig?.textAlign || "left"}
//                     onValueChange={(value) =>
//                       setArticle((prev) => ({
//                         ...prev,
//                         layoutConfig: { 
//                           ...(prev.layoutConfig || {
//                             showAuthor: true,
//                             showDate: true,
//                             showCategory: true,
//                             showSocialShare: true,
//                             imagePosition: "top",
//                             textAlign: "left",
//                           }), 
//                           textAlign: value 
//                         },
//                       }))
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="left">Left</SelectItem>
//                       <SelectItem value="center">Center</SelectItem>
//                       <SelectItem value="right">Right</SelectItem>
//                       <SelectItem value="justify">Justify</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="tags">Tags (comma separated)</Label>
//                   <Input
//                     id="tags"
//                     placeholder="AI, Technology, India"
//                     value={(article.tags || []).join(", ")}
//                     onChange={(e) =>
//                       setArticle((prev) => ({
//                         ...prev,
//                         tags: e.target.value.split(",").map(tag => tag.trim()),
//                       }))
//                     }
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="seoTitle">SEO Title</Label>
//                   <Input
//                     id="seoTitle"
//                     placeholder="SEO Title for search engines"
//                     value={article.seoTitle}
//                     onChange={(e) => setArticle((prev) => ({ ...prev, seoTitle: e.target.value }))}
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="seoDescription">SEO Description</Label>
//                   <Textarea
//                     id="seoDescription"
//                     placeholder="SEO Description for search engines"
//                     rows={3}
//                     value={article.seoDescription}
//                     onChange={(e) => setArticle((prev) => ({ ...prev, seoDescription: e.target.value }))}
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="seoKeywords">SEO Keywords (comma separated)</Label>
//                   <Input
//                     id="seoKeywords"
//                     placeholder="keyword1, keyword2, keyword3"
//                     value={(article.seoKeywords || []).join(", ")}
//                     onChange={(e) =>
//                       setArticle((prev) => ({
//                         ...prev,
//                         seoKeywords: e.target.value.split(",").map(keyword => keyword.trim()),
//                       }))
//                     }
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="scheduledAt">Schedule Publication (optional)</Label>
//                   <Input
//                     id="scheduledAt"
//                     type="datetime-local"
//                     value={article.scheduledAt ? new Date(article.scheduledAt).toISOString().slice(0, 16) : ""}
//                     onChange={(e) =>
//                       setArticle((prev) => ({
//                         ...prev,
//                         scheduledAt: e.target.value ? new Date(e.target.value).toISOString() : "",
//                       }))
//                     }
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     )
//   }
























"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Save, Eye, Send, X, ImageIcon, Loader2 } from "lucide-react"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { MediaUploader } from "@/components/admin/media-uploader"
import { ArticlePreview } from "@/components/admin/article-preview"
import Image from "next/image"

interface ArticleEditorProps {
  articleId?: string
}

interface Category {
  _id: string
  name: string
  slug: string
  description: string
  color: string
  icon: string
  parentCategoryName: string | null
  order: number
  isActive: boolean
  seoTitle: string
  seoDescription: string
  createdAt: string
  updatedAt: string
  __v: number
}

interface SourcePersonSocial {
  twitter: string
  facebook: string
  instagram: string
  linkedin: string
}

interface LayoutConfig {
  showAuthor: boolean
  showDate: boolean
  showCategory: boolean
  showSocialShare: boolean
  imagePosition: "top" | "left" | "right" | "center"
  textAlign: "left" | "center" | "right" | "justify"
}

interface ArticleState {
  title: string
  titleHi: string
  subtitle: string
  subtitleHi: string
  content: string
  contentHi: string
  excerpt: string
  excerptHi: string
  categoryId: string
  featuredImage: string
  mediaUrls: string[]
  sourcePersonName: string
  sourcePersonNameHi: string
  sourcePersonSocial: SourcePersonSocial
  layoutConfig: LayoutConfig
  status: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string[]
  tags: string[]
  isBreaking: boolean
  isFeatured: boolean
  scheduledAt: string
}

// Simple toast implementation
const useToast = () => {
  const showToast = useCallback((title: string, description: string, variant: "default" | "destructive" = "default") => {
    // Create a simple toast notification
    const toast = document.createElement("div")
    toast.className = `fixed top-4 right-4 p-4 rounded-md shadow-md z-50 ${
      variant === "destructive" ? "bg-red-100 text-red-800 border border-red-200" : "bg-green-100 text-green-800 border border-green-200"
    }`
    toast.innerHTML = `
      <div class="font-semibold">${title}</div>
      <div class="text-sm">${description}</div>
    `
    
    document.body.appendChild(toast)
    
    // Remove toast after 3 seconds
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast)
      }
    }, 3000)
  }, [])

  return {
    toast: showToast
  }
}

export function ArticleEditor({ articleId }: ArticleEditorProps) {
  const [activeTab, setActiveTab] = useState("editor")
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [groupedCategories, setGroupedCategories] = useState<{ [key: string]: Category[] }>({})
  const { toast } = useToast()
  
  const [article, setArticle] = useState<ArticleState>({
    title: "",
    titleHi: "",
    subtitle: "",
    subtitleHi: "",
    content: "",
    contentHi: "",
    excerpt: "",
    excerptHi: "",
    categoryId: "",
    featuredImage: "",
    mediaUrls: [],
    sourcePersonName: "",
    sourcePersonNameHi: "",
    sourcePersonSocial: {
      twitter: "",
      facebook: "",
      instagram: "",
      linkedin: "",
    },
    layoutConfig: {
      showAuthor: true,
      showDate: true,
      showCategory: true,
      showSocialShare: true,
      imagePosition: "top",
      textAlign: "left",
    },
    status: "draft",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: [],
    tags: [],
    isBreaking: false,
    isFeatured: false,
    scheduledAt: "",
  })

  // Group categories by parent category
  const groupCategories = useCallback((categoriesList: Category[]) => {
    const grouped: { [key: string]: Category[] } = {}
    
    // First, find all parent categories (categories with no parentCategoryName)
    const parentCategories = categoriesList.filter(cat => !cat.parentCategoryName)
    
    // Then group subcategories by their parent category
    categoriesList.forEach(category => {
      if (category.parentCategoryName) {
        if (!grouped[category.parentCategoryName]) {
          grouped[category.parentCategoryName] = []
        }
        grouped[category.parentCategoryName].push(category)
      }
    })
    
    // Add parent categories to the grouped object
    parentCategories.forEach(parent => {
      if (!grouped[parent.name]) {
        grouped[parent.name] = []
      }
      // Add the parent category itself as the first item
      grouped[parent.name].unshift(parent)
    })
    
    return grouped
  }, [])

  // Fetch categories and article data if editing
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch categories from API
        const response = await fetch('/api/categories')
        if (response.ok) {
          const data = await response.json()
          const categoriesData = data.categories || []
          setCategories(categoriesData)
          setGroupedCategories(groupCategories(categoriesData))
        } else {
          toast("Error", "Failed to fetch categories", "destructive")
          // Fallback to empty array if API fails
          setGroupedCategories({})
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error)
        toast("Error", "Failed to fetch categories", "destructive")
        setGroupedCategories({})
      }
    }
    
    const fetchArticle = async () => {
      if (!articleId) return
      
      try {
        setIsLoading(true)
        const response = await fetch(`/api/news/${articleId}`)
        if (response.ok) {
          const data = await response.json()
          const articleData = data.article // Extract article from response
          
          // Ensure all fields have proper default values
          const articleWithDefaults: ArticleState = {
            ...articleData,
            mediaUrls: articleData.mediaUrls || [],
            sourcePersonSocial: articleData.sourcePersonSocial || {
              twitter: "",
              facebook: "",
              instagram: "",
              linkedin: "",
            },
            tags: articleData.tags || [],
            seoKeywords: articleData.seoKeywords || [],
            layoutConfig: articleData.layoutConfig || {
              showAuthor: true,
              showDate: true,
              showCategory: true,
              showSocialShare: true,
              imagePosition: "top",
              textAlign: "left",
            },
            sourcePersonName: articleData.sourcePersonName || "",
            sourcePersonNameHi: articleData.sourcePersonNameHi || "",
            subtitle: articleData.subtitle || "",
            subtitleHi: articleData.subtitleHi || "",
            excerpt: articleData.excerpt || "",
            excerptHi: articleData.excerptHi || "",
            seoTitle: articleData.seoTitle || "",
            seoDescription: articleData.seoDescription || "",
            isBreaking: articleData.isBreaking || false,
            isFeatured: articleData.isFeatured || false,
            scheduledAt: articleData.scheduledAt || ""
          }
          setArticle(articleWithDefaults)
        } else {
          toast("Error", "Failed to fetch article data", "destructive")
        }
      } catch (error) {
        console.error("Failed to fetch article:", error)
        toast("Error", "Failed to fetch article data", "destructive")
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchCategories()
    if (articleId) {
      fetchArticle()
    }
  }, [articleId, groupCategories, toast])
  
  const handleSave = async () => {
    try {
      setIsLoading(true)
      const url = articleId ? `/api/news/${articleId}` : '/api/news'
      const method = articleId ? 'PATCH' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title: article.title,
          titleHi: article.titleHi,
          subtitle: article.subtitle,
          subtitleHi: article.subtitleHi,
          content: article.content,
          contentHi: article.contentHi,
          excerpt: article.excerpt,
          excerptHi: article.excerptHi,
          category: article.categoryId,
          featuredImage: article.featuredImage,
          mediaUrls: article.mediaUrls || [],
          sourcePersonName: article.sourcePersonName,
          sourcePersonNameHi: article.sourcePersonNameHi,
          sourcePersonSocial: article.sourcePersonSocial || {
            twitter: "",
            facebook: "",
            instagram: "",
            linkedin: "",
          },
          layoutConfig: article.layoutConfig || {
            showAuthor: true,
            showDate: true,
            showCategory: true,
            showSocialShare: true,
            imagePosition: "top",
            textAlign: "left",
          },
          status: "draft",
          tags: article.tags || [],
          isBreaking: article.isBreaking,
          isFeatured: article.isFeatured,
          seoTitle: article.seoTitle,
          seoDescription: article.seoDescription,
          seoKeywords: article.seoKeywords || [],
          scheduledAt: article.scheduledAt
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast("Success", articleId ? "Article updated successfully" : "Article saved as draft")
        
        if (!articleId && data.data?.articleId) {
          // Redirect to edit page for the new article
          window.location.href = `/admin/articles/${data.data.articleId}/edit`
        }
      } else {
        throw new Error(data.message || "Failed to save article")
      }
    } catch (error: unknown) {
      console.error("Error saving article:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to save article"
      toast("Error", errorMessage, "destructive")
    } finally {
      setIsLoading(false)
    }
  }
  
  const handlePublish = async () => {
    try {
      setIsLoading(true)
      const url = articleId ? `/api/news/${articleId}` : '/api/news'
      const method = articleId ? 'PATCH' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin-token')}`
        },
        body: JSON.stringify({
          title: article.title,
          titleHi: article.titleHi,
          subtitle: article.subtitle,
          subtitleHi: article.subtitleHi,
          content: article.content,
          contentHi: article.contentHi,
          excerpt: article.excerpt,
          excerptHi: article.excerptHi,
          category: article.categoryId,
          featuredImage: article.featuredImage,
          mediaUrls: article.mediaUrls || [],
          sourcePersonName: article.sourcePersonName,
          sourcePersonNameHi: article.sourcePersonNameHi,
          sourcePersonSocial: article.sourcePersonSocial || {
            twitter: "",
            facebook: "",
            instagram: "",
            linkedin: "",
          },
          layoutConfig: article.layoutConfig || {
            showAuthor: true,
            showDate: true,
            showCategory: true,
            showSocialShare: true,
            imagePosition: "top",
            textAlign: "left",
          },
          status: "published",
          tags: article.tags || [],
          isBreaking: article.isBreaking,
          isFeatured: article.isFeatured,
          seoTitle: article.seoTitle,
          seoDescription: article.seoDescription,
          seoKeywords: article.seoKeywords || [],
          scheduledAt: article.scheduledAt
        })
      })

      const data = await response.json()

      if (response.ok) {
        setArticle(prev => ({ ...prev, status: "published" }))
        toast("Success", "Article published successfully")
      } else {
        throw new Error(data.message || "Failed to publish article")
      }
    } catch (error: unknown) {
      console.error("Error publishing article:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to publish article"
      toast("Error", errorMessage, "destructive")
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleMediaUpload = (url: string) => {
    setArticle((prev) => ({
      ...prev,
      mediaUrls: [...(prev.mediaUrls || []), url],
    }))
  }
  
  const removeMedia = (index: number) => {
    setArticle((prev) => ({
      ...prev,
      mediaUrls: (prev.mediaUrls || []).filter((_, i) => i !== index),
    }))
  }
  
  if (isLoading && articleId) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading article...</span>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Article Content</CardTitle>
                  <CardDescription>Write your article content in English and Hindi</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title (English)</Label>
                      <Input
                        id="title"
                        placeholder="Enter article title..."
                        value={article.title}
                        onChange={(e) => setArticle((prev) => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="titleHi">Title (Hindi)</Label>
                      <Input
                        id="titleHi"
                        placeholder="लेख का शीर्षक दर्ज करें..."
                        value={article.titleHi}
                        onChange={(e) => setArticle((prev) => ({ ...prev, titleHi: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="subtitle">Subtitle (English)</Label>
                      <Input
                        id="subtitle"
                        placeholder="Enter subtitle..."
                        value={article.subtitle}
                        onChange={(e) => setArticle((prev) => ({ ...prev, subtitle: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subtitleHi">Subtitle (Hindi)</Label>
                      <Input
                        id="subtitleHi"
                        placeholder="उपशीर्षक दर्ज करें..."
                        value={article.subtitleHi}
                        onChange={(e) => setArticle((prev) => ({ ...prev, subtitleHi: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Content (English)</Label>
                    <RichTextEditor
                      content={article.content}
                      onChange={(content) => setArticle((prev) => ({ ...prev, content }))}
                      placeholder="Write your article content here..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Content (Hindi)</Label>
                    <RichTextEditor
                      content={article.contentHi}
                      onChange={(content) => setArticle((prev) => ({ ...prev, contentHi: content }))}
                      placeholder="यहाँ अपना लेख लिखें..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Media Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ImageIcon className="h-5 w-5" />
                    <span>Media</span>
                  </CardTitle>
                  <CardDescription>Upload images and videos for your article</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <MediaUploader onUpload={handleMediaUpload} />

                  {(article.mediaUrls || []).length > 0 && (
                    <div className="grid gap-4 md:grid-cols-2">
                      {(article.mediaUrls || []).map((url, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={url || "/placeholder.svg"}
                            alt={`Media ${index + 1}`}
                            width={300}
                            height={128}
                            className="w-full h-32 object-cover rounded-lg border"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeMedia(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publish</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant={article.status === "published" ? "default" : "secondary"}>
                      {article.status}
                    </Badge>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button 
                      onClick={handleSave} 
                      variant="outline" 
                      className="w-full bg-transparent"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Save Draft
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("preview")} 
                      variant="outline" 
                      className="w-full"
                      disabled={isLoading}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button 
                      onClick={handlePublish} 
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      Publish
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Article Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={article.categoryId}
                      onValueChange={(value) => setArticle((prev) => ({ ...prev, categoryId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(groupedCategories).map(([parentName, categoryGroup]) => (
                          <div key={parentName}>
                            {/* Parent category as header */}
                            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                              {parentName}
                            </div>
                            {/* Subcategories */}
                            {categoryGroup.map((category) => (
                              <SelectItem key={category._id} value={category._id}>
                                {category.parentCategoryName ? `- ${category.name}` : category.name}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="featuredImage">Featured Image URL</Label>
                    <Input
                      id="featuredImage"
                      placeholder="https://example.com/image.jpg"
                      value={article.featuredImage}
                      onChange={(e) => setArticle((prev) => ({ ...prev, featuredImage: e.target.value }))}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Excerpt (English)</Label>
                      <Textarea
                        id="excerpt"
                        placeholder="Brief summary..."
                        rows={3}
                        value={article.excerpt}
                        onChange={(e) => setArticle((prev) => ({ ...prev, excerpt: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="excerptHi">Excerpt (Hindi)</Label>
                      <Textarea
                        id="excerptHi"
                        placeholder="संक्षिप्त सारांश..."
                        rows={3}
                        value={article.excerptHi}
                        onChange={(e) => setArticle((prev) => ({ ...prev, excerptHi: e.target.value }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Source Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="sourcePerson">Source Person Name (English)</Label>
                      <Input
                        id="sourcePerson"
                        placeholder="Name of news source..."
                        value={article.sourcePersonName}
                        onChange={(e) => setArticle((prev) => ({ ...prev, sourcePersonName: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sourcePersonHi">Source Person Name (Hindi)</Label>
                      <Input
                        id="sourcePersonHi"
                        placeholder="समाचार स्रोत का नाम..."
                        value={article.sourcePersonNameHi}
                        onChange={(e) => setArticle((prev) => ({ ...prev, sourcePersonNameHi: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Social Media Links</Label>
                    <div className="space-y-2">
                      <Input
                        placeholder="Twitter handle"
                        value={article.sourcePersonSocial?.twitter || ""}
                        onChange={(e) =>
                          setArticle((prev) => ({
                            ...prev,
                            sourcePersonSocial: { 
                              ...(prev.sourcePersonSocial || {
                                twitter: "",
                                facebook: "",
                                instagram: "",
                                linkedin: "",
                              }), 
                              twitter: e.target.value 
                            },
                          }))
                        }
                      />
                      <Input
                        placeholder="Facebook profile"
                        value={article.sourcePersonSocial?.facebook || ""}
                        onChange={(e) =>
                          setArticle((prev) => ({
                            ...prev,
                            sourcePersonSocial: { 
                              ...(prev.sourcePersonSocial || {
                                twitter: "",
                                facebook: "",
                                instagram: "",
                                linkedin: "",
                              }), 
                              facebook: e.target.value 
                            },
                          }))
                        }
                      />
                      <Input
                        placeholder="Instagram handle"
                        value={article.sourcePersonSocial?.instagram || ""}
                        onChange={(e) =>
                          setArticle((prev) => ({
                            ...prev,
                            sourcePersonSocial: { 
                              ...(prev.sourcePersonSocial || {
                                twitter: "",
                                facebook: "",
                                instagram: "",
                                linkedin: "",
                              }), 
                              instagram: e.target.value 
                            },
                          }))
                        }
                      />
                      <Input
                        placeholder="LinkedIn profile"
                        value={article.sourcePersonSocial?.linkedin || ""}
                        onChange={(e) =>
                          setArticle((prev) => ({
                            ...prev,
                            sourcePersonSocial: { 
                              ...(prev.sourcePersonSocial || {
                                twitter: "",
                                facebook: "",
                                instagram: "",
                                linkedin: "",
                              }), 
                              linkedin: e.target.value 
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <ArticlePreview article={article} />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Layout Settings</CardTitle>
              <CardDescription>Customize how your article will appear to readers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="showAuthor">Show Author</Label>
                  <Switch
                    id="showAuthor"
                    checked={article.layoutConfig?.showAuthor ?? true}
                    onCheckedChange={(checked) =>
                      setArticle((prev) => ({
                        ...prev,
                        layoutConfig: { 
                          ...(prev.layoutConfig || {
                            showAuthor: true,
                            showDate: true,
                            showCategory: true,
                            showSocialShare: true,
                            imagePosition: "top",
                            textAlign: "left",
                          }), 
                          showAuthor: checked 
                        },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showDate">Show Date</Label>
                  <Switch
                    id="showDate"
                    checked={article.layoutConfig?.showDate ?? true}
                    onCheckedChange={(checked) =>
                      setArticle((prev) => ({
                        ...prev,
                        layoutConfig: { 
                          ...(prev.layoutConfig || {
                            showAuthor: true,
                            showDate: true,
                            showCategory: true,
                            showSocialShare: true,
                            imagePosition: "top",
                            textAlign: "left",
                          }), 
                          showDate: checked 
                        },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showCategory">Show Category</Label>
                  <Switch
                    id="showCategory"
                    checked={article.layoutConfig?.showCategory ?? true}
                    onCheckedChange={(checked) =>
                      setArticle((prev) => ({
                        ...prev,
                        layoutConfig: { 
                          ...(prev.layoutConfig || {
                            showAuthor: true,
                            showDate: true,
                            showCategory: true,
                            showSocialShare: true,
                            imagePosition: "top",
                            textAlign: "left",
                          }), 
                          showCategory: checked 
                        },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showSocialShare">Show Social Share</Label>
                  <Switch
                    id="showSocialShare"
                    checked={article.layoutConfig?.showSocialShare ?? true}
                    onCheckedChange={(checked) =>
                      setArticle((prev) => ({
                        ...prev,
                        layoutConfig: { 
                          ...(prev.layoutConfig || {
                            showAuthor: true,
                            showDate: true,
                            showCategory: true,
                            showSocialShare: true,
                            imagePosition: "top",
                            textAlign: "left",
                          }), 
                          showSocialShare: checked 
                        },
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="isBreaking">Breaking News</Label>
                  <Switch
                    id="isBreaking"
                    checked={article.isBreaking}
                    onCheckedChange={(checked) =>
                      setArticle((prev) => ({
                        ...prev,
                        isBreaking: checked,
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="isFeatured">Featured Article</Label>
                  <Switch
                    id="isFeatured"
                    checked={article.isFeatured}
                    onCheckedChange={(checked) =>
                      setArticle((prev) => ({
                        ...prev,
                        isFeatured: checked,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Image Position</Label>
                <Select
                  value={article.layoutConfig?.imagePosition || "top"}
                  onValueChange={(value) =>
                    setArticle((prev) => ({
                      ...prev,
                      layoutConfig: { 
                        ...(prev.layoutConfig || {
                          showAuthor: true,
                          showDate: true,
                          showCategory: true,
                          showSocialShare: true,
                          imagePosition: "top",
                          textAlign: "left",
                        }), 
                        imagePosition: value as "top" | "left" | "right" | "center"
                      },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top">Top</SelectItem>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Text Alignment</Label>
                <Select
                  value={article.layoutConfig?.textAlign || "left"}
                  onValueChange={(value) =>
                    setArticle((prev) => ({
                      ...prev,
                      layoutConfig: { 
                        ...(prev.layoutConfig || {
                          showAuthor: true,
                          showDate: true,
                          showCategory: true,
                          showSocialShare: true,
                          imagePosition: "top",
                          textAlign: "left",
                        }), 
                        textAlign: value as "left" | "center" | "right" | "justify"
                      },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="justify">Justify</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="AI, Technology, India"
                  value={(article.tags || []).join(", ")}
                  onChange={(e) =>
                    setArticle((prev) => ({
                      ...prev,
                      tags: e.target.value.split(",").map(tag => tag.trim()),
                    }))
                  }
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  placeholder="SEO Title for search engines"
                  value={article.seoTitle}
                  onChange={(e) => setArticle((prev) => ({ ...prev, seoTitle: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  placeholder="SEO Description for search engines"
                  rows={3}
                  value={article.seoDescription}
                  onChange={(e) => setArticle((prev) => ({ ...prev, seoDescription: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seoKeywords">SEO Keywords (comma separated)</Label>
                <Input
                  id="seoKeywords"
                  placeholder="keyword1, keyword2, keyword3"
                  value={(article.seoKeywords || []).join(", ")}
                  onChange={(e) =>
                    setArticle((prev) => ({
                      ...prev,
                      seoKeywords: e.target.value.split(",").map(keyword => keyword.trim()),
                    }))
                  }
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="scheduledAt">Schedule Publication (optional)</Label>
                <Input
                  id="scheduledAt"
                  type="datetime-local"
                  value={article.scheduledAt ? new Date(article.scheduledAt).toISOString().slice(0, 16) : ""}
                  onChange={(e) =>
                    setArticle((prev) => ({
                      ...prev,
                      scheduledAt: e.target.value ? new Date(e.target.value).toISOString() : "",
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}