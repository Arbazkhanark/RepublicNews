// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Search, Filter, Edit, Trash2, Eye, PlusCircle } from "lucide-react"
// import Link from "next/link"

// // Mock data - in real app, this would come from database
// const articles = [
//   {
//     id: 1,
//     title: "Breaking: Major Political Development in State Elections",
//     category: "Politics",
//     author: "John Doe",
//     status: "published",
//     views: 1250,
//     publishedAt: "2024-01-15T10:30:00Z",
//     createdAt: "2024-01-15T09:00:00Z",
//   },
//   {
//     id: 2,
//     title: "Sports Update: Championship Results and Analysis",
//     category: "Sports",
//     author: "Jane Smith",
//     status: "draft",
//     views: 0,
//     publishedAt: null,
//     createdAt: "2024-01-14T16:20:00Z",
//   },
//   {
//     id: 3,
//     title: "Technology Breakthrough in Artificial Intelligence",
//     category: "Technology",
//     author: "Mike Johnson",
//     status: "published",
//     views: 890,
//     publishedAt: "2024-01-14T15:45:00Z",
//     createdAt: "2024-01-14T14:00:00Z",
//   },
//   {
//     id: 4,
//     title: "Health Alert: New Guidelines for Winter Season",
//     category: "Health",
//     author: "Dr. Sarah Wilson",
//     status: "archived",
//     views: 567,
//     publishedAt: "2024-01-13T12:00:00Z",
//     createdAt: "2024-01-13T10:30:00Z",
//   },
// ]

// export default function ArticlesPage() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [categoryFilter, setCategoryFilter] = useState("all")

//   const filteredArticles = articles.filter((article) => {
//     const matchesSearch =
//       article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       article.author.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesStatus = statusFilter === "all" || article.status === statusFilter
//     const matchesCategory = categoryFilter === "all" || article.category === categoryFilter

//     return matchesSearch && matchesStatus && matchesCategory
//   })

//   const getStatusBadge = (status: string) => {
//     const variants = {
//       published: "bg-green-100 text-green-800",
//       draft: "bg-yellow-100 text-yellow-800",
//       archived: "bg-gray-100 text-gray-800",
//     }
//     return variants[status as keyof typeof variants] || variants.draft
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Articles</h1>
//           <p className="text-muted-foreground">Manage all your news articles</p>
//         </div>
//         <Button asChild>
//           <Link href="/admin/articles/new" className="flex items-center space-x-2">
//             <PlusCircle className="h-4 w-4" />
//             <span>New Article</span>
//           </Link>
//         </Button>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center space-x-2">
//             <Filter className="h-5 w-5" />
//             <span>Filters</span>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search articles or authors..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </div>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-full md:w-[180px]">
//                 <SelectValue placeholder="Filter by status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="published">Published</SelectItem>
//                 <SelectItem value="draft">Draft</SelectItem>
//                 <SelectItem value="archived">Archived</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//               <SelectTrigger className="w-full md:w-[180px]">
//                 <SelectValue placeholder="Filter by category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 <SelectItem value="Politics">Politics</SelectItem>
//                 <SelectItem value="Sports">Sports</SelectItem>
//                 <SelectItem value="Technology">Technology</SelectItem>
//                 <SelectItem value="Health">Health</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Articles Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Articles ({filteredArticles.length})</CardTitle>
//           <CardDescription>A list of all articles in your news website</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Author</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Views</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredArticles.map((article) => (
//                 <TableRow key={article.id}>
//                   <TableCell className="font-medium">
//                     <div className="max-w-[300px] truncate">{article.title}</div>
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant="outline">{article.category}</Badge>
//                   </TableCell>
//                   <TableCell>{article.author}</TableCell>
//                   <TableCell>
//                     <Badge className={getStatusBadge(article.status)}>{article.status}</Badge>
//                   </TableCell>
//                   <TableCell>{article.views.toLocaleString()}</TableCell>
//                   <TableCell>
//                     {article.publishedAt
//                       ? new Date(article.publishedAt).toLocaleDateString()
//                       : new Date(article.createdAt).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex items-center justify-end space-x-2">
//                       <Button variant="ghost" size="sm">
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                       <Button variant="ghost" size="sm" asChild>
//                         <Link href={`/admin/articles/${article.id}/edit`}>
//                           <Edit className="h-4 w-4" />
//                         </Link>
//                       </Button>
//                       <Button variant="ghost" size="sm">
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }



























// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Search, Filter, Edit, Trash2, Eye, PlusCircle, Loader2 } from "lucide-react"
// import Link from "next/link"

// interface Article {
//   _id: string
//   title: string
//   titleHi?: string
//   content: string
//   contentHi?: string
//   excerpt?: string
//   excerptHi?: string
//   slug: string
//   slugHi?: string
//   categoryId: string
//   authorId: string
//   featuredImage: string
//   mediaUrls: string[]
//   sourcePersonName?: string
//   sourcePersonNameHi?: string
//   sourcePersonSocial: {
//     twitter: string
//     facebook: string
//     instagram: string
//     linkedin: string
//   }
//   layoutConfig: {
//     showAuthor: boolean
//     showDate: boolean
//     showCategory: boolean
//     showSocialShare: boolean
//     imagePosition: string
//     textAlign: string
//   }
//   status: string
//   publishedAt: string | null
//   views: number
//   likes: number
//   shares: number
//   createdAt: string
//   updatedAt: string
//   __v: number
//   id: string
// }

// interface Pagination {
//   page: number
//   limit: number
//   total: number
//   pages: number
// }

// interface ApiResponse {
//   success: boolean
//   message: string
//   data: {
//     articles: Article[]
//     pagination: Pagination
//   }
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

// export default function ArticlesPage() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [categoryFilter, setCategoryFilter] = useState("all")
//   const [articles, setArticles] = useState<Article[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [pagination, setPagination] = useState<Pagination>({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 1
//   })
//   const { toast } = useToast()

//   // Fetch articles from API
//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         setIsLoading(true)
        
//         // Build query parameters
//         const params = new URLSearchParams()
//         params.append('page', pagination.page.toString())
//         params.append('limit', pagination.limit.toString())
        
//         if (statusFilter !== 'all') {
//           params.append('status', statusFilter)
//         }
        
//         if (searchTerm) {
//           params.append('search', searchTerm)
//         }
        
//         if (categoryFilter !== 'all') {
//           params.append('category', categoryFilter)
//         }

//         const response = await fetch(`/api/news?${params.toString()}`)
        
//         if (response.ok) {
//           const data: ApiResponse = await response.json()
//           setArticles(data.data.articles)
//           setPagination(data.data.pagination)
//         } else {
//           throw new Error('Failed to fetch articles')
//         }
//       } catch (error) {
//         console.error("Error fetching articles:", error)
//         toast("Error", "Failed to load articles", "destructive")
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchArticles()
//   }, [searchTerm, statusFilter, categoryFilter, pagination.page, pagination.limit])

//   const handleDelete = async (articleId: string) => {
//     if (!confirm("Are you sure you want to delete this article?")) return

//     try {
//       const response = await fetch(`/api/news/${articleId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       })

//       if (response.ok) {
//         toast("Success", "Article deleted successfully")
//         // Refresh the articles list
//         setArticles(prev => prev.filter(article => article._id !== articleId))
//       } else {
//         throw new Error('Failed to delete article')
//       }
//     } catch (error) {
//       console.error("Error deleting article:", error)
//       toast("Error", "Failed to delete article", "destructive")
//     }
//   }

//   const getStatusBadge = (status: string) => {
//     const variants = {
//       published: "bg-green-100 text-green-800",
//       draft: "bg-yellow-100 text-yellow-800",
//       archived: "bg-gray-100 text-gray-800",
//     }
//     return variants[status as keyof typeof variants] || variants.draft
//   }

//   const getDisplayTitle = (article: Article) => {
//     return article.title || article.titleHi || "Untitled Article"
//   }

