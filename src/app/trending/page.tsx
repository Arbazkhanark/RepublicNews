import type { Metadata } from "next"
import { NewsCard } from "@/components/public/news-card"
// import { GoogleAdsense } from "@/components/public/google-adsense"
import { mockData } from "@/lib/mock-data"

export const metadata: Metadata = {
  title: "Trending News - Republic Mirror",
  description: "Most trending and popular news stories from Republic Mirror - Reflection of Truth",
  keywords: "trending news, popular news, viral news, Republic Mirror",
}

export default function TrendingPage() {
  // Get trending news (sorted by likes and views)
  const trendingNews = mockData.news
    .filter((article) => article.status === "published")
    .sort((a, b) => {
      const scoreA = a.likes * 2 + a.views
      const scoreB = b.likes * 2 + b.views
      return scoreB - scoreA
    })
    .slice(0, 20)

  // Get trending by category
  const trendingByCategory = mockData.categories
    .filter((cat) => cat.isActive)
    .map((category) => {
      const categoryTrending = mockData.news
        .filter((article) => article.category.slug === category.slug && article.status === "published")
        .sort((a, b) => b.likes * 2 + b.views - (a.likes * 2 + a.views))
        .slice(0, 3)

      return {
        category,
        articles: categoryTrending,
      }
    })
    .filter((item) => item.articles.length > 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">🔥 Trending News</h1>
            <p className="text-xl text-red-100">Most popular and viral stories right now</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Top Trending */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Top Trending Stories
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingNews.slice(0, 9).map((article, index) => (
                  <div key={article._id} className="relative">
                    <div className="absolute -top-2 -left-2 z-10">
                      <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <NewsCard article={article} />
                  </div>
                ))}
              </div>
            </div>

            {/* Ad Space */}
            <div className="mb-12">
              {/* <GoogleAdsense adSlot="trending-middle-ad" adFormat="leaderboard" className="w-full" /> */}
            </div>

            {/* Trending by Category */}
            <div className="space-y-12">
              {trendingByCategory.map(({ category, articles }) => (
                <div key={category._id}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded flex items-center justify-center text-white text-sm"
                        style={{ backgroundColor: category.color }}
                      >
                        {category.icon}
                      </div>
                      Trending in {category.name}
                    </h2>
                    <a
                      href={`/category/${category.slug}`}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      View All →
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles.map((article) => (
                      <NewsCard key={article._id} article={article} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            {/* Ad Space */}
            <div className="mb-8">
              {/* <GoogleAdsense adSlot="trending-sidebar-ad" adFormat="rectangle" className="w-full" /> */}
            </div>

            {/* Trending Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Trending Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Views Today</span>
                  <span className="font-bold text-gray-900">
                    {mockData.news.reduce((sum, article) => sum + article.views, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Likes</span>
                  <span className="font-bold text-gray-900">
                    {mockData.news.reduce((sum, article) => sum + article.likes, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Articles Published</span>
                  <span className="font-bold text-gray-900">
                    {mockData.news.filter((article) => article.status === "published").length}
                  </span>
                </div>
              </div>
            </div>

            {/* Most Liked Articles */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">❤️ Most Liked</h3>
              <div className="space-y-4">
                {mockData.news
                  .filter((article) => article.status === "published")
                  .sort((a, b) => b.likes - a.likes)
                  .slice(0, 5)
                  .map((article, index) => (
                    <a
                      key={article._id}
                      href={`/news/${article._id}`}
                      className="flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{article.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>❤️ {article.likes}</span>
                          <span>•</span>
                          <span>👁️ {article.views}</span>
                        </div>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
