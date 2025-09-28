// "use client"

// import type React from "react"

// import Link from "next/link"
// import { Badge } from "@/components/ui/badge"
// import { Eye, Clock, Heart, Share2, Bookmark } from "lucide-react"
// import { useState } from "react"

// interface NewsCardProps {
//   article: {
//     _id: string
//     title: string
//     subtitle?: string
//     excerpt: string
//     featuredImage?: string
//     category: {
//       name: string
//       slug: string
//     }
//     author: {
//       name: string
//     }
//     contributorName?: string
//     publishedAt: string
//     views: number
//     readingTime: number
//     isBreaking?: boolean
//     isFeatured?: boolean
//     language: "en" | "hi"
//   }
//   variant?: "featured" | "standard" | "compact"
// }

// export function NewsCard({ article, variant = "standard" }: NewsCardProps) {
//   const [isLiked, setIsLiked] = useState(false)
//   const [isBookmarked, setIsBookmarked] = useState(false)
//   const [isHovered, setIsHovered] = useState(false)

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     })
//   }

//   const handleLike = (e: React.MouseEvent) => {
//     e.preventDefault()
//     setIsLiked(!isLiked)
//   }

//   const handleBookmark = (e: React.MouseEvent) => {
//     e.preventDefault()
//     setIsBookmarked(!isBookmarked)
//   }

//   const handleShare = (e: React.MouseEvent) => {
//     e.preventDefault()
//     // Share functionality
//   }

//   if (variant === "featured") {
//     return (
//       <Link href={`/news/${article._id}`} className="group block">
//         <div
//           className="relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           {article.featuredImage && (
//             <div className="relative h-64 md:h-80 overflow-hidden">
//               <img
//                 src={article.featuredImage || "/placeholder.svg?height=320&width=600"}
//                 alt={article.title}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//               />
//               <div
//                 className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 ${isHovered ? "from-black/80" : ""}`}
//               />

//               {article.isBreaking && (
//                 <Badge className="absolute top-4 left-4 bg-red-600 text-white animate-pulse shadow-lg">
//                   🚨 BREAKING
//                 </Badge>
//               )}

//               <div
//                 className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
//               >
//                 <button
//                   onClick={handleBookmark}
//                   className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-110"
//                 >
//                   <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
//                 </button>
//                 <button
//                   onClick={handleShare}
//                   className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-110"
//                 >
//                   <Share2 className="w-4 h-4" />
//                 </button>
//               </div>

//               <div className="absolute bottom-4 left-4 right-4 text-white">
//                 <Badge variant="secondary" className="mb-2 animate-fadeInUp">
//                   {article.category.name}
//                 </Badge>
//                 <h2
//                   className="text-xl md:text-2xl font-bold mb-2 line-clamp-2 animate-fadeInUp"
//                   style={{ animationDelay: "0.1s" }}
//                 >
//                   {article.title}
//                 </h2>
//                 {article.subtitle && (
//                   <p className="text-gray-200 text-sm line-clamp-2 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
//                     {article.subtitle}
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </Link>
//     )
//   }

//   if (variant === "compact") {
//     return (
//       <Link href={`/news/${article._id}`} className="group block">
//         <div className="flex gap-4 p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-md transform hover:scale-[1.02]">
//           {article.featuredImage && (
//             <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
//               <img
//                 src={article.featuredImage || "/placeholder.svg?height=80&width=80"}
//                 alt={article.title}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//               />
//             </div>
//           )}
//           <div className="flex-1 min-w-0">
//             <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
//               {article.title}
//             </h3>
//             <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
//               <span>{formatDate(article.publishedAt)}</span>
//               <span>•</span>
//               <span className="flex items-center gap-1">
//                 <Eye className="w-3 h-3" />
//                 {article.views}
//               </span>
//             </div>
//           </div>
//         </div>
//       </Link>
//     )
//   }

//   return (
//     <div className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
//       <Link href={`/news/${article._id}`} className="block">
//         <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 hover:scale-[1.02]">
//           {article.featuredImage && (
//             <div className="relative h-48 overflow-hidden">
//               <img
//                 src={article.featuredImage || "/placeholder.svg?height=192&width=400"}
//                 alt={article.title}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//               />
//               <div
//                 className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
//               />

//               {article.isBreaking && (
//                 <Badge className="absolute top-3 left-3 bg-red-600 text-white animate-pulse shadow-lg">
//                   🚨 BREAKING
//                 </Badge>
//               )}

//               <div
//                 className={`absolute top-3 right-3 flex gap-2 transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
//               >
//                 <button
//                   onClick={handleLike}
//                   className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110 shadow-lg"
//                 >
//                   <Heart
//                     className={`w-4 h-4 transition-colors duration-200 ${isLiked ? "text-red-500 fill-current" : "text-gray-600"}`}
//                   />
//                 </button>
//                 <button
//                   onClick={handleBookmark}
//                   className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110 shadow-lg"
//                 >
//                   <Bookmark
//                     className={`w-4 h-4 transition-colors duration-200 ${isBookmarked ? "text-blue-500 fill-current" : "text-gray-600"}`}
//                   />
//                 </button>
//               </div>
//             </div>
//           )}

//           <div className="p-4">
//             <div className="flex items-center gap-2 mb-2">
//               <Badge
//                 variant="outline"
//                 className="text-xs hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
//               >
//                 {article.category.name}
//               </Badge>
//               {article.isFeatured && (
//                 <Badge variant="secondary" className="text-xs animate-shimmer">
//                   ⭐ Featured
//                 </Badge>
//               )}
//             </div>