//   const getDisplayCategory = (article: Article) => {
//     // In a real app, you would fetch category name from categoryId
//     // For now, we'll just show the category ID
//     return article.categoryId
//   }

//   const filteredArticles = articles.filter((article) => {
//     const matchesSearch =
//       getDisplayTitle(article).toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (article.sourcePersonName && article.sourcePersonName.toLowerCase().includes(searchTerm.toLowerCase()))
    
//     const matchesStatus = statusFilter === "all" || article.status === statusFilter
//     const matchesCategory = categoryFilter === "all" || getDisplayCategory(article) === categoryFilter

//     return matchesSearch && matchesStatus && matchesCategory
//   })

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Articles</h1>
//           <p className="text-muted-foreground">Manage all your news articles</p>
//         </div>
//         <Button asChild>
//           <Link href="/admin/articles/new" className="flex items-center space-x-2">
//             <PlusCircle className="h-4 w-4" />
//             <span>New Article</span>
//           </Link>
//         </Button>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center space-x-2">
//             <Filter className="h-4 w-4" />
//             <span>Filters</span>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search articles or authors..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </div>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-full md:w-[180px]">
//                 <SelectValue placeholder="Filter by status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="published">Published</SelectItem>
//                 <SelectItem value="draft">Draft</SelectItem>
//                 <SelectItem value="archived">Archived</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//               <SelectTrigger className="w-full md:w-[180px]">
//                 <SelectValue placeholder="Filter by category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 {/* In a real app, you would fetch categories from API */}
//                 <SelectItem value="Politics">Politics</SelectItem>
//                 <SelectItem value="Sports">Sports</SelectItem>
//                 <SelectItem value="Technology">Technology</SelectItem>
//                 <SelectItem value="Health">Health</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Articles Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Articles ({filteredArticles.length})</CardTitle>
//           <CardDescription>A list of all articles in your news website</CardDescription>
//         </CardHeader>
//         <CardContent>
//           {isLoading ? (
//             <div className="flex items-center justify-center h-64">
//               <Loader2 className="h-8 w-8 animate-spin" />
//               <span className="ml-2">Loading articles...</span>
//             </div>
//           ) : (
//             <>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Title</TableHead>
//                     <TableHead>Category</TableHead>
//                     <TableHead>Author</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Views</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredArticles.map((article) => (
//                     <TableRow key={article._id}>
//                       <TableCell className="font-medium">
//                         <div className="max-w-[300px] truncate">{getDisplayTitle(article)}</div>
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant="outline">{getDisplayCategory(article)}</Badge>
//                       </TableCell>
//                       <TableCell>{article.sourcePersonName || "Unknown"}</TableCell>
//                       <TableCell>
//                         <Badge className={getStatusBadge(article.status)}>{article.status}</Badge>
//                       </TableCell>
//                       <TableCell>{article.views.toLocaleString()}</TableCell>
//                       <TableCell>
//                         {article.publishedAt
//                           ? new Date(article.publishedAt).toLocaleDateString()
//                           : new Date(article.createdAt).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <div className="flex items-center justify-end space-x-2">
//                           <Button variant="ghost" size="sm" asChild>
//                             <Link href={`/article/${article.slug}`} target="_blank">
//                               <Eye className="h-4 w-4" />
//                             </Link>
//                           </Button>
//                           <Button variant="ghost" size="sm" asChild>
//                             <Link href={`/admin/articles/${article._id}/edit`}>
//                               <Edit className="h-4 w-4" />
//                             </Link>
//                           </Button>
//                           <Button 
//                             variant="ghost" 
//                             size="sm"
//                             onClick={() => handleDelete(article._id)}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
              
//               {/* Pagination */}
//               {pagination.pages > 1 && (
//                 <div className="flex items-center justify-between mt-4">
//                   <div className="text-sm text-muted-foreground">
//                     Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} articles
//                   </div>
//                   <div className="flex space-x-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       disabled={pagination.page === 1}
//                       onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
//                     >
//                       Previous
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       disabled={pagination.page === pagination.pages}
//                       onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
//                     >
//                       Next
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }



























