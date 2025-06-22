// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   const [content, setContent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/content/public');
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//         const data = await response.json();
//         console.log('Fetched content data:', data);
//         setContent(data);
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching content:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContent();
//   }, []);

//   // Helper function to extract YouTube video ID from URL
//   const getYouTubeVideoId = (url) => {
//     if (!url) return null;
//     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//     const match = url.match(regExp);
//     return (match && match[2].length === 11) ? match[2] : null;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">लोड हो रहा है...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <p className="text-red-600">Error: {error}</p>
//         </div>
//       </div>
//     );
//   }

//   // Get data from backend or use fallbacks
//   const heroBanner = content?.heroBanner || {
//     title: 'हर्षित के कलम से में आपका स्वागत है',
//     subtitle: 'बिहार और झारखंड की ताज़ा खबरें, राजनीति, अपराध और करियर समाचार',
//     button1Text: 'ताज़ा खबरें पढ़ें',
//     button2Text: 'वीडियो देखें',
//     images: ['https://navbharattimes.indiatimes.com/thumb/113599197/bihar-politics-sound-power-change-113599197.jpg?imgsize=62408&width=1600&height=900&resizemode=75']
//   };

//   // Try to get latestNewsArticles from backend, fallback to latestNews, then to default
//   const latestNewsArticles = content?.latestNewsArticles || content?.latestNews || [
//     {
//       title: 'बिहार: मुख्यमंत्री ने लॉन्च की नई योजना',
//       image: 'https://images.indianexpress.com/2024/01/bihar-1600.jpg',
//       link: '/news/bihar-new-scheme',
//       category: 'बिहार'
//     },
//     {
//       title: 'झारखंड: खनन घोटाले में 3 अधिकारी गिरफ्तार',
//       image: 'https://swarajya.gumlet.io/swarajya/2024-04/40a53b4d-7dc8-4017-8d35-fd3fdd3e08f6/10_04_3.png?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true',
//       link: '/news/jharkhand-mining-scam',
//       category: 'झारखंड'
//     },
//     {
//       title: 'पटना मेट्रो में नई सुविधा',
//       image: 'https://thedailyguardian.com/wp-content/uploads/2025/01/political-landscape-in-Bihar.webp',
//       link: '/news/patna-metro',
//       category: 'विकास'
//     }
//   ];

//   // Ensure we always have at least 3 images for the layout
//   const displayArticles = latestNewsArticles.length >= 3 ? latestNewsArticles.slice(0, 3) : [
//     {
//       title: 'बिहार: मुख्यमंत्री ने लॉन्च की नई योजना',
//       image: 'https://images.indianexpress.com/2024/01/bihar-1600.jpg',
//       link: '/news/bihar-new-scheme',
//       category: 'बिहार'
//     },
//     {
//       title: 'झारखंड: खनन घोटाले में 3 अधिकारी गिरफ्तार',
//       image: 'https://swarajya.gumlet.io/swarajya/2024-04/40a53b4d-7dc8-4017-8d35-fd3fdd3e08f6/10_04_3.png?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true',
//       link: '/news/jharkhand-mining-scam',
//       category: 'झारखंड'
//     },
//     {
//       title: 'पटना मेट्रो में नई सुविधा',
//       image: 'https://thedailyguardian.com/wp-content/uploads/2025/01/political-landscape-in-Bihar.webp',
//       link: '/news/patna-metro',
//       category: 'विकास'
//     }
//   ];

//   console.log('Content from backend:', content);
//   console.log('Hero Banner:', heroBanner);
//   console.log('Latest News Articles:', latestNewsArticles);
//   console.log('Number of articles:', latestNewsArticles.length);

//   // Try to get videos from different possible sources
//   const videos = content?.videos || content?.videoNews?.videos || ['https://youtu.be/dQw4w9WgXcQ'];
//   const videoNewsTitle = content?.videoNewsTitle || content?.videoNews?.title || 'बिहार की ताज़ा राजनीतिक खबरें | नीतीश कुमार का बड़ा बयान';
  
//   // Get first video ID for YouTube
//   const firstVideoUrl = videos[0] || 'https://youtu.be/dQw4w9WgXcQ';
//   const videoId = getYouTubeVideoId(firstVideoUrl) || 'dQw4w9WgXcQ';

//   return (
//     <div className="bg-gray-50 font-hindi w-full min-h-screen">
//       {/* Breaking News Ticker */}
//       {/* <div className="bg-red-600 text-white py-2 px-4">
//         <div className="container mx-auto flex items-center">
//           <span className="font-bold mr-4 bg-black px-3 py-1 rounded-md animate-pulse">ब्रेकिंग न्यूज़</span>
//           <div className="overflow-hidden whitespace-nowrap">
//             <div className="inline-block animate-marquee">
//               <span className="mx-8">• बिहार: पटना में बड़ा सड़क हादसा, 5 लोगों की मौत</span>
//               <span className="mx-8">• झारखंड: खनन माफिया पर पुलिस की बड़ी कार्रवाई</span>
//               <span className="mx-8">• बिहार चुनाव: NDA की बैठक आज, उम्मीदवारों की सूची जल्द</span>
//               <span className="mx-8">• NEET 2025: परीक्षा पैटर्न में बड़े बदलाव</span>
//             </div>
//           </div>
//         </div>
//       </div> */}

