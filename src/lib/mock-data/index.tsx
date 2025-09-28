// import type { User } from "@/lib/models/User"
// import type { News } from "@/lib/models/News"
// import type { Category } from "@/lib/models/Category"
// import type { NewsletterSubscriber } from "@/lib/models/Newsletter"

// // Mock ObjectId generator
// function mockObjectId() {
//   return Math.random().toString(36).substring(2, 15)
// }

// // Mock Users Data
// export const mockUsers: (User & { _id: string })[] = [
//   {
//     _id: "admin123",
//     name: "Admin User",
//     email: "admin@republicmirror.com",
//     password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm", // password: admin123
//     role: "admin",
//     profileImage: "/admin-profile.png",
//     bio: "Administrator of Republic Mirror",
//     socialLinks: {
//       twitter: "https://twitter.com/republicmirror",
//       facebook: "https://facebook.com/republicmirror",
//     },
//     isActive: true,
//     createdAt: new Date("2024-01-01"),
//     updatedAt: new Date("2024-01-01"),
//   },
//   {
//     _id: "writer123",
//     name: "Rajesh Kumar",
//     email: "rajesh@republicmirror.com",
//     password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm", // password: writer123
//     role: "writer",
//     profileImage: "/writer-profile.jpg",
//     bio: "Senior Political Correspondent",
//     isActive: true,
//     createdAt: new Date("2024-01-15"),
//     updatedAt: new Date("2024-01-15"),
//   },
// ]

// // Mock Categories Data
// export const mockCategories: (Category & { _id: string })[] = [
//   {
//     _id: "cat1",
//     name: "National",
//     slug: "national",
//     color: "#dc2626",
//     order: 1,
//     isActive: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     _id: "cat2",
//     name: "International",
//     slug: "international",
//     color: "#2563eb",
//     order: 2,
//     isActive: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     _id: "cat3",
//     name: "Politics",
//     slug: "politics",
//     color: "#7c3aed",
//     order: 3,
//     isActive: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     _id: "cat4",
//     name: "Economy",
//     slug: "economy",
//     color: "#059669",
//     order: 4,
//     isActive: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     _id: "cat5",
//     name: "Sports",
//     slug: "sports",
//     color: "#ea580c",
//     order: 5,
//     isActive: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     _id: "cat6",
//     name: "Technology",
//     slug: "technology",
//     color: "#0891b2",
//     order: 6,
//     isActive: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ]

// // Mock News Data
// export const mockNews: (News & { _id: string; category: any; author: any })[] = [
//   {
//     _id: "news1",
//     title: "भारत में आर्थिक सुधार की राजनीति",
//     subtitle: "नई नीतियों का प्रभाव और चुनौतियां",
//     slug: "bharat-mein-arthik-sudhar-ki-rajneeti",
//     content: `<p>भारत की आर्थिक नीतियों में हाल के बदलाव देश की राजनीतिक दिशा को नया मोड़ दे रहे हैं। विशेषज्ञों का मानना है कि ये सुधार दीर्घकालिक विकास के लिए आवश्यक हैं।</p>

// <p>सरकार द्वारा लाए गए नए कानून और नीतियां विभिन्न क्षेत्रों में व्यापक बदलाव ला रही हैं। इनमें कृषि, उद्योग, और सेवा क्षेत्र सभी शामिल हैं।</p>

