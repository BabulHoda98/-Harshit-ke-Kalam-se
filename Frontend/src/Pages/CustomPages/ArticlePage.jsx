import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://harshitkekalamse.onrender.com/api/customization');
        
        // Check if response exists
        if (!response) {
          throw new Error('No response from server');
        }

        // Check if response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get response text first
        const responseText = await response.text();
        
        // Check if response text is empty
        if (!responseText) {
          throw new Error('Empty response from server');
        }

        // Try to parse JSON
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          throw new Error('Invalid JSON response from server');
        }

        // Check if data exists
        if (!data) {
          throw new Error('No data received from API');
        }

        // Combine all articles arrays with null checks
        const allArticles = [
          ...(Array.isArray(data.featuredArticles) ? data.featuredArticles : []),
          ...(Array.isArray(data.latestNewsArticles) ? data.latestNewsArticles : []),
          ...(Array.isArray(data.localNewsArticles) ? data.localNewsArticles : [])
        ];

        // Find article by id
        const found = allArticles.find(a => 
          a && a._id === id
        );

        if (found) {
          setArticle(found);
          // Get related articles from the same category
          const related = allArticles
            .filter(a => a && a.category === found.category && a.id !== found.id)
            .slice(0, 3);
          setRelatedArticles(related);
        } else {
          setArticle(null);
          setError('Article not found');
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        setError(error.message);
        // Only navigate to 404 if it's a not found error
        if (error.message.includes('not found')) {
          navigate("/404");
        }
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

  if (error) {
    return (
      <div className="text-center mt-32 text-red-600 text-lg">
        {error}
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
    <div className="bg-gray-50 pt-10">
      <header className="bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-white/80 hover:text-white mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>

          <span className="inline-block px-3 py-1 text-sm font-medium bg-white/20 rounded-full mb-4">
            {article.category}
          </span>
          <h1 className="text-4xl font-bold mb-6 leading-tight">{article.title}</h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            {article.description?.split(' ').slice(0, 20).join(' ')}...
          </p>
          <div className="flex items-center space-x-4 text-sm text-white/80">
            <div className="flex items-center">
              <img
                src={article.authorImage || article.image}
                alt={article.author}
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <div>
                <div className="font-semibold">{article.author}</div>
                <div className="text-white/60">{article.authorTitle || 'Staff Writer'}</div>
              </div>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.readTime || '5 min read'}
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {article.date}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {article.image && (
            <div className="mb-6">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-auto object-cover rounded" 
              />
            </div>
          )}
          <div className="p-6 md:p-10 prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.content || article.description }} />
            
            {article.tags && article.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t">
                <div className="text-sm text-gray-500 mb-3">Topics:</div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t flex justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span>{article.likes || 0}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{article.comments || 0} Comments</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>Save</span>
                </button>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Share:</span>
                {['facebook', 'twitter', 'linkedin'].map((platform) => (
                  <button key={platform} className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <div key={related.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{related.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {related.description?.split(' ').slice(0, 15).join(' ')}...
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{related.date}</span>
                      <span>{related.readTime || '5 min read'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
