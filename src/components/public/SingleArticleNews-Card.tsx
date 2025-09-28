// "use client"

// import type React from "react"
// import Link from "next/link"
// import { Badge } from "@/components/ui/badge"
// import { Eye, Clock, Heart, Share2, Bookmark } from "lucide-react"
// import { useState } from "react"
// import { useLanguage } from "@/contexts/language-context"

// interface NewsCardProps {
//   article: {
//     _id: string
//     title: string
//     titleHi?: string
//     subtitle?: string
//     excerpt: string
//     featuredImage?: string
//     categoryId: {
//       _id: string
//       name: string
//       slug: string
//       color?: string
//     } | null
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
//     heroArticle?: boolean
//   }
//   variant?: "featured" | "standard" | "compact"
// }

// export function NewsCard({ article, variant = "standard" }: NewsCardProps) {
//   const [isLiked, setIsLiked] = useState(false)
//   const [isBookmarked, setIsBookmarked] = useState(false)
//   const [isHovered, setIsHovered] = useState(false)
//   const { language } = useLanguage()

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     })
//   }

//   const getTitle = () => {
//     return language === 'hi' && article.titleHi ? article.titleHi : article.title
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
//     // TODO: implement share logic
//   }

//   // ✨ Compact Variant
//   if (variant === "compact") {
//     return (
//       <Link href={`/news/${article._id}`} className="group block">
//         <div className="flex gap-4 p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-md transform hover:scale-[1.02]">
//           {article.featuredImage && (
//             <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
//               <img
//                 src={article.featuredImage}
//                 alt={getTitle()}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//               />
//             </div>
//           )}
//           <div className="flex-1 min-w-0">
//             <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
//               {getTitle()}
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

//   // ✨ Featured Variant
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
//                 src={article.featuredImage}
//                 alt={getTitle()}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//               />
//               <div
//                 className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 ${isHovered ? "from-black/80" : ""}`}
//               />
//               {article.isBreaking && (
//                 <Badge className="absolute top-4 left-4 bg-red-600 text-white animate-pulse shadow-lg">🚨 BREAKING</Badge>
//               )}
//               {article.heroArticle && (
//                 <Badge className="absolute top-4 left-32 bg-blue-600 text-white shadow-lg">⭐ HERO</Badge>
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
//                 {article.categoryId && (
//                   <Badge 
//                     variant="secondary" 
//                     className="mb-2 animate-fadeInUp"
//                     style={{ backgroundColor: article.categoryId.color }}
//                   >
//                     {article.categoryId.name}
//                   </Badge>
//                 )}
//                 <h2 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2 animate-fadeInUp">{getTitle()}</h2>
//                 {article.subtitle && (
//                   <p className="text-gray-200 text-sm line-clamp-2 animate-fadeInUp">{article.subtitle}</p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </Link>
//     )
//   }

//   // ✨ Standard Variant (default)
//   return (
//     <div className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
//       <Link href={`/news/${article._id}`} className="block">
//         <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 hover:scale-[1.02]">
//           {article.featuredImage && (
//             <div className="relative h-48 overflow-hidden">
//               <img
//                 src={article.featuredImage}
//                 alt={getTitle()}
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
//               {article.heroArticle && (
//                 <Badge className="absolute top-3 left-20 bg-blue-600 text-white shadow-lg">
//                   ⭐ HERO
//                 </Badge>
//               )}
//               <div
//                 className={`absolute top-3 right-3 flex gap-2 transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
//               >
//                 <button
//                   onClick={handleLike}
//                   className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:scale-110"
//                 >
//                   <Heart className={`w-4 h-4 ${isLiked ? "text-red-500 fill-current" : "text-gray-600"}`} />
//                 </button>
//                 <button
//                   onClick={handleBookmark}
//                   className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:scale-110"
//                 >
//                   <Bookmark className={`w-4 h-4 ${isBookmarked ? "text-blue-500 fill-current" : "text-gray-600"}`} />
//                 </button>
//               </div>
//             </div>
//           )}
//           <div className="p-4">
//             <div className="flex items-center gap-2 mb-2">
//               {article.categoryId && (
//                 <Badge 
//                   variant="outline"
//                   style={{ 
//                     borderColor: article.categoryId.color,
//                     color: article.categoryId.color 
//                   }}
//                 >
//                   {article.categoryId.name}
//                 </Badge>
//               )}
//               {article.isFeatured && (
//                 <Badge variant="secondary" className="animate-shimmer">
//                   ⭐ Featured
//                 </Badge>
//               )}
//             </div>
//             <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-600">{getTitle()}</h3>
//             {article.subtitle && <p className="text-gray-600 text-sm mb-2">{article.subtitle}</p>}
//             <div className="flex items-center gap-3 text-sm text-gray-500">
//               <span>By {article.author?.name || article.contributorName}</span>
//               <span>•</span>
//               <span>{formatDate(article.publishedAt)}</span>
//               <span>•</span>
//               <span className="flex items-center gap-1">
//                 <Eye className="w-4 h-4" />
//                 {article.views}
//               </span>
//               <span>•</span>
//               <span className="flex items-center gap-1">
//                 <Clock className="w-4 h-4" />
//                 {article.readingTime} min read
//               </span>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </div>
//   )
// }



















