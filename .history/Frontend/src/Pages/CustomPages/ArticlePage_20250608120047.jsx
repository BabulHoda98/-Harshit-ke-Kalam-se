import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Clock,
  User,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react"
import { featuredArticles } from "@/data/articles"
import { Link } from "react-router-dom"

const ArticlePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [relatedArticles, setRelatedArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = () => {
      setLoading(true)
      try {
        const foundArticle = featuredArticles.find((a) => a.id === id)

        if (foundArticle) {
          setArticle(foundArticle)

          const related = featuredArticles
            .filter((a) => foundArticle.relatedArticles?.includes(Number(a.id)) && a.id !== id)
            .slice(0, 2)
          setRelatedArticles(related)
        } else {
          navigate("/404")
        }
      } catch (error) {
        console.error("Error:", error)
        navigate("/404")
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id, navigate])

  if (loading) {
    return (
      <div className="container mx-auto py-24 px-4 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!article) return null

  return (
    <div className="bg-gray-50 pt-24">
      <header className="bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <button onClick={() => navigate(-1)} className="flex items-center text-white/80 hover:text-white mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Featured Articles
          </button>

          <Badge className="mb-4 bg-white/20 text-white border-white/40">{article.category}</Badge>

          <h1 className="text-4xl font-bold mb-6 leading-tight">{article.title}</h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">{article.summary}</p>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <img src={article.authorImage || "/placeholder.svg"} alt={article.author} className="w-12 h-12 rounded-full mr-4 bg-white/20" />
              <div>
                <div className="font-semibold">{article.author}</div>
                <div className="text-sm text-white/80">{article.authorTitle}</div>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-white/80">
              <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />{article.publishDate}</div>
              <div className="flex items-center"><User className="h-4 w-4 mr-1" />{article.readTime}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 -mt-16">
          {/* Main Content */}
          <main className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="relative">
                <img src={article.image || "/placeholder.svg"} alt={article.title} className="w-full h-auto object-cover" />
              </div>

              <div className="p-6 md:p-10 prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />

                <div className="mt-10 pt-6 border-t">
                  <div className="text-sm text-gray-500 mb-3">Topics:</div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-gray-100">{tag}</Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-6">
                    <Button variant="ghost"><ThumbsUp className="h-5 w-5" /><span>{article.likes}</span></Button>
                    <Button variant="ghost"><MessageSquare className="h-5 w-5" /><span>{article.comments} Comments</span></Button>
                    <Button variant="ghost"><Bookmark className="h-5 w-5" /><span>Save</span></Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Share:</span>
                    {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                      <Button key={i} size="sm" variant="outline" className="rounded-full w-8 h-8 p-0">
                        <Icon className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <img src={article.authorImage || "/placeholder.svg"} alt={article.author} width={80} height={80} className="rounded-full" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">About {article.author}</h3>
                    <p className="text-gray-600 mb-2">{article.authorTitle}</p>
                    <p className="text-gray-600">
                      Expert in {article.category.toLowerCase()} with over 15 years of experience. Regular contributor
                      to leading publications and frequent speaker at industry conferences.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Comments ({article.comments})</h3>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <input type="text" placeholder="Write a comment..." className="flex-1 p-3 border rounded-lg" />
                  <Button>Post</Button>
                </div>
                <div className="text-center py-8 text-gray-500">Login to view and post comments</div>
              </CardContent>
            </Card>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Related Articles */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Related Articles</h3>
                <div className="space-y-6">
                  {relatedArticles.map((related) => (
                    <Link to={`/articles/${related.id}`} key={related.id} className="block group">
                      <div className="flex space-x-4">
                        <img src={related.image || "/placeholder.svg"} alt={related.title} className="w-24 h-16 object-cover rounded" />
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                            {related.title}
                          </h4>
                          <div className="text-xs text-gray-500 mt-1">{related.publishDate}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-6" asChild>
                  <Link to="/articles">View More Articles</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {["Politics", "Technology", "Health", "Climate", "Economy", "Science", "Education", "Sports", "Entertainment", "Business"]
                    .map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-gray-100">{tag}</Badge>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-br from-red-600 to-red-700 text-white border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Stay Informed</h3>
                <p className="text-red-100 mb-4">Get the latest news delivered to your inbox every morning.</p>
                <input type="email" placeholder="Enter your email" className="w-full p-3 rounded-lg text-gray-900 border-0 mb-3" />
                <Button className="w-full bg-white text-red-600 hover:bg-gray-100">Subscribe Now</Button>
                <p className="text-xs text-red-200 mt-3">Join 500K+ subscribers. Unsubscribe anytime.</p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default ArticlePage