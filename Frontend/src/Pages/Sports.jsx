import React from 'react';

const Sports = () => {
  const sportsNews = [
    {
      id: 1,
      title: "Shubman Gill से गंभीर और अगरकर को है यह ख़ास उम्मीद",
      description: "भारतीय टेस्ट क्रिकेट में एक नए युग की शुरुआत होने जा रही है और इसकी कमान 25 वर्षीय शुभमन गिल के हाथों में सौंपी गई है..."
    },
    {
      id: 2,
      title: "WTC Final 2025: विश्व टेस्ट चैंपियनशिप विजेता टीम को मिलेंगे इतने करोड़",
      description: "वर्ल्ड टेस्ट चैंपियनशिप 2025 फाइनल में साउथ अफ्रीका और ऑस्ट्रेलिया के बीच लॉर्ड्स में रोमांचक मुकाबला चल रहा है..."
    },
    {
      id: 3,
      title: "WTC Final 2025: पैट कमिंस के नाम एक और वर्ल्ड रिकॉर्ड",
      description: "लंदन के लॉर्ड्स मैदान पर खेले गए विश्व टेस्ट चैंपियनशिप 2025 फाइनल के दूसरे दिन ऑस्ट्रेलियाई कप्तान पैट कमिंस ने इतिहास रच दिया..."
    },
    {
      id: 4,
      title: "Gautam Gambhir की मां को आया हार्ट अटैक",
      description: "भारतीय क्रिकेट टीम के हेड कोच गौतम गंभीर अचानक भारत लौट आए हैं। जानकारी के अनुसार, गौतम गंभीर की मां सीमा गंभीर को हाल ही में दिल का दौरा पड़ा था..."
    },
    {
      id: 5,
      title: "Virat Kohli और Rohit Sharma को सम्मानित करेगा इस देश का क्रिकेट बोर्ड",
      description: "भारतीय क्रिकेट के दो दिग्गज विराट कोहली और रोहित शर्मा ने टेस्ट और टी20 क्रिकेट से संन्यास ले लिया है..."
    },
    {
      id: 6,
      title: "INDvsENG: इंग्लैंड में सबसे ज्यादा टेस्ट शतक ठोकने वाले भारतीय",
      description: "भारत और इंग्लैंड के बीच 20 जून 2025 से शुरू होने वाली 5 मैचों की टेस्ट सीरीज में युवा भारतीय बल्लेबाजों पर सबकी नजरें होंगी..."
    }
  ];

  const trendingTopics = [
    "#ShubmanGillCaptain",
    "#WTCFinal2025",
    "#PatCummins",
    "#INDvsENGTestSeries",
    "#IPL2025Final"
  ];

  return (
    <div className="max-w-6xl mx-auto p-5 font-sans">
      <h2 className="text-2xl md:text-3xl font-bold text-red-600 border-b-2 border-red-600 pb-2 mb-6">
        Latest Sports News
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {sportsNews.map(news => (
          <div 
            key={news.id}
            className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{news.title}</h3>
            <p className="text-gray-600">{news.description}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-green-50 rounded-lg p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Trending in Sports</h3>
        <ul className="flex flex-wrap gap-2">
          {trendingTopics.map((topic, index) => (
            <li 
              key={index}
              className="bg-teal-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sports;