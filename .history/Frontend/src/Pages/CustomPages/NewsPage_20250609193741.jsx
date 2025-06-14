import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaClock } from 'react-icons/fa';

const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setError(null);
        setLoading(true);

        const response = await fetch('/api/customization');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data) {
          throw new Error('No data received from API');
        }

        // Combine all articles arrays with proper checks
        const allArticles = [
          ...(Array.isArray(data.latestNewsArticles) ? data.latestNewsArticles : []),
          ...(Array.isArray(data.featuredArticles) ? data.featuredArticles : []),
          ...(Array.isArray(data.localNewsArticles) ? data.localNewsArticles : [])
        ];

        // Find article by matching _id as string
        const found = allArticles.find(a => a && a._id === id);

        if (found) {
          setArticle(found);
        } else {
          setArticle(null);
          setError('Article not found');
          navigate('/404');
        }
      } catch (error) {
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
      <div className="container mx-auto px-4 max-w-4xl">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={article.image}
              alt={article.title}