// <p>हालांकि, इन सुधारों को लेकर विपक्षी दलों की आपत्तियां भी हैं। वे इन नीतियों को जनविरोधी बताते हुए इनका विरोध कर रहे हैं।</p>`,
//     excerpt: "भारत की आर्थिक नीतियों में हाल के बदलाव देश की राजनीतिक दिशा को नया मोड़ दे रहे हैं।",
//     featuredImage: "/indian-parliament-building.jpg",
//     gallery: ["/economic-reform-chart.jpg", "/indian-economy-growth.jpg"],
//     category: mockCategories[2], // Politics
//     tags: ["राजनीति", "आर्थिक सुधार", "नीति", "भारत"],
//     author: mockUsers[1], // Rajesh Kumar
//     contributorName: "अमित शर्मा",
//     contributorSocialLinks: {
//       twitter: "https://twitter.com/amitsharma",
//       facebook: "https://facebook.com/amitsharma",
//     },
//     status: "published" as const,
//     language: "hi" as const,
//     layout: "featured" as const,
//     seoTitle: "भारत में आर्थिक सुधार की राजनीति - Republic Mirror",
//     seoDescription: "भारत की आर्थिक नीतियों में हाल के बदलाव और उनका राजनीतिक प्रभाव",
//     seoKeywords: ["भारत", "आर्थिक सुधार", "राजनीति", "नीति"],
//     publishedAt: new Date("2024-12-06T10:00:00Z"),
//     views: 1250,
//     likes: 45,
//     shares: 23,
//     readingTime: 3,
//     isBreaking: true,
//     isFeatured: true,
//     isSticky: false,
//     createdAt: new Date("2024-12-06T09:00:00Z"),
//     updatedAt: new Date("2024-12-06T09:30:00Z"),
//   },
//   {
//     _id: "news2",
//     title: "International Trade Relations Shift",
//     subtitle: "New partnerships emerge in global markets",
//     slug: "international-trade-relations-shift",
//     content: `<p>Global trade dynamics are experiencing significant changes as new partnerships emerge between major economies. These developments are reshaping international commerce.</p>

// <p>The recent agreements between various nations indicate a shift towards more collaborative economic policies. This trend is expected to continue throughout the year.</p>

// <p>Experts believe these changes will have long-lasting effects on global supply chains and economic stability.</p>`,
//     excerpt:
//       "Global trade dynamics are experiencing significant changes as new partnerships emerge between major economies.",
//     featuredImage: "/international-trade-meeting.jpg",
//     category: mockCategories[1], // International
//     tags: ["trade", "international", "economy", "partnerships"],
//     author: mockUsers[0], // Admin User
//     contributorName: "Sarah Johnson",
//     contributorSocialLinks: {
//       twitter: "https://twitter.com/sarahjohnson",
//       linkedin: "https://linkedin.com/in/sarahjohnson",
//     },
//     status: "published" as const,
//     language: "en" as const,
//     layout: "standard" as const,
//     seoTitle: "International Trade Relations Shift - Republic Mirror",
//     seoDescription: "New partnerships emerge in global markets reshaping international commerce",
//     publishedAt: new Date("2024-12-06T08:00:00Z"),
//     views: 890,
//     likes: 32,
//     shares: 18,
//     readingTime: 2,
//     isBreaking: false,
//     isFeatured: true,
//     isSticky: false,
//     createdAt: new Date("2024-12-06T07:00:00Z"),
//     updatedAt: new Date("2024-12-06T07:30:00Z"),
//   },
//   {
//     _id: "news3",
//     title: "तकनीकी क्रांति का नया दौर",
//     subtitle: "AI और मशीन लर्निंग का बढ़ता प्रभाव",
//     slug: "takneeki-kranti-ka-naya-daur",
//     content: `<p>आर्टिफिशियल इंटेलिजेंस और मशीन लर्निंग के क्षेत्र में हो रहे विकास ने तकनीकी दुनिया में एक नई क्रांति ला दी है।</p>

