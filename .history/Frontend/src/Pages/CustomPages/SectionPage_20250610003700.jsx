import React from 'react';
import { useLocation } from 'react-router-dom';

const SectionPage = () => {
  const location = useLocation();
  const { title, items } = location.state || { title: '', items: [] };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              {item.image && (
                <img src={item.image} alt={item.title || item.name} className="w-full h-48 object-cover rounded mb-4" />
              )}
              <h2 className="text-xl font-semibold mb-2">{item.title || item.name}</h2>
              <p className="text-gray-600">{item.description || item.subtitle || ''}</p>
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
