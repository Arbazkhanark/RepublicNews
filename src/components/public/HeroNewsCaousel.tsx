// // components/public/HeroNewsCarousel.tsx

// "use client"

// import React from "react"
// import { Swiper, SwiperSlide } from "swiper/react"
// import { Navigation } from "swiper/modules"
// import "swiper/css"
// import "swiper/css/navigation"
// import Image from "next/image"

// export interface NewsArticle {
//   _id: string
//   title: string
//   excerpt: string
//   featuredImage?: string
//   publishedAt: string
//   views: number
// }

// interface HeroNewsCarouselProps {
//   articles: NewsArticle[]
// }

// export const HeroNewsCarousel: React.FC<HeroNewsCarouselProps> = ({ articles }) => {
//   if (articles.length === 0) return null

//   return (
//     <section className="mb-8">
//       <Swiper
//         modules={[Navigation]}
//         navigation
//         spaceBetween={10}
//         slidesPerView={1}
//         className="w-full h-[60vh]"
//       >
//         {articles.map((article) => (
//           <SwiperSlide key={article._id}>
//             <div className="relative h-full">
//               <Image
//                 src={article.featuredImage || '/default-hero.jpg'}
//                 alt={article.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/40 flex items-end p-6">
//                 <div className="text-white max-w-2xl">
//                   <h2 className="text-3xl font-bold">{article.title}</h2>
//                   <p className="text-sm mt-2 line-clamp-3">{article.excerpt}</p>
//                   <button className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded">
//                     Read More
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   )
// }
















// components/public/HeroNewsCarousel.tsx

"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import Image from "next/image"

export interface NewsArticle {
  _id: string
  title: string
  excerpt: string
  featuredImage?: string
  publishedAt: string
  views: number
}

interface HeroNewsCarouselProps {
  articles: NewsArticle[]
}

export const HeroNewsCarousel: React.FC<HeroNewsCarouselProps> = ({ articles }) => {
  if (articles.length === 0) return null

  return (
    <section className="mb-8">
      {/* Adds side padding and centers content */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          slidesPerView={1}
          className="w-full h-[60vh] rounded-lg overflow-hidden"
        >
          {articles.map((article) => (
            <SwiperSlide key={article._id}>
              <div className="relative h-full w-full">
                <Image
                  src={article.featuredImage || '/default-hero.jpg'}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                  <div className="text-white max-w-2xl">
                    <h2 className="text-3xl font-bold">{article.title}</h2>
                    <p className="text-sm mt-2 line-clamp-3">{article.excerpt}</p>
                    <button className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