"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Filter, Edit, Trash2, Eye, PlusCircle, Loader2, X } from "lucide-react"
import Link from "next/link"

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

interface Article {
  _id: string
  title: string
  titleHi?: string
  content: string
  contentHi?: string
  excerpt?: string
  excerptHi?: string
  slug: string
  slugHi?: string
  categoryId: string | Category | null
  authorId: string
  featuredImage: string
  mediaUrls: string[]
  sourcePersonName?: string
  sourcePersonNameHi?: string
  sourcePersonSocial: {
    twitter: string
    facebook: string
    instagram: string
    linkedin: string
  }
  layoutConfig: {
    showAuthor: boolean
    showDate: boolean
    showCategory: boolean
    showSocialShare: boolean
    imagePosition: string
    textAlign: string
  }
  status: string
  publishedAt: string | null
  views: number
  likes: number
  shares: number
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

interface ApiResponse {
  success: boolean
  message: string
  data: {
    articles: Article[]
    pagination: Pagination
  }
}

// Simple toast implementation
const useToast = () => {
  const showToast = (title: string, description: string, variant: "default" | "destructive" = "default") => {
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
      document.body.removeChild(toast)
    }, 3000)
  }

  return {
    toast: showToast
  }
}

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  })
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const { toast } = useToast()

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true)
        
        // Build query parameters
        const params = new URLSearchParams()
        params.append('page', pagination.page.toString())
        params.append('limit', pagination.limit.toString())
        
        if (statusFilter !== 'all') {
          params.append('status', statusFilter)
        }
        
        if (searchTerm) {
          params.append('search', searchTerm)
        }
        
        if (categoryFilter !== 'all') {
          params.append('category', categoryFilter)
        }

        const response = await fetch(`/api/news?${params.toString()}`)
        
        if (response.ok) {
          const data: ApiResponse = await response.json()
          setArticles(data.data.articles)
          setPagination(data.data.pagination)
        } else {
          throw new Error('Failed to fetch articles')
        }
      } catch (error) {
        console.error("Error fetching articles:", error)
        toast("Error", "Failed to load articles", "destructive")
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [searchTerm, statusFilter, categoryFilter, pagination.page, pagination.limit])

  const handleDelete = async (articleId: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return

    try {
      const response = await fetch(`/api/news/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.ok) {
        toast("Success", "Article deleted successfully")
        // Refresh the articles list
        setArticles(prev => prev.filter(article => article._id !== articleId))
      } else {
        throw new Error('Failed to delete article')
      }
    } catch (error) {
      console.error("Error deleting article:", error)
      toast("Error", "Failed to delete article", "destructive")
    }
  }

  const handlePreview = (article: Article) => {
    setSelectedArticle(article)
    setIsPreviewModalOpen(true)
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      archived: "bg-gray-100 text-gray-800",
    }
    return variants[status as keyof typeof variants] || variants.draft
  }

  const getDisplayTitle = (article: Article) => {
    return article.title || article.titleHi || "Untitled Article"
  }

  const getDisplayCategory = (article: Article) => {
    if (!article.categoryId) return "Uncategorized"
    
    if (typeof article.categoryId === 'string') {
      return article.categoryId // Return ID if category is not populated
    }
    
    // If category is populated with full details
    const category = article.categoryId as Category
    return category.parentCategoryName 
      ? `${category.parentCategoryName} > ${category.name}`
      : category.name
  }

  const getCategoryName = (article: Article) => {
    if (!article.categoryId) return "Uncategorized"
    
    if (typeof article.categoryId === 'string') {
      return "Unknown Category" // Return generic name if only ID is available
    }
    
    // If category is populated with full details
    const category = article.categoryId as Category
    return category.name
  }

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      getDisplayTitle(article).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.sourcePersonName && article.sourcePersonName.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === "all" || article.status === statusFilter
    const matchesCategory = categoryFilter === "all" || getCategoryName(article) === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Extract unique categories for filter dropdown
  const uniqueCategories = Array.from(
    new Set(
      articles
        .map(article => getCategoryName(article))
        .filter(category => category !== "Uncategorized" && category !== "Unknown Category")
    )
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Articles</h1>
          <p className="text-muted-foreground">Manage all your news articles</p>
        </div>
        <Button asChild>
          <Link href="/admin/articles/new" className="flex items-center space-x-2">
            <PlusCircle className="h-4 w-4" />
            <span>New Article</span>
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles or authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Articles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Articles ({filteredArticles.length})</CardTitle>
          <CardDescription>A list of all articles in your news website</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading articles...</span>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredArticles.map((article) => (
                    <TableRow key={article._id}>
                      <TableCell className="font-medium">
                        <div className="max-w-[300px] truncate">{getDisplayTitle(article)}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{getDisplayCategory(article)}</Badge>
                      </TableCell>
                      <TableCell>{article.sourcePersonName || "Unknown"}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(article.status)}>{article.status}</Badge>
                      </TableCell>
                      <TableCell>{article.views.toLocaleString()}</TableCell>
                      <TableCell>
                        {article.publishedAt
                          ? new Date(article.publishedAt).toLocaleDateString()
                          : new Date(article.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handlePreview(article)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/articles/${article._id}/edit`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(article._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} articles
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page === 1}
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page === pagination.pages}
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Article Preview Modal */}
      <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Article Preview</span>
              <Button variant="ghost" size="sm" onClick={() => setIsPreviewModalOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Preview of the selected article
            </DialogDescription>
          </DialogHeader>

          {selectedArticle && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge className={getStatusBadge(selectedArticle.status)}>
                  {selectedArticle.status}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  {selectedArticle.publishedAt
                    ? `Published: ${new Date(selectedArticle.publishedAt).toLocaleDateString()}`
                    : `Created: ${new Date(selectedArticle.createdAt).toLocaleDateString()}`}
                </div>
              </div>

              {selectedArticle.featuredImage && (
                <img
                  src={selectedArticle.featuredImage}
                  alt="Featured"
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}

              <div>
                <h2 className="text-2xl font-bold">{getDisplayTitle(selectedArticle)}</h2>
                {selectedArticle.excerpt && (
                  <p className="text-muted-foreground mt-2">{selectedArticle.excerpt}</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Content</h3>
                <div className="prose max-w-none">
                  {selectedArticle.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {selectedArticle.contentHi && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Content (Hindi)</h3>
                  <div className="prose max-w-none">
                    {selectedArticle.contentHi.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Article Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Category:</span> {getDisplayCategory(selectedArticle)}</p>
                    <p><span className="font-medium">Author:</span> {selectedArticle.sourcePersonName || "Unknown"}</p>
                    <p><span className="font-medium">Views:</span> {selectedArticle.views}</p>
                    <p><span className="font-medium">Likes:</span> {selectedArticle.likes}</p>
                    <p><span className="font-medium">Shares:</span> {selectedArticle.shares}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold">Social Media Links</h4>
                  <div className="space-y-1 text-sm">
                    {selectedArticle.sourcePersonSocial.twitter && (
                      <p><span className="font-medium">Twitter:</span> {selectedArticle.sourcePersonSocial.twitter}</p>
                    )}
                    {selectedArticle.sourcePersonSocial.facebook && (
                      <p><span className="font-medium">Facebook:</span> {selectedArticle.sourcePersonSocial.facebook}</p>
                    )}
                    {selectedArticle.sourcePersonSocial.instagram && (
                      <p><span className="font-medium">Instagram:</span> {selectedArticle.sourcePersonSocial.instagram}</p>
                    )}
                    {selectedArticle.sourcePersonSocial.linkedin && (
                      <p><span className="font-medium">LinkedIn:</span> {selectedArticle.sourcePersonSocial.linkedin}</p>
                    )}
                  </div>
                </div>
              </div>

              {selectedArticle.mediaUrls.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Media Files</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedArticle.mediaUrls.map((url, index) => (
                      <div key={index} className="border rounded-lg p-2">
                        <p className="text-xs truncate">{url}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}