import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Clock, User, Bookmark, ThumbsUp, MessageSquare, ArrowLeft,
  Facebook, Twitter, Linkedin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const newsArticles = [
  {
    id: "1",
    category: "Health",
    title: "AI in Healthcare",
    summary: "How AI is revolutionizing the healthcare industry.",
    author: "John Doe",
    authorImage: "/placeholder.svg",
    authorTitle: "Senior Medical Writer",
    publishDate: "June 5, 2025",
    readTime: "5 min read",
    image: "/react.svg",
    content: "<p>This is an article about AI in healthcare...</p>",
    tags: ["AI", "Healthcare", "Technology"],
    likes: 123,
    comments: 8,
    relatedArticles: [2, 3],
  },
];

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = newsArticles.find((a) => a.id === id);
    if (found) {
      setArticle(found);
      const related = newsArticles.filter(
        (a) => found.relatedArticles?.includes(Number(a.id)) && a.id !== id
      ).slice(0, 3);
      setRelatedArticles(related);
    } else {
      setArticle(null);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center mt-32 text-gray-500 text-lg">
        Article not found.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pt-24">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link to="/news" className="flex items-center text-red-600 hover:text-red-800 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Latest News
          </Link>
          <Badge className="mb-4 bg-red-600">{article.category}</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{article.summary}</p>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <img
                src={article.authorImage}
                alt={article.author}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <div className="font-semibold text-gray-900">{article.author}</div>
                <div className="text-sm text-gray-500">{article.authorTitle}</div>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {article.publishDate}</div>
              <div className="flex items-center"><User className="h-4 w-4 mr-1" /> {article.readTime}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Article */}
        <main className="lg:col-span-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto object-cover"
            />
            <div className="p-6 md:p-10 prose prose-lg">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
              <div className="mt-10 pt-6 border-t">
                <div className="text-sm text-gray-500 mb-3">Topics:</div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-gray-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-6 border-t flex justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-6">
                  <Button variant="ghost"><ThumbsUp className="h-5 w-5" /> <span>{article.likes}</span></Button>
                  <Button variant="ghost"><MessageSquare className="h-5 w-5" /> <span>{article.comments} Comments</span></Button>
                  <Button variant="ghost"><Bookmark className="h-5 w-5" /> <span>Save</span></Button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Share:</span>
                  {[Facebook, Twitter, Linkedin].map((Icon, idx) => (
                    <Button key={idx} size="sm" variant="outline" className="rounded-full w-8 h-8 p-0">
                      <Icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Comments */}
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
          {/* Related */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6">Related Articles</h3>
              <div className="space-y-6">
                {relatedArticles.map((related) => (
                  <Link to={`/news/${related.id}`} key={related.id} className="block group">
                    <div className="flex space-x-4">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-24 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-red-600 line-clamp-2">
                          {related.title}
                        </h4>
                        <div className="text-xs text-gray-500 mt-1">{related.publishDate}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full mt-6">
                <Link to="/news">View More Articles</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Newsletter */}
          <Card className="bg-gradient-to-br from-red-600 to-red-700 text-white border-0">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Stay Informed</h3>
              <p className="text-red-100 mb-4">Get the latest news delivered to your inbox every morning.</p>
              <input type="email" placeholder="Enter your email" className="w-full p-3 rounded-lg text-gray-900" />
              <Button className="w-full bg-white text-red-600 mt-3">Subscribe Now</Button>
              <p className="text-xs text-red-200 mt-3">Join 500K+ subscribers. Unsubscribe anytime.</p>