//       {/* Top Section */}
//       <div className="container mx-auto py-1 border border-red-500">
//         <div className="flex flex-col lg:flex-row gap-3 mr-3 ml-3 border border-red-500">
//           {/* Welcome Banner - Centered Content */}
//           <div className="w-full lg:w-1/2 h-[504px] relative group text-center">
//             <div className="h-full relative rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:shadow-3xl border border-blue-500">
//               <img 
//                 src={heroBanner.images?.[0] || 'https://navbharattimes.indiatimes.com/thumb/113599197/bihar-politics-sound-power-change-113599197.jpg?imgsize=62408&width=1600&height=900&resizemode=75'} 
//                 alt="Welcome Banner"
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//               />
//               <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex flex-col justify-center items-center p-8 text-center">
//                 <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
//                   {heroBanner.title}
//                 </h1>
//                 <p className="text-white mt-4 text-lg md:text-xl max-w-lg bg-black/30 px-4 py-2 rounded-lg">
//                   {heroBanner.subtitle}
//                 </p>
//                 <div className="flex gap-4 mt-6 justify-center">
//                   <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-md font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
//                     </svg>
//                     {heroBanner.button1Text}
//                   </button>
//                   <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-md font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
//                     </svg>
//                     {heroBanner.button2Text}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Right Side Column */}
//           <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-3 text-center">
//             {/* News Banners - Centered Content */}
//             <div className="w-full lg:w-1/2 flex flex-col gap-3">
//               {displayArticles.map((banner, index) => (
//                 <Link 
//                   to={banner.link || '#'} 
//                   key={index}
//                   className="relative h-40 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
//                 >
//                   <img 
//                     src={banner.image || 'https://via.placeholder.com/300x200'} 
//                     alt={banner.title}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col justify-end items-center text-center">
//                     <span className="text-xs font-semibold text-yellow-400 mb-2 bg-black/50 px-3 py-1 rounded-full border border-yellow-400/50">
//                       {banner.category || 'समाचार'}
//                     </span>
//                     <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow-md">
//                       {banner.title || 'समाचार लोड हो रहा है...'}
//                     </h3>
//                   </div>
//                   <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
//                     नया
//                   </div>
//                 </Link>
//               ))}
//             </div>
            
//             {/* YouTube Video Box - Centered Content */}
//             <div className="w-full lg:w-1/2">
//               <div className="bg-white rounded-xl shadow-xl overflow-hidden h-full transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border-2 border-gray-200">
//                 <div className="relative pt-[56.25%] overflow-hidden rounded-t-xl">
//                   <iframe
//                     className="absolute top-0 left-0 w-full h-full"
//                     src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
//                     title={videoNewsTitle}
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   ></iframe>
//                 </div>
//                 <div className="p-4 bg-gradient-to-b from-gray-50 to-white text-center">
//                   <h3 className="font-bold text-lg text-gray-800 line-clamp-2">
//                     {videoNewsTitle}
//                   </h3>
//                   <div className="flex items-center justify-center mt-3">
//                     <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-2">
//                       <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
//                       </svg>
//                     </div>
//                     <span className="text-sm text-gray-600 font-medium">YouTube</span>
//                   </div>
//                   <button className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">
//                     सब्सक्राइब करें
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Debug Section - Temporary */}
//       {latestNewsArticles.length === 0 && (
//         <div className="container mx-auto px-4 py-8">
//           <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//             <strong>Debug Info:</strong> No latest news articles found. Backend data: {JSON.stringify(content?.latestNewsArticles || content?.latestNews || 'No data')}
//           </div>
//         </div>
//       )}