// <p>भारतीय कंपनियां भी इस क्षेत्र में तेजी से आगे बढ़ रही हैं और नए समाधान विकसित कर रही हैं।</p>`,
//     excerpt: "आर्टिफिशियल इंटेलिजेंस और मशीन लर्निंग के क्षेत्र में हो रहे विकास ने तकनीकी दुनिया में एक नई क्रांति ला दी है।",
//     featuredImage: "/artificial-intelligence-technology.png",
//     category: mockCategories[5], // Technology
//     tags: ["तकनीक", "AI", "मशीन लर्निंग", "भारत"],
//     author: mockUsers[1],
//     status: "published" as const,
//     language: "hi" as const,
//     layout: "standard" as const,
//     publishedAt: new Date("2024-12-05T15:00:00Z"),
//     views: 567,
//     likes: 28,
//     shares: 12,
//     readingTime: 2,
//     isBreaking: false,
//     isFeatured: false,
//     isSticky: false,
//     createdAt: new Date("2024-12-05T14:00:00Z"),
//     updatedAt: new Date("2024-12-05T14:30:00Z"),
//   },
//   {
//     _id: "news4",
//     title: "Sports Championship Updates",
//     subtitle: "Latest results from national tournaments",
//     slug: "sports-championship-updates",
//     content: `<p>The national sports championships have concluded with remarkable performances from athletes across the country.</p>

// <p>Several records were broken during the competitions, showcasing the rising talent in Indian sports.</p>`,
//     excerpt:
//       "The national sports championships have concluded with remarkable performances from athletes across the country.",
//     featuredImage: "/sports-championship-celebration.png",
//     category: mockCategories[4], // Sports
//     tags: ["sports", "championship", "athletes", "records"],
//     author: mockUsers[0],
//     status: "published" as const,
//     language: "en" as const,
//     layout: "standard" as const,
//     publishedAt: new Date("2024-12-05T12:00:00Z"),
//     views: 423,
//     likes: 19,
//     shares: 8,
//     readingTime: 1,
//     isBreaking: false,
//     isFeatured: false,
//     isSticky: false,
//     createdAt: new Date("2024-12-05T11:00:00Z"),
//     updatedAt: new Date("2024-12-05T11:30:00Z"),
//   },
// ]

// // Mock Newsletter Subscribers
// export const mockNewsletterSubscribers: (NewsletterSubscriber & { _id: string })[] = [
//   {
//     _id: "sub1",
//     email: "user1@example.com",
//     name: "राम कुमार",
//     language: "hi",
//     isActive: true,
//     subscribedAt: new Date("2024-11-01"),
//     isVerified: true,
//   },
//   {
//     _id: "sub2",
//     email: "user2@example.com",
//     name: "John Doe",
//     language: "en",
//     isActive: true,
//     subscribedAt: new Date("2024-11-15"),
//     isVerified: true,
//   },
// ]

// // Helper functions to simulate database operations
// export function findUser(query: any) {
//   if (query.email) {
//     return mockUsers.find((user) => user.email === query.email && (!query.isActive || user.isActive))
//   }
//   if (query._id) {
//     return mockUsers.find((user) => user._id === query._id)
//   }
//   return null
// }

// export function findNews(query: any = {}) {
//   let results = [...mockNews]

//   if (query.status) {
//     results = results.filter((news) => news.status === query.status)
//   }
//   if (query.language) {
//     results = results.filter((news) => news.language === query.language)
//   }
//   if (query.isFeatured) {
//     results = results.filter((news) => news.isFeatured === query.isFeatured)
//   }
//   if (query._id) {
//     return results.find((news) => news._id === query._id)
//   }

//   return results
// }

// export function findCategories(query: any = {}) {
//   let results = [...mockCategories]
//   if (query.isActive) {
//     results = results.filter((cat) => cat.isActive === query.isActive)
//   }
//   return results
// }

// export function findNewsletterSubscribers(query: any = {}) {
//   let results = [...mockNewsletterSubscribers]
//   if (query.email) {
//     return results.find((sub) => sub.email === query.email)
//   }
//   if (query.isActive !== undefined) {
//     results = results.filter((sub) => sub.isActive === query.isActive)
//   }
//   return results
// }

// export function createNews(data: any) {
//   const newNews = {
//     _id: mockObjectId(),
//     ...data,
//     category: mockCategories.find((cat) => cat._id === data.category) || mockCategories[0],
//     author: mockUsers.find((user) => user._id === data.author) || mockUsers[0],
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     views: 0,
//     likes: 0,
//     shares: 0,
//   }
//   mockNews.unshift(newNews)
//   return { insertedId: newNews._id }
// }