//             <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
//               {article.title}
//             </h3>

//             {article.subtitle && <p className="text-gray-600 text-sm mb-2 line-clamp-1">{article.subtitle}</p>}

//             <p className="text-gray-500 text-sm mb-3 line-clamp-2">{article.excerpt}</p>

//             <div className="flex items-center justify-between text-xs text-gray-500">
//               <div className="flex items-center gap-2">
//                 <span>By {article.author.name}</span>
//                 {article.contributorName && (
//                   <>
//                     <span>•</span>
//                     <span>News by {article.contributorName}</span>
//                   </>
//                 )}
//               </div>
//               <div className="flex items-center gap-3">
//                 <span className="flex items-center gap-1 hover:text-gray-700 transition-colors duration-200">
//                   <Clock className="w-3 h-3" />
//                   {article.readingTime} min
//                 </span>
//                 <span className="flex items-center gap-1 hover:text-gray-700 transition-colors duration-200">
//                   <Eye className="w-3 h-3" />
//                   {article.views}
//                 </span>
//               </div>
//             </div>

//             <div className="mt-2 text-xs text-gray-400">{formatDate(article.publishedAt)}</div>
//           </div>
//         </div>
//       </Link>

//       <div
//         className={`absolute bottom-4 right-4 transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
//       >
//         <button
//           onClick={handleShare}
//           className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-all duration-200 hover:scale-110 shadow-lg"
//         >
//           <Share2 className="w-4 h-4" />
//         </button>
//       </div>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes shimmer {
//           0% { background-position: -200px 0; }
//           100% { background-position: calc(200px + 100%) 0; }
//         }
//         .animate-fadeInUp {
//           animation: fadeInUp 0.6s ease-out forwards;
//         }
//         .animate-shimmer {
//           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
//           background-size: 200px 100%;
//           animation: shimmer 2s infinite;
//         }
//       `}</style>
//     </div>
//   )
// }


















// components/public/news-card.tsx
"use client"

import type React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Eye, Clock, Heart, Share2, Bookmark } from "lucide-react"
import { useState } from "react"

interface NewsCardProps {
  article: {
    _id: string
    title: string
    subtitle?: string
    excerpt: string
    featuredImage?: string
    category: { name: string; slug: string }
    author: { name: string }
    contributorName?: string
    publishedAt: string
    views: number
    readingTime: number
    isBreaking?: boolean
    isFeatured?: boolean
    language: "en" | "hi"
  }
  variant?: "featured" | "standard" | "compact"
}

export function NewsCard({ article, variant = "standard" }: NewsCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLiked(!isLiked)
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    // TODO: implement share logic
  }

  // ✨ Compact Variant
  if (variant === "compact") {
    return (
      <Link href={`/news/${article._id}`} className="group block">
        <div className="flex gap-4 p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-md transform hover:scale-[1.02]">
          {article.featuredImage && (
            <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
              {article.title}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
              <span>{formatDate(article.publishedAt)}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {article.views}
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // ✨ Featured Variant
  if (variant === "featured") {
    return (
      <Link href={`/news/${article._id}`} className="group block">
        <div
          className="relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {article.featuredImage && (
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 ${isHovered ? "from-black/80" : ""}`}
              />
              {article.isBreaking && (
                <Badge className="absolute top-4 left-4 bg-red-600 text-white animate-pulse shadow-lg">🚨 BREAKING</Badge>
              )}
              <div
                className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
              >
                <button
                  onClick={handleBookmark}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-110"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-110"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <Badge variant="secondary" className="mb-2 animate-fadeInUp">
                  {article.category.name}
                </Badge>
                <h2 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2 animate-fadeInUp">{article.title}</h2>
                {article.subtitle && (
                  <p className="text-gray-200 text-sm line-clamp-2 animate-fadeInUp">{article.subtitle}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
    )
  }

  // ✨ Standard Variant (default)
  return (
    <div className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link href={`/news/${article._id}`} className="block">
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 hover:scale-[1.02]">
          {article.featuredImage && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
              />
              {article.isBreaking && (
                <Badge className="absolute top-3 left-3 bg-red-600 text-white animate-pulse shadow-lg">
                  🚨 BREAKING
                </Badge>
              )}
              <div
                className={`absolute top-3 right-3 flex gap-2 transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
              >
                <button
                  onClick={handleLike}
                  className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:scale-110"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "text-red-500 fill-current" : "text-gray-600"}`} />
                </button>
                <button
                  onClick={handleBookmark}
                  className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:scale-110"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? "text-blue-500 fill-current" : "text-gray-600"}`} />
                </button>
              </div>
            </div>
          )}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{article.category}</Badge>
              {/* <Badge variant="outline">{article?.categoryId}</Badge> */}
              {article.isFeatured && (
                <Badge variant="secondary" className="animate-shimmer">
                  ⭐ Featured
                </Badge>
              )}
            </div>
            <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-600">{article.title}</h3>
            {article.subtitle && <p className="text-gray-600 text-sm mb-2">{article.subtitle}</p>}
            <div className="flex items-center gap-3 text-sm text-gray-500">
              {/* <span>By {article.author.name || article.contributorName}</span> */}
              <span>By {article?.author || article.contributorName}</span>
              <span>•</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {article.views}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}












