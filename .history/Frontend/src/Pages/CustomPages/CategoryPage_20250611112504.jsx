import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryArticles = async () => {
      try {
        const response = await fetch(`https://harshitkekalamse.onrender.com//api/news/category/${categoryName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch category articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error(error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryArticles();
  }, [categoryName]);

  const handleArticleClick = (article, index) => {
    const id = article._id !== undefined ? article._id : index;
    navigate(`/news/${id}`);
  };

  if (loading) {
    return <div className="text-center py-20">Loading articles...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 capitalize">{categoryName} News</h1>
      {articles.length === 0 ? (
        <p className="text-gray-500">No articles found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer group"
              onClick={() => handleArticleClick(article, i)}
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-medium self-start">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-2xl mb-4 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 line-clamp-3">{article.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-100 pt-4">
                  <span className="font-medium">By {article.author}</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