// export function updateNews(id: string, data: any) {
//   const index = mockNews.findIndex((news) => news._id === id)
//   if (index !== -1) {
//     mockNews[index] = { ...mockNews[index], ...data, updatedAt: new Date() }
//     return { modifiedCount: 1 }
//   }
//   return { modifiedCount: 0 }
// }

// export function deleteNews(id: string) {
//   const index = mockNews.findIndex((news) => news._id === id)
//   if (index !== -1) {
//     mockNews.splice(index, 1)
//     return { deletedCount: 1 }
//   }
//   return { deletedCount: 0 }
// }

// export function createNewsletterSubscriber(data: any) {
//   const newSub = {
//     _id: mockObjectId(),
//     ...data,
//     subscribedAt: new Date(),
//     isVerified: true,
//   }
//   mockNewsletterSubscribers.push(newSub)
//   return { insertedId: newSub._id }
// }

















// import type { User } from "@/lib/models/User"
// import type { News } from "@/lib/models/News"
// import type { Category } from "@/lib/models/Category"
// import type { NewsletterSubscriber } from "@/lib/models/Newsletter"
// import { getDatabase } from "../mongodb"

// // Mock ObjectId generator
// function mockObjectId() {
//   return Math.random().toString(36).substring(2, 15)
// }

// // Mock Users Data
// export const mockUsers: (User & { _id: string })[] = [
//   {
//     _id: "admin123",
//     name: "Admin User",
//     email: "admin@republicmirror.com",
//     password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm", // password: admin123
//     role: "admin",
//     profileImage: "/admin-profile.png",
//     bio: "Administrator of Republic Mirror",
//     socialLinks: {
//       twitter: "https://twitter.com/republicmirror",
//       facebook: "https://facebook.com/republicmirror",
//     },
//     isActive: true,
//     createdAt: new Date("2024-01-01"),
//     updatedAt: new Date("2024-01-01"),
//   },
//   {
//     _id: "writer123",
//     name: "Rajesh Kumar",
//     email: "rajesh@republicmirror.com",
//     password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm", // password: writer123
//     role: "writer",
//     profileImage: "/writer-profile.jpg",
//     bio: "Senior Political Correspondent",
//     isActive: true,
//     createdAt: new Date("2024-01-15"),
//     updatedAt: new Date("2024-01-15"),
//   },
// ]

// // Mock Categories Data
// export const mockCategories: (Category & { _id: string })[] = [
//   {
//     _id: "cat1",
//     name: "National",
//     slug: "national",
//     color: "#dc2626",
//     order: 1,
//     isActive: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     _id: "cat2",
//     name: "International",
//     slug: "international",
//     color: "#2563eb",
//     order: 2,
//     isActive: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     _id: "cat3",
//     name: "Politics",
//     slug: "politics",
//     color: "#7c3aed",
//     order: 3,
//     isActive: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     _id: "cat4",
//     name: "Economy",
//     slug: "economy",
//     color: "#059669",
//     order: 4,
//     isActive: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     _id: "cat5",
//     name: "Sports",
//     slug: "sports",
//     color: "#ea580c",
//     order: 5,
//     isActive: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     _id: "cat6",
//     name: "Technology",
//     slug: "technology",
//     color: "#0891b2",
//     order: 6,
//     isActive: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ]

// // Mock News Data
// export const mockNews: (News & { _id: string; category: any; author: any })[] = [
//   {
//     _id: "news1",
//     title: "भारत में आर्थिक सुधार की राजनीति",
//     subtitle: "नई नीतियों का प्रभाव और चुनौतियां",
//     slug: "bharat-mein-arthik-sudhar-ki-rajneeti",
//     content: `<p>भारत की आर्थिक नीतियों में हाल के बदलाव देश की राजनीतिक दिशा को नया मोड़ दे रहे हैं। विशेषज्ञों का मानना है कि ये सुधार दीर्घकालिक विकास के लिए आवश्यक हैं।</p>