// app/opinions/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Plus, Heart, MessageCircle, Share, Clock, User, Search, Filter, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

interface Author {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
}

interface Opinion {
  _id: string;
  title: string;
  imageUrl?: string;
  content: string;
  topic: string;
  tags: string[];
  authorId: Author;
  status: 'approved';
  likes: number;
  dislikes: number;
  likedBy: string[];
  dislikedBy: string[];
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  excerpt?: string;
  readTime?: number;
}

export default function OpinionsPage() {
  const router = useRouter();
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [userInteractions, setUserInteractions] = useState<{
    [opinionId: string]: 'liked' | 'disliked' | null;
  }>({});

  // Fetch opinions on component mount
  useEffect(() => {
    fetchOpinions();
    // Load user interactions from localStorage
    const savedInteractions = localStorage.getItem('user-opinion-interactions');
    if (savedInteractions) {
      setUserInteractions(JSON.parse(savedInteractions));
    }
  }, []);

  const fetchOpinions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/public/opinion');

      if (!response.ok) {
        throw new Error('Failed to fetch opinions');
      }

      const data = await response.json();
      // Only show approved opinions to users
      const approvedOpinions = data.opinions?.filter((opinion: Opinion) => 
        opinion.status === 'approved'
      ) || [];
      setOpinions(approvedOpinions);
    } catch (error) {
      console.error('Error fetching opinions:', error);
      toast.error('Failed to load opinions');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (opinionId: string) => {
    try {
      const userId = localStorage.getItem('user-id') || 'anonymous';
      const currentInteraction = userInteractions[opinionId];
      
      // Optimistic update
      setOpinions(prev => prev.map(opinion => {
        if (opinion._id === opinionionId) {
          let newLikes = opinion.likes;
          let newDislikes = opinion.dislikes;
          let newLikedBy = [...opinion.likedBy];
          let newDislikedBy = [...opinion.dislikedBy];

          if (currentInteraction === 'liked') {
            // Remove like
            newLikes = Math.max(0, opinion.likes - 1);
            newLikedBy = newLikedBy.filter(id => id !== userId);
          } else if (currentInteraction === 'disliked') {
            // Switch from dislike to like
            newDislikes = Math.max(0, opinion.dislikes - 1);
            newLikes = opinion.likes + 1;
            newDislikedBy = newDislikedBy.filter(id => id !== userId);
            newLikedBy.push(userId);
          } else {
            // Add new like
            newLikes = opinion.likes + 1;
            newLikedBy.push(userId);
          }

          return {
            ...opinion,
            likes: newLikes,
            dislikes: newDislikes,
            likedBy: newLikedBy,
            dislikedBy: newDislikedBy
          };
        }
        return opinion;
      }));

      // Update user interactions
      const newInteraction = currentInteraction === 'liked' ? null : 'liked';
      const newUserInteractions = {
        ...userInteractions,
        [opinionId]: newInteraction
      };
      setUserInteractions(newUserInteractions);
      localStorage.setItem('user-opinion-interactions', JSON.stringify(newUserInteractions));

      // API call
      const response = await fetch(`/api/public/opinion/${opinionId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId,
          action: currentInteraction === 'liked' ? 'remove' : 'add'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update like');
      }

    } catch (error) {
      console.error('Error liking opinion:', error);
      toast.error('Failed to update reaction');
      // Revert optimistic update
      fetchOpinions();
    }
  };

  const handleDislike = async (opinionId: string) => {
    try {
      const userId = localStorage.getItem('user-id') || 'anonymous';
      const currentInteraction = userInteractions[opinionId];
      
      // Optimistic update
      setOpinions(prev => prev.map(opinion => {
        if (opinion._id === opinionionId) {
          let newLikes = opinion.likes;
          let newDislikes = opinion.dislikes;
          let newLikedBy = [...opinion.likedBy];
          let newDislikedBy = [...opinion.dislikedBy];

          if (currentInteraction === 'disliked') {
            // Remove dislike
            newDislikes = Math.max(0, opinion.dislikes - 1);
            newDislikedBy = newDislikedBy.filter(id => id !== userId);
          } else if (currentInteraction === 'liked') {
            // Switch from like to dislike
            newLikes = Math.max(0, opinion.likes - 1);
            newDislikes = opinion.dislikes + 1;
            newLikedBy = newLikedBy.filter(id => id !== userId);
            newDislikedBy.push(userId);
          } else {
            // Add new dislike
            newDislikes = opinion.dislikes + 1;
            newDislikedBy.push(userId);
          }

          return {
            ...opinion,
            likes: newLikes,
            dislikes: newDislikes,
            likedBy: newLikedBy,
            dislikedBy: newDislikedBy
          };
        }
        return opinion;
      }));

      // Update user interactions
      const newInteraction = currentInteraction === 'disliked' ? null : 'disliked';
      const newUserInteractions = {
        ...userInteractions,
        [opinionId]: newInteraction
      };
      setUserInteractions(newUserInteractions);
      localStorage.setItem('user-opinion-interactions', JSON.stringify(newUserInteractions));

      // API call
      const response = await fetch(`/api/public/opinion/${opinionId}/dislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId,
          action: currentInteraction === 'disliked' ? 'remove' : 'add'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update dislike');
      }

    } catch (error) {
      console.error('Error disliking opinion:', error);
      toast.error('Failed to update reaction');
      // Revert optimistic update
      fetchOpinions();
    }
  };

  // Get unique topics for filter
  const topics = ['all', ...new Set(opinions.map(opinion => opinion.topic))];

  // Filter opinions based on search and topic
  const filteredOpinions = opinions.filter(opinion => {
    const matchesSearch = opinion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opinion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opinion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTopic = selectedTopic === 'all' || opinion.topic === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading opinions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Public Opinions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Read, share, and engage with diverse perspectives on various topics
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search opinions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              {topics.map(topic => (
                <option key={topic} value={topic}>
                  {topic === 'all' ? 'All Topics' : topic}
                </option>
              ))}
            </select>
            <Button asChild>
              <Link href="/opinions/new">
                <Plus className="w-4 h-4 mr-2" />
                Write Opinion
              </Link>
            </Button>
          </div>
        </div>

        {/* Opinions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpinions.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-muted-foreground mb-4">
                No opinions found. Be the first to share your thoughts!
              </div>
              <Button asChild>
                <Link href="/opinions/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Write First Opinion
                </Link>
              </Button>
            </div>
          ) : (
            filteredOpinions.map((opinion) => (
              <Card key={opinion._id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-0">
                  {/* Image */}
                  {opinion.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={opinion.imageUrl}
                        alt={opinion.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-primary text-primary-foreground">
                          {opinion.topic}
                        </Badge>
                      </div>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <User className="w-4 h-4" />
                      <span>{opinion.authorId.name}</span>
                      <span>•</span>
                      <Clock className="w-4 h-4" />
                      <span>{getReadTime(opinion.content)} min read</span>
                    </div>

                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      <Link href={`/opinions/${opinion._id}`}>
                        {opinion.title}
                      </Link>
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {opinion.content.substring(0, 150)}...
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {opinion.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {opinion.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{opinion.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between border-t pt-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(opinion._id);
                          }}
                          className={`flex items-center gap-1 text-sm ${
                            userInteractions[opinion._id] === 'liked' 
                              ? 'text-green-600' 
                              : 'text-muted-foreground hover:text-green-600'
                          } transition-colors`}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>{opinion.likes}</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDislike(opinion._id);
                          }}
                          className={`flex items-center gap-1 text-sm ${
                            userInteractions[opinion._id] === 'disliked' 
                              ? 'text-red-600' 
                              : 'text-muted-foreground hover:text-red-600'
                          } transition-colors`}
                        >
                          <ThumbsDown className="w-4 h-4" />
                          <span>{opinion.dislikes}</span>
                        </button>

                        <Link 
                          href={`/opinions/${opinion._id}#comments`}
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{opinion.commentCount || 0}</span>
                        </Link>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <Link href={`/opinions/${opinion._id}`}>
                          Read More
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}