//       {/* News Sections */}
//       <div className="container px-4 md:px-6 py-12 max-w-[1400px] mx-auto">
//         {/* Crime News Section */}
//         <div className="mb-16">
//           <div className="flex items-center mb-6">
//             <div className="w-4 h-10 bg-red-600 rounded mr-3"></div>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800">अपराध समाचार</h2>
//             <Link to="/crime" className="ml-auto text-blue-600 hover:underline flex items-center">
//               सभी खबरें देखें
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 title: 'बिहार में अधिवक्ता के घर डकैती, अकेली बेटी को बंधक बनाकर लूटे लाखों के गहने और नकदी...',
//                 time: '2 घंटे पहले',
//                 location: 'पटना'
//               },
//               {
//                 title: 'भरी पंचायत में बेटे ने पिता को उतारा मौत के घाट, छापेमारी जारी...',
//                 time: '5 घंटे पहले',
//                 location: 'गया'
//               },
//               {
//                 title: 'बाढ़ में गैंगवार, 20 राउंड फायरिंग में 2 को लगी गोली...',
//                 time: '3 घंटे पहले',
//                 location: 'मुजफ्फरपुर'
//               },
//               {
//                 title: 'ROHTAS: जेल से छूटकर आने के बाद भाई के जख्म का लिया बदला, चलती बस में आरोपी को मारा चाकू ...',
//                 time: '1 घंटे पहले',
//                 location: 'रोहतास'
//               }
//             ].map((news, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border-t-4 border-red-600">
//                 <div className="p-5">
//                   <div className="flex items-center text-sm text-gray-500 mb-3">
//                     <span className="bg-gray-100 px-2 py-1 rounded">{news.location}</span>
//                     <span className="mx-2">•</span>
//                     <span>{news.time}</span>
//                   </div>
//                   <h3 className="font-bold text-lg mb-3 line-clamp-3 group-hover:text-red-600 transition-colors duration-300">{news.title}</h3>
//                   <Link to="#" className="inline-flex items-center text-blue-600 text-sm font-medium hover:underline">
//                     पूरी खबर पढ़ें
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Politics News Section */}
//         <div className="mb-16">
//           <div className="flex items-center mb-6">
//             <div className="w-4 h-10 bg-blue-600 rounded mr-3"></div>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800">राजनीति</h2>
//             <Link to="/politics" className="ml-auto text-blue-600 hover:underline flex items-center">
//               सभी खबरें देखें
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 title: 'बिहार चुनाव 2025 से पहले NDA घटक दलों की सियासी हलचल तेज, चिराग और कुशवाहा करेंगे शक्ति प्रदर्शन...',
//                 time: '4 घंटे पहले',
//                 location: 'पटना'
//               },
//               {
//                 title: 'कृष्णा अल्लावारू का बड़ा बयान; सर्वे के आधार पर तय होंगे कांग्रेस के उम्मीदवार...',
//                 time: '6 घंटे पहले',
//                 location: 'दिल्ली'
//               },
//               {
//                 title: 'क्या नीतीश कुमार लालू यादव की राह पर चल पड़े हैं? चुनावी रथ से बिहार भ्रमण...',
//                 time: '3 घंटे पहले',
//                 location: 'बिहार'
//               },
//               {
//                 title: 'बिहार में विकास कार्यों की रफ्तार बढ़ाने में जुटे नीतीश कुमार, अधिकारियों को दिए सख्त निर्देश...',
//                 time: '2 घंटे पहले',
//                 location: 'पटना'
//               }
//             ].map((news, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border-t-4 border-blue-600">
//                 <div className="p-5">
//                   <div className="flex items-center text-sm text-gray-500 mb-3">
//                     <span className="bg-gray-100 px-2 py-1 rounded">{news.location}</span>
//                     <span className="mx-2">•</span>
//                     <span>{news.time}</span>
//                   </div>
//                   <h3 className="font-bold text-lg mb-3 line-clamp-3 group-hover:text-blue-600 transition-colors duration-300">{news.title}</h3>
//                   <Link to="#" className="inline-flex items-center text-blue-600 text-sm font-medium hover:underline">
//                     पूरी खबर पढ़ें
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Bihar News Section */}
//         <div className="mb-16">
//           <div className="flex items-center mb-6">
//             <div className="w-4 h-10 bg-green-600 rounded mr-3"></div>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800">बिहार</h2>
//             <Link to="/bihar" className="ml-auto text-blue-600 hover:underline flex items-center">
//               सभी खबरें देखें
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 title: 'पहली पत्नी के रहते बिहार पुलिस चालक ने की दूसरी शादी, दहेज उत्पीड़न का मामला दर्ज...',
//                 time: '7 घंटे पहले',
//                 location: 'भागलपुर'
//               },
//               {
//                 title: 'बिहार में यहां खुलेगा भारत का चौथा शेर प्रजनन केंद्र, वन विभाग ने शुरू की तैयारी...',
//                 time: '5 घंटे पहले',
//                 location: 'राजगीर'
//               },
//               {
//                 title: 'मुजफ्फरपुर से नरकटियागंज जा रही डेमू ट्रेन का संचालन बाधित, तार टूटने से बीच में रुकी...',
//                 time: '3 घंटे पहले',
//                 location: 'मुजफ्फरपुर'
//               },
//               {
//                 title: 'मक्का लोड पिकअप दुर्घटनाग्रस्त, 5 की मौत; 20 घायल...',
//                 time: '2 घंटे पहले',
//                 location: 'वैशाली'
//               }
//             ].map((news, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border-t-4 border-green-600">
//                 <div className="p-5">
//                   <div className="flex items-center text-sm text-gray-500 mb-3">
//                     <span className="bg-gray-100 px-2 py-1 rounded">{news.location}</span>
//                     <span className="mx-2">•</span>
//                     <span>{news.time}</span>
//                   </div>
//                   <h3 className="font-bold text-lg mb-3 line-clamp-3 group-hover:text-green-600 transition-colors duration-300">{news.title}</h3>
//                   <Link to="#" className="inline-flex items-center text-blue-600 text-sm font-medium hover:underline">
//                     पूरी खबर पढ़ें
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Jharkhand News Section */}
//         <div className="mb-16">
//           <div className="flex items-center mb-6">
//             <div className="w-4 h-10 bg-yellow-600 rounded mr-3"></div>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800">झारखंड</h2>
//             <Link to="/jharkhand" className="ml-auto text-blue-600 hover:underline flex items-center">
//               सभी खबरें देखें
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 title: 'पब्लिक प्लेस पर सिगरेट पीने वाले हो जाए सावधान, नहीं तो देना होगा 1000 रुपये जुर्माना...',
//                 time: '4 घंटे पहले',
//                 location: 'रांची'
//               },
//               {
//                 title: 'रांची में इलेक्ट्रिक स्कूटी चार्ज करते वक्त लगी आग, पूरा घर जलकर राख ...',
//                 time: '6 घंटे पहले',
//                 location: 'रांची'
//               },
//               {
//                 title: 'झारखंड में कोरोना से पहली मौत, स्वास्थ्य विभाग अलर्ट...',
//                 time: '8 घंटे पहले',
//                 location: 'जमशेदपुर'
//               },
//               {
//                 title: '8 IPS अधिकारियों को मिला अतिरिक्त प्रभार, सरकार ने जारी किया आदेश...',
//                 time: '5 घंटे पहले',
//                 location: 'झारखंड'
//               }
//             ].map((news, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border-t-4 border-yellow-600">
//                 <div className="p-5">
//                   <div className="flex items-center text-sm text-gray-500 mb-3">
//                     <span className="bg-gray-100 px-2 py-1 rounded">{news.location}</span>
//                     <span className="mx-2">•</span>
//                     <span>{news.time}</span>
//                   </div>
//                   <h3 className="font-bold text-lg mb-3 line-clamp-3 group-hover:text-yellow-600 transition-colors duration-300">{news.title}</h3>
//                   <Link to="#" className="inline-flex items-center text-blue-600 text-sm font-medium hover:underline">
//                     पूरी खबर पढ़ें
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* National News Section */}
//         <div className="mb-16">
//           <div className="flex items-center mb-6">
//             <div className="w-4 h-10 bg-purple-600 rounded mr-3"></div>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800">देश</h2>
//             <Link to="/national" className="ml-auto text-blue-600 hover:underline flex items-center">
//               सभी खबरें देखें
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 title: 'बाप-बेटे ने किया कमाल: एक साथ पुलिस ने हुए भर्ती, अब साथ लेंगे ट्रेनिंग ...',
//                 time: '5 घंटे पहले',
//                 location: 'महाराष्ट्र'
//               },
//               {
//                 title: 'मिसाइल हमले के बीच अमेरिकी राष्ट्रपति का बड़ा बयान, भारत-पाकिस्तान में सुलह कराई, अब ईरान-इजरायल की जंग रुकवाउंगा...',
//                 time: '7 घंटे पहले',
//                 location: 'दिल्ली'
//               },
//               {
//                 title: 'पुणे के इंद्रायनी नदी पर बने लोहे का पुल ढहने से 6 की मौत, 30 से अधिक पर्यटक बहें, पुल की गुणवत्ता पर उठ रहे सवाल...',
//                 time: '4 घंटे पहले',
//                 location: 'महाराष्ट्र'
//               },
//               {
//                 title: 'कौन है 17 वर्षीय नाबालिग, जो विमान हादसे का बना गवाह? पुलिस ने की पूछताछ...',
//                 time: '3 घंटे पहले',
//                 location: 'केरल'
//               }
//             ].map((news, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border-t-4 border-purple-600">
//                 <div className="p-5">
//                   <div className="flex items-center text-sm text-gray-500 mb-3">
//                     <span className="bg-gray-100 px-2 py-1 rounded">{news.location}</span>
//                     <span className="mx-2">•</span>
//                     <span>{news.time}</span>
//                   </div>
//                   <h3 className="font-bold text-lg mb-3 line-clamp-3 group-hover:text-purple-600 transition-colors duration-300">{news.title}</h3>
//                   <Link to="#" className="inline-flex items-center text-blue-600 text-sm font-medium hover:underline">
//                     पूरी खबर पढ़ें
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Career News Section */}
//         <div className="mb-16">
//           <div className="flex items-center mb-6">
//             <div className="w-4 h-10 bg-indigo-600 rounded mr-3"></div>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800">करियर</h2>
//             <Link to="/career" className="ml-auto text-blue-600 hover:underline flex items-center">
//               सभी खबरें देखें
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 title: 'नीट यूजी 2025 की काउंसिलिंग शुरू, बिहार में MBBS की 1490 और BDS की 140 सीटें उपलब्ध...',
//                 time: '1 दिन पहले',
//                 location: 'बिहार'
//               },
//               {
//                 title: '12वीं के बाद पायलट बनने का सपना करें पूरा, जानें... कौन सा कोर्स है जरूरी...',
//                 time: '2 दिन पहले',
//                 location: 'दिल्ली'
//               },
//               {
//                 title: '19 जून को इस जिले में लगेगा रोजगार कैंप, 8वीं पास से लेकर ITI वालों तक के लिए नौकरी...',
//                 time: '3 दिन पहले',
//                 location: 'पटना'
//               },
//               {
//                 title: 'कौन है बिहार के IPS कार्तिकेय शर्मा जिन्होंने अपराधियों की नींद उड़ा दी? जानें... सफलता की कहानी...',
//                 time: '4 घंटे पहले',
//                 location: 'बिहार'
//               }
//             ].map((news, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border-t-4 border-indigo-600">
//                 <div className="p-5">
//                   <div className="flex items-center text-sm text-gray-500 mb-3">
//                     <span className="bg-gray-100 px-2 py-1 rounded">{news.location}</span>
//                     <span className="mx-2">•</span>
//                     <span>{news.time}</span>
//                   </div>
//                   <h3 className="font-bold text-lg mb-3 line-clamp-3 group-hover:text-indigo-600 transition-colors duration-300">{news.title}</h3>
//                   <Link to="#" className="inline-flex items-center text-blue-600 text-sm font-medium hover:underline">
//                     पूरी खबर पढ़ें
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Trending News Section */}
//         <div className="mb-12">
//           <div className="flex items-center mb-6">
//             <div className="w-4 h-10 bg-pink-600 rounded mr-3"></div>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800">ट्रेंडिंग न्यूज़</h2>
//             <Link to="/trending" className="ml-auto text-blue-600 hover:underline flex items-center">
//               सभी खबरें देखें
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 title: 'बिहार चुनाव 2025 से पहले NDA घटक दलों की सियासी हलचल तेज, चिराग और कुशवाहा करेंगे शक्ति प्रदर्शन...',
//                 time: '2 घंटे पहले',
//                 views: '1.2M'
//               },
//               {
//                 title: 'भरी पंचायत में बेटे ने पिता को उतारा मौत के घाट, छापेमारी जारी...',
//                 time: '5 घंटे पहले',
//                 views: '890K'
//               },
//               {
//                 title: 'बिहार में यहां खुलेगा भारत का चौथा शेर प्रजनन केंद्र, वन विभाग ने शुरू की तैयारी...',
//                 time: '1 दिन पहले',
//                 views: '756K'
//               },
//               {
//                 title: 'बाढ़ में गैंगवार, 20 राउंड फायरिंग में 2 को लगी गोली...',
//                 time: '3 घंटे पहले',
//                 views: '1.5M'
//               }
//             ].map((news, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border-t-4 border-pink-600">
//                 <div className="p-5">
//                   <div className="flex items-center text-sm text-gray-500 mb-3">
//                     <span className="flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//                       </svg>
//                       {news.views} देखे गए
//                     </span>
//                     <span className="mx-2">•</span>
//                     <span>{news.time}</span>
//                   </div>
//                   <h3 className="font-bold text-lg mb-3 line-clamp-3 group-hover:text-pink-600 transition-colors duration-300">{news.title}</h3>
//                   <Link to="#" className="inline-flex items-center text-blue-600 text-sm font-medium hover:underline">
//                     पूरी खबर पढ़ें
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Newsletter Subscription */}
//       <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 px-4">
//         <div className="container mx-auto max-w-4xl text-center">
//           <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">हमारे न्यूज़लेटर की सदस्यता लें</h2>
//           <p className="text-white/90 mb-6 max-w-2xl mx-auto">दैनिक समाचार अपडेट सीधे अपने इनबॉक्स में प्राप्त करें। बिहार और झारखंड की ताज़ा खबरें, विश्लेषण और अपडेट्स।</p>
//           <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto sm:max-w-xl">
//             <input 
//               type="email" 
//               placeholder="आपका ईमेल पता" 
//               className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//             />
//             <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-colors duration-300 whitespace-nowrap">
//               सब्सक्राइब करें
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// ------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/content/public');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setContent(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Helper function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  // Get data from backend or use fallbacks
  const heroBanner = content?.heroBanner || {
    title: 'हर्षित के कलम से में आपका स्वागत है',
    subtitle: 'बिहार और झारखंड की ताज़ा खबरें, राजनीति, अपराध और करियर समाचार',
    button1Text: 'ताज़ा खबरें पढ़ें',
    button2Text: 'वीडियो देखें',
    images: ['https://navbharattimes.indiatimes.com/thumb/113599197/bihar-politics-sound-power-change-113599197.jpg?imgsize=62408&width=1600&height=900&resizemode=75']
  };

  // Try to get latestNewsArticles from backend
  const latestNewsArticles = content?.latestNewsArticles || content?.latestNews || [
    {
      title: 'बिहार: मुख्यमंत्री ने लॉन्च की नई योजना',
      image: 'https://images.indianexpress.com/2024/01/bihar-1600.jpg',
      link: '/news/bihar-new-scheme',
      category: 'बिहार'
    },
    {
      title: 'झारखंड: खनन घोटाले में 3 अधिकारी गिरफ्तार',
      image: 'https://swarajya.gumlet.io/swarajya/2024-04/40a53b4d-7dc8-4017-8d35-fd3fdd3e08f6/10_04_3.png?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true',
      link: '/news/jharkhand-mining-scam',
      category: 'झारखंड'
    },
    {
      title: 'पटना मेट्रो में नई सुविधा',
      image: 'https://thedailyguardian.com/wp-content/uploads/2025/01/political-landscape-in-Bihar.webp',
      link: '/news/patna-metro',
      category: 'विकास'
    }
  ];

  // Ensure we always have at least 3 images for the layout
  const displayArticles = latestNewsArticles.length >= 3 ? 
    latestNewsArticles.slice(0, 3) : [
      {
        title: 'बिहार: मुख्यमंत्री ने लॉन्च की नई योजना',
        image: 'https://images.indianexpress.com/2024/01/bihar-1600.jpg',
        link: '/news/bihar-new-scheme',
        category: 'बिहार'
      },
      {
        title: 'झारखंड: खनन घोटाले में 3 अधिकारी गिरफ्तार',
        image: 'https://swarajya.gumlet.io/swarajya/2024-04/40a53b4d-7dc8-4017-8d35-fd3fdd3e08f6/10_04_3.png?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true',
        link: '/news/jharkhand-mining-scam',
        category: 'झारखंड'
      },
      {
        title: 'पटना मेट्रो में नई सुविधा',
        image: 'https://thedailyguardian.com/wp-content/uploads/2025/01/political-landscape-in-Bihar.webp',
        link: '/news/patna-metro',
        category: 'विकास'
      }
    ];

  // Try to get videos from different possible sources
  const videos = content?.videos || content?.videoNews?.videos || ['https://youtu.be/dQw4w9WgXcQ'];
  const videoNewsTitle = content?.videoNewsTitle || content?.videoNews?.title || 'बिहार की ताज़ा राजनीतिक खबरें | नीतीश कुमार का बड़ा बयान';
  
  // Get first video ID for YouTube
  const firstVideoUrl = videos[0] || 'https://youtu.be/dQw4w9WgXcQ';
  const videoId = getYouTubeVideoId(firstVideoUrl) || 'dQw4w9WgXcQ';

  return (
    <div className="bg-white font-hindi w-full min-h-screen">
      {/* Top Section */}
      <div className="container mx-auto py-1">
        <div className="flex flex-col lg:flex-row gap-3 mx-3">
          {/* Welcome Banner - Centered Content */}
          <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[504px] relative group text-center">
            <div className="h-full relative rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:shadow-3xl">
              <img 
                src={heroBanner.images?.[0] || 'https://navbharattimes.indiatimes.com/thumb/113599197/bihar-politics-sound-power-change-113599197.jpg?imgsize=62408&width=1600&height=900&resizemode=75'} 
                alt="Welcome Banner"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex flex-col justify-center items-center p-4 sm:p-8 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                  {heroBanner.title}
                </h1>
                <p className="text-white mt-2 sm:mt-4 text-sm sm:text-lg max-w-lg bg-black/30 px-3 py-1 sm:px-4 sm:py-2 rounded-lg">
                  {heroBanner.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 sm:mt-6 justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-md font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    {heroBanner.button1Text}
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-md font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="CurrentColor">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                    </svg>
                    {heroBanner.button2Text}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side Column */}
          <div className="w-full lg:w-1/2 flex flex-col md:flex-row gap-3 text-center">
            {/* News Banners - Centered Content */}
            <div className="w-full md:w-1/2 flex flex-col gap-3">
              {displayArticles.map((banner, index) => (
                <Link 
                  to={banner.link || '#'} 
                  key={index}
                  className="relative h-32 sm:h-40 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <img 
                    src={banner.image || 'https://via.placeholder.com/300x200'} 
                    alt={banner.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-4 flex flex-col justify-end items-center text-center">
                    <span className="text-xs font-semibold text-yellow-400 mb-1 sm:mb-2 bg-black/50 px-2 py-1 rounded-full border border-yellow-400/50">
                      {banner.category || 'समाचार'}
                    </span>
                    <h3 className="text-white font-bold text-sm sm:text-lg leading-tight line-clamp-2 drop-shadow-md">
                      {banner.title || 'समाचार लोड हो रहा है...'}
                    </h3>
                  </div>
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    नया
                  </div>
                </Link>
              ))}
            </div>
            
            {/* YouTube Video Box - Centered Content */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden h-full transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border-2 border-gray-200">
                <div className="relative pt-[56.25%] overflow-hidden rounded-t-xl">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                    title={videoNewsTitle}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-3 sm:p-4 bg-gradient-to-b from-gray-50 to-white text-center">
                  <h3 className="font-bold text-sm sm:text-lg text-gray-800 line-clamp-2">
                    {videoNewsTitle}
                  </h3>
                  <div className="flex items-center justify-center mt-2 sm:mt-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600 rounded-full flex items-center justify-center mr-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">YouTube</span>
                  </div>
                  <button className="mt-2 sm:mt-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-300">
                    सब्सक्राइब करें
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Sections */}
      <div className="container px-4 md:px-6 py-8 sm:py-12 max-w-[1400px] mx-auto">
        {/* Crime News Section */}
        <div className="mb-10 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
            <div className="w-4 h-8 sm:h-10 bg-red-600 rounded mr-3"></div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">अपराध समाचार</h2>
            <Link to="/crime" className="ml-auto mt-2 sm:mt-0 text-blue-600 hover:underline flex items-center text-sm sm:text-base">
              सभी खबरें देखें
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: 'बिहार में अधिवक्ता के घर डकैती, अकेली बेटी को बंधक बनाकर लूटे लाखों के गहने और नकदी...',
                time: '2 घंटे पहले',
                location: 'पटना'
              },
              {
                title: 'भरी पंचायत में बेटे ने पिता को उतारा मौत के घाट, छापेमारी जारी...',
                time: '5 घंटे पहले',
                location: 'गया'
              },
              {
                title: 'बाढ़ में गैंगवार, 20 राउंड फायरिंग में 2 को लगी गोली...',
                time: '3 घंटे पहले',
                location: 'मुजफ्फरपुर'
              },
              {
                title: 'ROHTAS: जेल से छूटकर आने के बाद भाई के जख्म का लिया बदला, चलती बस में आरोपी को मारा चाकू ...',
                time: '1 घंटे पहले',
                location: 'रोहतास'
              }
            ].map((news, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border-t-4 border-red-600">
                <div className="p-4 sm:p-5">
                  <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded">{news.location}</span>
                    <span className="mx-2">•</span>
                    <span>{news.time}</span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 line-clamp-3 group-hover:text-red-600 transition-colors duration-300">{news.title}</h3>
                  <Link to="#" className="inline-flex items-center text-blue-600 text-xs sm:text-sm font-medium hover:underline">
                    पूरी खबर पढ़ें
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Politics News Section */}
        <div className="mb-10 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
            <div className="w-4 h-8 sm:h-10 bg-blue-600 rounded mr-3"></div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">राजनीति</h2>
            <Link to="/politics" className="ml-auto mt-2 sm:mt-0 text-blue-600 hover:underline flex items-center text-sm sm:text-base">
              सभी खबरें देखें
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="CurrentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: 'बिहार चुनाव 2025 से पहले NDA घटक दलों की सियासी हलचल तेज, चिराग और कुशवाहा करेंगे शक्ति प्रदर्शन...',
                time: '4 घंटे पहले',
                location: 'पटना'
              },
              {
                title: 'कृष्णा अल्लावारू का बड़ा बयान; सर्वे के आधार पर तय होंगे कांग्रेस के उम्मीदवार...',
                time: '6 घंटे पहले',
                location: 'दिल्ली'
              },
              {
                title: 'क्या नीतीश कुमार लालू यादव की राह पर चल पड़े हैं? चुनावी रथ से बिहार भ्रमण...',
                time: '3 घंटे पहले',
                location: 'बिहार'
              },
              {
                title: 'बिहार में विकास कार्यों की रफ्तार बढ़ाने में जुटे नीतीश कुमार, अधिकारियों को दिए सख्त निर्देश...',
                time: '2 घंटे पहले',
                location: 'पटना'
              }
            ].map((news, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border-t-4 border-blue-600">
                <div className="p-4 sm:p-5">
                  <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded">{news.location}</span>
                    <span className="mx-2">•</span>
                    <span>{news.time}</span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 line-clamp-3 group-hover:text-blue-600 transition-colors duration-300">{news.title}</h3>
                  <Link to="#" className="inline-flex items-center text-blue-600 text-xs sm:text-sm font-medium hover:underline">
                    पूरी खबर पढ़ें
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="CurrentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bihar News Section */}
        <div className="mb-10 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
            <div className="w-4 h-8 sm:h-10 bg-green-600 rounded mr-3"></div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">बिहार</h2>
            <Link to="/bihar" className="ml-auto mt-2 sm:mt-0 text-blue-600 hover:underline flex items-center text-sm sm:text-base">
              सभी खबरें देखें
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="CurrentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: 'पहली पत्नी के रहते बिहार पुलिस चालक ने की दूसरी शादी, दहेज उत्पीड़न का मामला दर्ज...',
                time: '7 घंटे पहले',
                location: 'भागलपुर'
              },
              {
                title: 'बिहार में यहां खुलेगा भारत का चौथा शेर प्रजनन केंद्र, वन विभाग ने शुरू की तैयारी...',
                time: '5 घंटे पहले',
                location: 'राजगीर'
              },
              {
                title: 'मुजफ्फरपुर से नरकटियागंज जा रही डेमू ट्रेन का संचालन बाधित, तार टूटने से बीच में रुकी...',
                time: '3 घंटे पहले',
                location: 'मुजफ्फरपुर'
              },
              {
                title: 'मक्का लोड पिकअप दुर्घटनाग्रस्त, 5 की मौत; 20 घायल...',
                time: '2 घंटे पहले',
                location: 'वैशाली'
              }
            ].map((news, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border-t-4 border-green-600">
                <div className="p-4 sm:p-5">
                  <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded">{news.location}</span>
                    <span className="mx-2">•</span>
                    <span>{news.time}</span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 line-clamp-3 group-hover:text-green-600 transition-colors duration-300">{news.title}</h3>
                  <Link to="#" className="inline-flex items-center text-blue-600 text-xs sm:text-sm font-medium hover:underline">
                    पूरी खबर पढ़ें
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="CurrentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jharkhand News Section */}
        <div className="mb-10 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
            <div className="w-4 h-8 sm:h-10 bg-yellow-600 rounded mr-3"></div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">झारखंड</h2>
            <Link to="/jharkhand" className="ml-auto mt-2 sm:mt-0 text-blue-600 hover:underline flex items-center text-sm sm:text-base">
              सभी खबरें देखें
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="CurrentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: 'पब्लिक प्लेस पर सिगरेट पीने वाले हो जाए सावधान, नहीं तो देना होगा 1000 रुपये जुर्माना...',
                time: '4 घंटे पहले',
                location: 'रांची'
              },
              {
                title: 'रांची में इलेक्ट्रिक स्कूटी चार्ज करते वक्त लगी आग, पूरा घर जलकर राख ...',
                time: '6 घंटे पहले',
                location: 'रांची'
              },
              {
                title: 'झारखंड में कोरोना से पहली मौत, स्वास्थ्य विभाग अलर्ट...',
                time: '8 घंटे पहले',
                location: 'जमशेदपुर'
              },
              {
                title: '8 IPS अधिकारियों को मिला अतिरिक्त प्रभार, सरकार ने जारी किया आदेश...',
                time: '5 घंटे पहले',
                location: 'झारखंड'
              }
            ].map((news, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border-t-4 border-yellow-600">
                <div className="p-4 sm:p-5">
                  <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded">{news.location}</span>
                    <span className="mx-2">•</span>
                    <span>{news.time}</span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 line-clamp-3 group-hover:text-yellow-600 transition-colors duration-300">{news.title}</h3>
                  <Link to="#" className="inline-flex items-center text-blue-600 text-xs sm:text-sm font-medium hover:underline">
                    पूरी खबर पढ़ें
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="CurrentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* National News Section */}
        <div className="mb-10 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
            <div className="w-4 h-8 sm:h-10 bg-purple-600 rounded mr-3"></div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">देश</h2>
            <Link to="/national" className="ml-auto mt-2 sm:mt-0 text-blue-600 hover:underline flex items-center text-sm sm:text-base">
              सभी खबरें देखें
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="CurrentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: 'बाप-बेटे ने किया कमाल: एक साथ पुलिस ने हुए भर्ती, अब साथ लेंगे ट्रेनिंग ...',
                time: '5 घंटे पहले',
                location: 'महाराष्ट्र'
              },
              {
                title: 'मिसाइल हमले के बीच अमेरिकी राष्ट्रपति का बड़ा बयान, भारत-पाकिस्तान में सुलह कराई, अब ईरान-इजरायल की जंग रुकवाउंगा...',
                time: '7 घंटे पहले',
                location: 'दिल्ली'
              },
              {
                title: 'पुणे के इंद्रायनी नदी पर बने लोहे का पुल ढहने से 6 की मौत, 30 से अधिक पर्यटक बहें, पुल की गुणवत्ता पर उठ रहे सवाल...',
                time: '4 घंटे पहले',
                location: 'महाराष्ट्र'
              },
              {
                title: 'कौन है 17 वर्षीय नाबालिग, जो विमान हादसे का बना गवाह? पुलिस ने की पूछताछ...',
                time: '3 घंटे पहले',
                location: 'केरल'
              }
            ].map((news, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border-t-4 border-purple-600">
                <div className="p-4 sm:p-5">
                  <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded">{news.location}</span>
                    <span className="mx-2">•</span>
                    <span>{news.time}</span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 line-clamp-3 group-hover:text-purple-600 transition-colors duration-300">{news.title}</h3>
                  <Link to="#" className="inline-flex items-center text-blue-600 text-xs sm:text-sm font-medium hover:underline">
                    पूरी खबर पढ़ें
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="CurrentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career News Section */}
        <div className="mb-10 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
            <div className="w-4 h-8 sm:h-10 bg-indigo-600 rounded mr-3"></div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">करियर</h2>
            <Link to="/career" className="ml-auto mt-2 sm:mt-0 text-blue-600 hover:underline flex items-center text-sm sm:text-base">
              सभी खबरें देखें
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="CurrentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: 'नीट यूजी 2025 की काउंसिलिंग शुरू, बिहार में MBBS की 1490 और BDS की 140 सीटें उपलब्ध...',
                time: '1 दिन पहले',
                location: 'बिहार'
              },
              {
                title: '12वीं के बाद पायलट बनने का सपना करें पूरा, जानें... कौन सा कोर्स है जरूरी...',
                time: '2 दिन पहले',
                location: 'दिल्ली'
              },
              {
                title: '19 जून को इस जिले में लगेगा रोजगार कैंप, 8वीं पास से लेकर ITI वालों तक के लिए नौकरी...',
                time: '3 दिन पहले',
                location: 'पटना'
              },
              {
                title: 'कौन है बिहार के IPS कार्तिकेय शर्मा जिन्होंने अपराधियों की नींद उड़ा दी? जानें... सफलता की कहानी...',
                time: '4 घंटे पहले',
                location: 'बिहार'
              }
            ].map((news, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border-t-4 border-indigo-600">
                <div className="p-4 sm:p-5">
                  <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded">{news.location}</span>
                    <span className="mx-2">•</span>
                    <span>{news.time}</span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 line-clamp-3 group-hover:text-indigo-600 transition-colors duration-300">{news.title}</h3>
                  <Link to="#" className="inline-flex items-center text-blue-600 text-xs sm:text-sm font-medium hover:underline">
                    पूरी खबर पढ़ें
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="CurrentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending News Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
            <div className="w-4 h-8 sm:h-10 bg-pink-600 rounded mr-3"></div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">ट्रेंडिंग न्यूज़</h2>
            <Link to="/trending" className="ml-auto mt-2 sm:mt-0 text-blue-600 hover:underline flex items-center text-sm sm:text-base">
              सभी खबरें देखें
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="CurrentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: 'बिहार चुनाव 2025 से पहले NDA घटक दलों की सियासी हलचल तेज, चिराग और कुशवाहा करेंगे शक्ति प्रदर्शन...',
                time: '2 घंटे पहले',
                views: '1.2M'
              },
              {
                title: 'भरी पंचायत में बेटे ने पिता को उतारा मौत के घाट, छापेमारी जारी...',
                time: '5 घंटे पहले',
                views: '890K'
              },
              {
                title: 'बिहार में यहां खुलेगा भारत का चौथा शेर प्रजनन केंद्र, वन विभाग ने शुरू की तैयारी...',
                time: '1 दिन पहले',
                views: '756K'
              },
              {
                title: 'बाढ़ में गैंगवार, 20 राउंड फायरिंग में 2 को लगी गोली...',
                time: '3 घंटे पहले',
                views: '1.5M'
              }
            ].map((news, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border-t-4 border-pink-600">
                <div className="p-4 sm:p-5">
                  <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      {news.views} देखे गए
                    </span>
                    <span className="mx-2">•</span>
                    <span>{news.time}</span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 line-clamp-3 group-hover:text-pink-600 transition-colors duration-300">{news.title}</h3>
                  <Link to="#" className="inline-flex items-center text-blue-600 text-xs sm:text-sm font-medium hover:underline">
                    पूरी खबर पढ़ें
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="CurrentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-8 sm:py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">हमारे न्यूज़लेटर की सदस्यता लें</h2>
          <p className="text-white/90 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">दैनिक समाचार अपडेट सीधे अपने इनबॉक्स में प्राप्त करें। बिहार और झारखंड की ताज़ा खबरें, विश्लेषण और अपडेट्स।</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto sm:max-w-xl">
            <input 
              type="email" 
              placeholder="आपका ईमेल पता" 
              className="flex-grow px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium shadow-md transition-colors duration-300 whitespace-nowrap text-sm sm:text-base">
              सब्सक्राइब करें
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;