// <p>सरकार द्वारा लाए गए नए कानून और नीतियां विभिन्न क्षेत्रों में व्यापक बदलाव ला रही हैं। इनमें कृषि, उद्योग, और सेवा क्षेत्र सभी शामिल हैं।</p>

// <p>हालांकि, इन सुधारों को लेकर विपक्षी दलों की आपत्तियां भी हैं। वे इन नीतियों को जनविरोधी बताते हुए इनका विरोध कर रहे हैं।</p>`,
//     excerpt: "भारत की आर्थिक नीतियों में हाल के बदलाव देश की राजनीतिक दिशा को नया मोड़ दे रहे हैं।",
//     featuredImage: "/indian-parliament-building.jpg",
//     gallery: ["/economic-reform-chart.jpg", "/indian-economy-growth.jpg"],
//     category: mockCategories[2], // Politics
//     tags: ["राजनीति", "आर्थिक सुधार", "नीति", "भारत"],
//     author: mockUsers[1], // Rajesh Kumar
//     contributorName: "अमित शर्मा",
//     contributorSocialLinks: {
//       twitter: "https://twitter.com/amitsharma",
//       facebook: "https://facebook.com/amitsharma",
//     },
//     status: "published",
//     language: "hi",
//     layout: "featured",
//     seoTitle: "भारत में आर्थिक सुधार की राजनीति - Republic Mirror",
//     seoDescription: "भारत की आर्थिक नीतियों में हाल के बदलाव और उनका राजनीतिक प्रभाव",
//     seoKeywords: ["भारत", "आर्थिक सुधार", "राजनीति", "नीति"],
//     publishedAt: new Date("2024-12-06T10:00:00Z"),
//     views: 1250,
//     likes: 45,
//     shares: 23,
//     readingTime: 3,
//     isBreaking: true,
//     isFeatured: true,
//     isSticky: false,
//     createdAt: new Date("2024-12-06T09:00:00Z"),
//     updatedAt: new Date("2024-12-06T09:30:00Z"),
//   },
//   {
//     _id: "news2",
//     title: "International Trade Relations Shift",
//     subtitle: "New partnerships emerge in global markets",
//     slug: "international-trade-relations-shift",
//     content: `<p>Global trade dynamics are experiencing significant changes as new partnerships emerge between major economies. These developments are reshaping international commerce.</p>

// <p>The recent agreements between various nations indicate a shift towards more collaborative economic policies. This trend is expected to continue throughout the year.</p>

// <p>Experts believe these changes will have long-lasting effects on global supply chains and economic stability.</p>`,
//     excerpt:
//       "Global trade dynamics are experiencing significant changes as new partnerships emerge between major economies.",
//     featuredImage: "/international-trade-meeting.jpg",
//     category: mockCategories[1], // International
//     tags: ["trade", "international", "economy", "partnerships"],
//     author: mockUsers[0], // Admin User
//     contributorName: "Sarah Johnson",
//     contributorSocialLinks: {
//       twitter: "https://twitter.com/sarahjohnson",
//       linkedin: "https://linkedin.com/in/sarahjohnson",
//     },
//     status: "published",
//     language: "en",
//     layout: "standard",
//     seoTitle: "International Trade Relations Shift - Republic Mirror",
//     seoDescription: "New partnerships emerge in global markets reshaping international commerce",
//     publishedAt: new Date("2024-12-06T08:00:00Z"),
//     views: 890,
//     likes: 32,
//     shares: 18,
//     readingTime: 2,
//     isBreaking: false,
//     isFeatured: true,
//     isSticky: false,
//     createdAt: new Date("2024-12-06T07:00:00Z"),
//     updatedAt: new Date("2024-12-06T07:30:00Z"),
//   },
//   {
//     _id: "news3",
//     title: "तकनीकी क्रांति का नया दौर",
//     subtitle: "AI और मशीन लर्निंग का बढ़ता प्रभाव",
//     slug: "takneeki-kranti-ka-naya-daur",
//     content: `<p>आर्टिफिशियल इंटेलिजेंस और मशीन लर्निंग के क्षेत्र में हो रहे विकास ने तकनीकी दुनिया में एक नई क्रांति ला दी है।</p>

