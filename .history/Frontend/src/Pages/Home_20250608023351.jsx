import React, { useEffect, useState } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import { HeroBanner, LatestNews } from '../Components/HomeSections';

const Home = () => {
  const [heroBanner, setHeroBanner] = useState({
    title: 'Welcome to Our News Portal',
    subtitle: 'Stay updated with the latest news, articles, and videos from around the world',
    button1Text: 'Read Latest News',
    button2Text: 'Watch Videos'
  });
  const [latestNewsTitle, setLatestNewsTitle] = useState('Latest News');
  const [latestNewsArticles, setLatestNewsArticles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Fetched token from localStorage:', token);
    if (!token) {
      console.error('No token found, please login');
      return;
    }
    fetch('http://localhost:5000/api/admin/customization', {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(async res => {
        console.log('Fetch response status:', res.status);
        if (!res.ok) {
          const text = await res.text();
          console.error('Fetch response text:', text);
          if (res.status === 401) {
            console.error('Unauthorized: Please login again');
            localStorage.removeItem('token');
          }
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then(data => {
        if (data.latestNewsArticles) {
          setLatestNewsArticles(data.latestNewsArticles);
        }
        if (data.heroBanner) {
          setHeroBanner(data.heroBanner);
        }
        if (data.latestNewsTitle) {
          setLatestNewsTitle(data.latestNewsTitle);
        }
      })
      .catch(err => {
        console.error('Failed to fetch customization data:', err);
      });
  }, []);

  return (
    <div className="bg-gray-50">
      <HeroBanner heroBanner={heroBanner} />
      <div className="container px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-[1400px] mx-auto">
        <div className="lg:col-span-2 space-y-12">
          <LatestNews latestNewsTitle={latestNewsTitle} latestNewsArticles={latestNewsArticles} />
          {/* Other sections can be added here similarly */}
        </div>
        {/* Sidebar can remain unchanged */}
      </div>
      {/* VideoNewsSection and other sections remain unchanged */}
    </div>
  );
};

export default Home;
