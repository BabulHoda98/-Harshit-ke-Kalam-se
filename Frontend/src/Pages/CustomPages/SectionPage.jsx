import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, items } = location.state || { title: '', items: [] };

  const handleCardClick = (item) => {
    if (item._id) {
      navigate(`/news/${item._id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => handleCardClick(item)}
            >
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.title || item.name} 
                  className="w-full h-48 object-cover rounded mb-4 transition-transform duration-500 hover:scale-110" 
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{item.title || item.name}</h2>
              <p className="text-gray-600 line-clamp-3">{item.description || item.subtitle || ''}</p>
            </div>
          ))
        ) : (
          <p>No items available.</p>
        )}
      </div>
    </div>
  );
};

export default SectionPage;