// <p>भारतीय कंपनियां भी इस क्षेत्र में तेजी से आगे बढ़ रही हैं और नए समाधान विकसित कर रही हैं।</p>`,
//     excerpt: "आर्टिफिशियल इंटेलिजेंस और मशीन लर्निंग के क्षेत्र में हो रहे विकास ने तकनीकी दुनिया में एक नई क्रांति ला दी है。",
//     featuredImage: "/artificial-intelligence-technology.png",
//     category: mockCategories[5], // Technology
//     tags: ["तकनीक", "AI", "मशीन लर्निंग", "भारत"],
//     author: mockUsers[1],
//     status: "published",
//     language: "hi",
//     layout: "standard",
//     publishedAt: new Date("2024-12-05T15:00:00Z"),
//     views: 567,
//     likes: 28,
//     shares: 12,
//     readingTime: 2,
//     isBreaking: false,
//     isFeatured: false,
//     isSticky: false,
//     createdAt: new Date("2024-12-05T14:00:00Z"),
//     updatedAt: new Date("2024-12-05T14:30:00Z"),
//   },
//   {
//     _id: "news4",
//     title: "Sports Championship Updates",
//     subtitle: "Latest results from national tournaments",
//     slug: "sports-championship-updates",
//     content: `<p>The national sports championships have concluded with remarkable performances from athletes across the country.</p>

// <p>Several records were broken during the competitions, showcasing the rising talent in Indian sports.</p>`,
//     excerpt:
//       "The national sports championships have concluded with remarkable performances from athletes across the country.",
//     featuredImage: "/sports-championship-celebration.png",
//     category: mockCategories[4], // Sports
//     tags: ["sports", "championship", "athletes", "records"],
//     author: mockUsers[0],
//     status: "published",
//     language: "en",
//     layout: "standard",
//     publishedAt: new Date("2024-12-05T12:00:00Z"),
//     views: 423,
//     likes: 19,
//     shares: 8,
//     readingTime: 1,
//     isBreaking: false,
//     isFeatured: false,
//     isSticky: false,
//     createdAt: new Date("2024-12-05T11:00:00Z"),
//     updatedAt: new Date("2024-12-05T11:30:00Z"),
//   },
// ]

// // Mock Newsletter Subscribers
// export const mockNewsletterSubscribers: (NewsletterSubscriber & { _id: string })[] = [
//   {
//     _id: "sub1",
//     email: "user1@example.com",
//     name: "राम कुमार",
//     language: "hi",
//     isActive: true,
//     subscribedAt: new Date("2024-11-01"),
//     isVerified: true,
//   },
//   {
//     _id: "sub2",
//     email: "user2@example.com",
//     name: "John Doe",
//     language: "en",
//     isActive: true,
//     subscribedAt: new Date("2024-11-15"),
//     isVerified: true,
//   },
// ]

// // Helper functions to simulate database operations
// export async function findUser(query: any) {
//   if (query.email) {
//     const db= await getDatabase();
//     console.log('Database connection established in mock-data/index.tsx',db);
//     const user= await db.collection('users').findOne({email:query.email});
//     console.log('User found:',user);
//     return user;
//     // return mockUsers.find((user) => user.email === query.email && (!query.isActive || user.isActive))
//   }
//   // if (query._id) {
//   //   return mockUsers.find((user) => user._id === query._id)
//   // }
//   return null
// }

