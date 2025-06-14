import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FeaturedArticlesFix = ({ featuredArticlesTitle, featuredArticles }) => {
  const navigate = useNavigate();

  const handleArticleClick = (article) => {
    const id = article.id !== undefined ? article.id : (article._id !== undefined ? article._id : null);
    if (id !== null) {
      navigate(`/news/${id}`);
    } else {
      console.error('Article ID is missing, cannot navigate');
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      <div className="flex justify-between items-center mb-14">
        <h2 className="text-4xl font-bold uppercase">{featuredArticlesTitle} <span className="block w-24 h-1 mt-4 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full"></span></h2>
        <a href="#" className="text-indigo-600 hover:underline font-medium flex items-center gap-2">
          View All
        </a>
      </div>
      <motion.div className="space-y-8">
        {featuredArticles && featuredArticles.length > 0 ? featuredArticles.map((article, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
            onClick={() => handleArticleClick(article)}
          >
            <div className="md:flex">
              <div className="md:w-1/3 relative overflow-hidden">
                <img
                  src={article.image}
                  alt="Featured article"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="md:w-2/3 p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium mr-3">Featured</span>
                  <span className="text-gray-500 text-sm">{article.date}</span>
                </div>
                <h3 className="font-bold text-2xl mb-4 hover:text-indigo-600 transition-colors">{article.title}</h3>
                <p className="text-gray-700 mb-6">
                  {article.description.split(' ').slice(0, 15).join(' ')}...
                  <span className="text-indigo-600 font-semibold hover:underline flex items-center gap-2 ml-2 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleArticleClick(article); }}>
                    Read More
                  </span>
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{article.readTime || '5 min read'}</span>
                </div>
              </div>
            </div>
          </motion.article>
        )) : (
          <p>No featured articles available.</p>
        )}
      </motion.div>
    </motion.section>
  );
};

export default FeaturedArticlesFix;
