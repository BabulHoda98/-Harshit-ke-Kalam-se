import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/customization');
        if (!response.ok) {
          navigate("/404");
          return;
        }
        const data = await response.json();
        // Combine all articles arrays
        const allArticles = [
          ...(data.latestNewsArticles || []),
          ...(data.featuredArticles || []),
          ...(data.localNewsArticles || [])
        ];
        // Find article by id (assuming id is index or unique identifier)
        // Here assuming id is index in combined array as string
        const articleId = parseInt(id, 10);
        if (isNaN(articleId) || articleId < 0 || articleId >= allArticles.length) {
          navigate("/404");
          return;
        }
        const foundArticle = allArticles[articleId];
        // Ensure content or description is present, else fallback to a placeholder
        if (!foundArticle.content && !foundArticle.description) {
          foundArticle.content = "<p>Content not available.</p>";
        }
        setArticle(foundArticle);
      } catch (error) {
        console.error("Error fetching article:", error);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto py-24 px-4 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="bg-gray-50 pt-24">
      <header className="bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <button onClick={() => navigate(-1)} className="flex items-center text-white/80 hover:text-white mb-6">
            Back
          </button>

          <h1 className="text-4xl font-bold mb-6 leading-tight">{article.title}</h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">{article.subtitle || ''}</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden p-6 prose prose-lg max-w-none">
          {article.image && (
            <div className="mb-6">
              <img src={article.image} alt={article.title} className="w-full h-auto object-cover rounded" />
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: article.content || article.description || '<p>Content not available.</p>' }} />
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