// export function findNews(query: any = {}) {
//   let results = [...mockNews]

//   if (query.status) {
//     results = results.filter((news) => news.status === query.status)
//   }
//   if (query.language) {
//     results = results.filter((news) => news.language === query.language)
//   }
//   if (query.isFeatured) {
//     results = results.filter((news) => news.isFeatured === query.isFeatured)
//   }
//   if (query._id) {
//     return results.find((news) => news._id === query._id)
//   }

//   return results
// }

// export function findCategories(query: any = {}) {
//   let results = [...mockCategories]
//   if (query.isActive) {
//     results = results.filter((cat) => cat.isActive === query.isActive)
//   }
//   return results
// }

// export function findNewsletterSubscribers(query: any = {}) {
//   let results = [...mockNewsletterSubscribers]
//   if (query.email) {
//     return results.find((sub) => sub.email === query.email)
//   }
//   if (query.isActive !== undefined) {
//     results = results.filter((sub) => sub.isActive === query.isActive)
//   }
//   return results
// }

// export function createNews(data: any) {
//   const newNews = {
//     _id: mockObjectId(),
//     ...data,
//     category: mockCategories.find((cat) => cat._id === data.category) || mockCategories[0],
//     author: mockUsers.find((user) => user._id === data.author) || mockUsers[0],
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     views: 0,
//     likes: 0,
//     shares: 0,
//   }
//   mockNews.unshift(newNews)
//   return { insertedId: newNews._id }
// }

// export function updateNews(id: string, data: any) {
//   const index = mockNews.findIndex((news) => news._id === id)
//   if (index !== -1) {
//     mockNews[index] = { ...mockNews[index], ...data, updatedAt: new Date() }
//     return { modifiedCount: 1 }
//   }
//   return { modifiedCount: 0 }
// }

// export function deleteNews(id: string) {
//   const index = mockNews.findIndex((news) => news._id === id)
//   if (index !== -1) {
//     mockNews.splice(index, 1)
//     return { deletedCount: 1 }
//   }
//   return { deletedCount: 0 }
// }

// export function createNewsletterSubscriber(data: any) {
//   const newSub = {
//     _id: mockObjectId(),
//     ...data,
//     subscribedAt: new Date(),
//     isVerified: true,
//   }
//   mockNewsletterSubscribers.push(newSub)
//   return { insertedId: newSub._id }
// }

// // Export a consolidated mockData object for backward compatibility
// export const mockData = {
//   news: mockNews,
//   users: mockUsers,
//   categories: mockCategories,
//   newsletterSubscribers: mockNewsletterSubscribers
// }



























// ./lib/mock-data/index.tsx

// import type { User } from "@/lib/models/User"
// import { User } from "../models/User"
import { getUserModel } from "../models/index"
import { connectToDatabase } from "../mongodb"

// Helper to generate fake ObjectIds
function mockObjectId() {
  return Math.random().toString(36).substring(2, 15)
}


