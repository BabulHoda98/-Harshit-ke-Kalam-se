import React from 'react';

const Crime = () => {
  const crimeNews = [
    {
      title: "Caste Census: देश में जातीय जनगणना को लेकर केंद्र सरकार ने जारी किया गजट नोटिफिकेशन",
      content: "देश को लंबे समय से जनगणना का इंतजार था, जो अब खत्म होता दिख रहा है। गृह मंत्रालय ने जनगणना अधिनियम, 1948 के तहत जनगणना और जातीय जनगणना से संबंधित आधिकारिक गजट नोटिफिकेशन सोमवार को जारी कर दिया। इसके बाद विभिन्न संबंधित एजेंसियां सक्रिय हो गई हैं। अब स्टाफ की नियुक्ति, प्रशिक्षण, फॉर्मेट तैयार करना और फील्ड वर्क की योजना बनाना शुरू किया जाएगा।",
      date: "सोमवार"
    },
    {
      title: "Bihar Crime News: दो धूर जमीन के लिए भाई का कत्ल, पत्नी समेत दो गिरफ्तार",
      content: "बिहार के मुजफ्फरपुर से एक हैरान कर देने वाला मामला सामने आया है, महज दो धूर जमीन के लिए रिश्ते का कत्ल कर दिया गया। घटना बरुराज थाना क्षेत्र के पकड़ी गांव में शुक्रवार की रात की है। छोटे भाई ने जमीन के विवाद में 39 वर्षीय बड़े भाई मुकेश पटेल की चाकू गोदकर हत्या कर दी है। इस घटना में आरोपी रितेश पटेल और उसकी पत्नी संध्या देवी को पुलिस ने गिरफ्तार कर लिया है।",
      date: "शुक्रवार"
    },
    {
      title: "Bihar Crime News: नई नवेली भाभी को आइसक्रीम खिलाना पड़ा महंगा, भाई ने सीने में चाकू गोद कर मार डाला",
      content: "बिहार के छपरा से एक हैरान कर देने वाला मामला सामने आया है, जहां अपने नई नवेली भाभी को आइसक्रीम खिलाना युवक को महंगा पड़ गया। जिस कारण युवक को अपनी जान गवानी पड़ी है। यह घटना परसा थाना क्षेत्र के मारर गांव की है। मृतक की पहचान मारर गांव के निवासी दीनानाथ साह का 19 वर्षीय पुत्र सोनू कुमार के रुप में हुई है। सूचना मिलने पर स्थानीय पुलिस मौके पर पहुंची और मामले की जांच शुरू कर दी है।",
      date: "शनिवार"
    },
    // Add all other news items in the same format
    {
      title: "Bihar Crime News: बिहार में अधिवक्ता के घर डकैती, अकेली बेटी को बंधक बनाकर लूटे लाखों के गहने और नकदी",
      content: "बिहार के मुजफ्फरपुर जिले के ब्रह्मपुरा थाना क्षेत्र स्थित राहुल नगर में रविवार शाम करीब 6 बजे डकैतों ने अधिवक्ता दीनदयाल राउत के घर में घुसकर लूटपाट की। इस दौरान उनकी बेटी आकांक्षा को बंधक बना कर मारपीट की गई और घर में रखे ₹4.5 लाख नकद तथा बेटी की शादी के लिए रखे ₹4 लाख के गहने लूट लिए गए। घटना के बाद पुलिस ने मामले की जांच शुरू कर दी है।",
      date: "रविवार"
    }
    // Continue with all remaining news items...
  ];

  return (
    <div className="crime-news-page">
      <header className="page-header">
        <h1>जुर्म</h1>
        <p>बिहार और देश भर से अपराध सम्बंधित ताज़ा खबरें</p>
      </header>

      <div className="crime-news-container">
        {crimeNews.map((news, index) => (
          <div className="news-item" key={index}>
            <h2>{news.title}</h2>
            <p>{news.content}</p>
            <span className="news-date">{news.date}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .crime-news-page {
          font-family: 'Arial', sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #e74c3c;
          padding-bottom: 15px;
        }
        
        .page-header h1 {
          color: #e74c3c;
          font-size: 2.5rem;
          margin-bottom: 5px;
        }
        
        .page-header p {
          color: #666;
          font-size: 1.1rem;
        }
        
        .news-item {
          background: #fff;
          padding: 20px;
          margin-bottom: 25px;
          border-radius: 8px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }
        
        .news-item:hover {
          transform: translateY(-3px);
        }
        
        .news-item h2 {
          color: #222;
          font-size: 1.4rem;
          margin-top: 0;
          margin-bottom: 15px;
          line-height: 1.4;
        }
        
        .news-item p {
          color: #444;
          line-height: 1.6;
          font-size: 1rem;
          margin-bottom: 15px;
        }
        
        .news-date {
          display: block;
          text-align: right;
          color: #888;
          font-size: 0.9rem;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default Crime;