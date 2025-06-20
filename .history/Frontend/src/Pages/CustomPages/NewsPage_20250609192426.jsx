import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaClock, FaShare, FaHeart, FaComment, FaTag } from 'react-icons/fa';

const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setError(null);
        setLoading(true);
        
        // Use relative URL consistent with Home.jsx
        const response = await fetch('/api/customization');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data) {
          throw new Error('No data received from API');
        }

        // Log the data to see what we're receiving
        console.log('Received data:', data);
        
        // Combine all articles arrays with proper checks
        const allArticles = [
          ...(Array.isArray(data.latestNewsArticles) ? data.latestNewsArticles : []),
          ...(Array.isArray(data.featuredArticles) ? data.featuredArticles : []),
          ...(Array.isArray(data.localNewsArticles) ? data.localNewsArticles : [])
        ];

        // Log the combined articles
        console.log('Combined articles:', allArticles);

        // Find article by id (handle both string and number IDs)
        const found = allArticles.find(a => 
          a && (a.id === id || a.id === parseInt(id) || a._id === id || a._id === parseInt(id))
        );
        
        // Log the found article
        console.log('Found article:', found);

        if (found) {
          setArticle(found);
          // Get related articles from the same category
          const related = allArticles
            .filter(a => a && a.category === found.category && (a.id !== found.id && a._id !== found._id))
            .slice(0, 3);
          setRelatedArticles(related);
        } else {
          console.log('Article not found for ID:', id);
          setArticle(null);
          setError('Article not found');
          navigate('/404');
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        setError(error.message);
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
          <p className="text-gray-600">The article you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Main Article */}
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Article Header */}
          <div className="relative">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <FaUser className="text-blue-600" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-600" />
                <span>{article.date}</span>
              </div>
              {article.readTime && (
                <div className="flex items-center gap-2">
                  <FaClock className="text-blue-600" />
                  <span>{article.readTime}</span>
                </div>
              )}
            </div>

            {/* Article Description */}
            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">
                {article.description}
              </p>
            </div>

            {/* Social Sharing */}
            <div className="flex items-center gap-4 mb-8">
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <FaShare />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                <FaHeart />
                <span>Like</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <FaComment />
                <span>Comment</span>
              </button>
            </div>

            {/* Tags */}
            {article.category && (
              <div className="flex items-center gap-2 mb-8">
                <FaTag className="text-blue-600" />
                <span className="text-gray-600">Category:</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {article.category}
                </span>
              </div>
            )}
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/news/${relatedArticle.id || relatedArticle._id}`)}
                >
                  <img
                    src={relatedArticle.image}
                    alt={relatedArticle.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedArticle.description}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                      <span>{relatedArticle.date}</span>
                      {relatedArticle.readTime && (
                        <>
                          <span>•</span>
                          <span>{relatedArticle.readTime}</span>
                        </>
                      )}
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

export default NewsPage;