interface IUser extends Document {
  name: string
  email: string
  password: string
  role: "admin" | "writer" | "editor"
  profileImage?: string
  bio?: string
  socialLinks?: {
    twitter?: string
    facebook?: string
    instagram?: string
    linkedin?: string
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
// Mock Users
export const mockUsers: IUser[] = [
  {
    _id: "admin123",
    name: "Admin User",
    email: "admin@republicmirror.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm",
    role: "admin",
    profileImage: "/admin-profile.png",
    bio: "Administrator of Republic Mirror",
    socialLinks: {
      twitter: "https://twitter.com/republicmirror",
      facebook: "https://facebook.com/republicmirror",
    },
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "writer123",
    name: "Rajesh Kumar",
    email: "rajesh@republicmirror.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm",
    role: "writer",
    profileImage: "/writer-profile.jpg",
    bio: "Senior Political Correspondent",
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
]

// Mock Categories
export const mockCategories: (Category & { _id: string })[] = [
  { _id: "cat1", name: "National", slug: "national", color: "#dc2626", order: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { _id: "cat2", name: "International", slug: "international", color: "#2563eb", order: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { _id: "cat3", name: "Politics", slug: "politics", color: "#7c3aed", order: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { _id: "cat4", name: "Economy", slug: "economy", color: "#059669", order: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { _id: "cat5", name: "Sports", slug: "sports", color: "#ea580c", order: 5, isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { _id: "cat6", name: "Technology", slug: "technology", color: "#0891b2", order: 6, isActive: true, createdAt: new Date(), updatedAt: new Date() },
]

// Mock Newsletter Subscribers
export const mockNewsletterSubscribers: (NewsletterSubscriber & { _id: string })[] = [
  {
    _id: "sub1",
    email: "user1@example.com",
    name: "राम कुमार",
    language: "hi",
    isActive: true,
    subscribedAt: new Date("2024-11-01"),
    isVerified: true,
  },
  {
    _id: "sub2",
    email: "user2@example.com",
    name: "John Doe",
    language: "en",
    isActive: true,
    subscribedAt: new Date("2024-11-15"),
    isVerified: true,
  },
]

// Mock News (you can expand this list)
export const mockNews: (News & { _id: string; category: any; author: any })[] = []

// =====================
// MOCK FUNCTION HELPERS
// =====================

export async function findUser(query: any) {
  await connectToDatabase();
  if (query.email) {
    // const user = mockUsers.find((u) => u.email === query.email && (!query.isActive || u.isActive))
    const User= getUserModel();
    const user = await User.findOne({ email: query.email })
    console.log("Mock user found:", user)
    return user
  }
  return null
}

// export function findNews(query: any = {}) {
//   let results = [...mockNews]
//   if (query.status) results = results.filter((n) => n.status === query.status)
//   if (query.language) results = results.filter((n) => n.language === query.language)
//   if (query.isFeatured) results = results.filter((n) => n.isFeatured === query.isFeatured)
//   if (query._id) return results.find((n) => n._id === query._id)
//   return results
// }

export function findCategories(query: any = {}) {
  let results = [...mockCategories]
  if (query.isActive) results = results.filter((c) => c.isActive === query.isActive)
  return results
}

export function findNewsletterSubscribers(query: any = {}) {
  let results = [...mockNewsletterSubscribers]
  if (query.email) return results.find((s) => s.email === query.email)
  if (query.isActive !== undefined) results = results.filter((s) => s.isActive === query.isActive)
  return results
}

export function createNews(data: any) {
  const newNews = {
    _id: mockObjectId(),
    ...data,
    category: mockCategories.find((c) => c._id === data.category) || mockCategories[0],
    author: mockUsers.find((u) => u._id === data.author) || mockUsers[0],
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 0,
    likes: 0,
    shares: 0,
  }
  mockNews.unshift(newNews)
  return { insertedId: newNews._id }
}

export function updateNews(id: string, data: any) {
  const index = mockNews.findIndex((n) => n._id === id)
  if (index !== -1) {
    mockNews[index] = { ...mockNews[index], ...data, updatedAt: new Date() }
    return { modifiedCount: 1 }
  }
  return { modifiedCount: 0 }
}

export function deleteNews(id: string) {
  const index = mockNews.findIndex((n) => n._id === id)
  if (index !== -1) {
    mockNews.splice(index, 1)
    return { deletedCount: 1 }
  }
  return { deletedCount: 0 }
}

export function createNewsletterSubscriber(data: any) {
  const newSub = {
    _id: mockObjectId(),
    ...data,
    subscribedAt: new Date(),
    isVerified: true,
  }
  mockNewsletterSubscribers.push(newSub)
  return { insertedId: newSub._id }
}

// Optional: Consolidated object
export const mockData = {
  users: mockUsers,
  news: mockNews,
  categories: mockCategories,
  newsletterSubscribers: mockNewsletterSubscribers,
}
