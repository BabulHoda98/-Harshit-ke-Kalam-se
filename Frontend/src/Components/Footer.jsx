// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

// const Footer = ({ footerLogoParts, footerDescription, footerContactInfo, footerQuickLinksCategories }) => {
//   // We'll hardcode the brand name here since it's a fixed brand identity for the footer logo
//   const brandName = "Harshit ke Kalam se";
//   const contactInfo = footerContactInfo || { email: '', phone: '', address: '' };
//   const quickLinks = footerQuickLinksCategories || [];
//   const currentYear = new Date().getFullYear(); // Get the current year for the copyright;

//   return (
//     <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-300 py-8 md:py-12 mt-8 md:mt-12 notranslate">
//       <div className="container mx-auto px-4 md:px-10 flex flex-wrap justify-between gap-6 md:gap-8 border-b border-gray-700 pb-6 md:pb-8">
//         {/* Logo and Description */}
//         <div className="flex flex-col w-full md:w-auto md:flex-grow-0">
//           <Link to="/" className="flex items-center space-x-2 group mb-4">
//             {/* Symbol/Icon for the brand */}
//             <div className="bg-gradient-to-br from-indigo-600 via-pink-500 to-yellow-400 text-white font-bold text-lg px-3 py-2 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
//               ✍️
//             </div>
//             {/* Brand Text - Harshit ke Kalam se */}
//             <div className="text-2xl md:text-3xl font-black text-gray-100 group-hover:text-pink-500 transition-colors duration-300 tracking-tight">
//               {brandName}
//             </div>
//           </Link>
//           <p className="text-gray-400 max-w-xs text-sm md:text-base">
//             {footerDescription || 'Delivering profound thoughts and stories. Dive deep into reflections, insights, and creative expressions from Harshit ke Kalam se.'}
//           </p>
//           <div className="flex space-x-4 mt-4 md:mt-6 text-gray-400">
//             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors duration-300">
//               <FaFacebookF size={18} />
//             </a>
//             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
//               <FaTwitter size={18} />
//             </a>
//             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors duration-300">
//               <FaInstagram size={18} />
//             </a>
//             <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors duration-300">
//               <FaYoutube size={18} />
//             </a>
//           </div>
//         </div>

//         {/* Navigation links */}
//         <div className="w-1/2 md:w-auto">
//           <h3 className="text-white font-semibold mb-4">Quick Links</h3>
//           <ul className="space-y-2">
//             <li>
//               <Link to="/" className="hover:text-white transition-colors duration-300">Home</Link>
//             </li>
//             <li>
//               <Link to="/about" className="hover:text-white transition-colors duration-300">About</Link>
//             </li>
//             <li>
//               <Link to="/contact" className="hover:text-white transition-colors duration-300">Contact</Link>
//             </li>
//             <li>
//               <Link to="/advertise" className="hover:text-white transition-colors duration-300">Advertise</Link>
//             </li>
//           </ul>
//         </div>

//         {/* Contact & Subscribe */}
//         <div className="w-full md:w-auto md:max-w-xs">
//           <h3 className="text-white font-semibold mb-4">Contact Us</h3>
//           <p className="text-gray-400 mb-4">
//             Email: {contactInfo.email || 'harshit@kalamse.com'}<br/>
//             Phone: {contactInfo.phone || '+91 98765 43210'}<br/>
//             Address: {contactInfo.address || 'Creative Corner, Nashik, India'}
//           </p>
//           <form className="flex">
//             <input
//               type="email"
//               placeholder="Your Email"
//               className="w-full px-3 py-2 rounded-l-md bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none"
//             />
//             <button
//               type="submit"
//               className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-r-md transition-colors duration-300"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Copyright Line */}
//       <div className="container mx-auto px-6 mt-8 text-center text-sm text-gray-500">
//         <p className="mb-2">© {currentYear} {brandName}. All rights reserved.</p>
//       </div>

//       {/* Powered by PigoPi with Gradient */}
//       <div className="container mx-auto px-6 text-center text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-semibold">
//         Powered By <span></span>
//         <a href="https://pigo-pi.com/" target="_blank" rel="noopener noreferrer" className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-green-500 hover:opacity-80 transition-opacity duration-300">
//           PigoPi
//         </a>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
// import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = ({ footerLogoParts, footerDescription, footerContactInfo, footerQuickLinksCategories }) => {
  const brandName = "Harshit ke Kalam se";
  const contactInfo = footerContactInfo || { 
    email: 'harshit@kalamse.com', 
    phone: '+91 98765 43210', 
    address: 'Creative Corner, Noida, India' 
  };
  
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: <FaFacebookF size={16} />, url: "https://www.facebook.com/profile.php?id=61576543783204&sk=about", color: "hover:bg-[#1877F2]" },
    { icon: <FaTwitter size={16} />, url: "https://twitter.com", color: "hover:bg-[#1DA1F2]" },
    { icon: <FaInstagram size={16} />, url: "https://instagram.com", color: "hover:bg-gradient-to-tr from-[#833AB4] via-[#E1306C] to-[#FCAF45]" },
    { icon: <FaYoutube size={16} />, url: "https://youtube.com", color: "hover:bg-[#FF0000]" }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white pt-10 md:pt-14 mt-16 notranslate">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pb-10 border-b border-gray-700">
          {/* Brand Column */}
          <div className="space-y-5 md:space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-indigo-600 via-pink-500 to-yellow-400 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl">✍️</span>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-white group-hover:text-yellow-400 transition-colors duration-300 tracking-tight">
                  {brandName}
                </h2>
                <p className="text-xs font-semibold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500">
                  {footerDescription || 'Thoughts that resonate'}
                </p>
              </div>
            </Link>
            
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Delivering profound thoughts and stories. Dive deep into reflections, insights, and creative expressions from Harshit ke Kalam se.
            </p>
            
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 transition-all duration-300 ${link.color} hover:text-white`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5 md:space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-white border-l-4 border-yellow-500 pl-3 py-1">Quick Links</h3>
            <ul className="space-y-2 md:space-y-3">
              {['Home', 'About', 'Contact', 'Advertise', 'Privacy Policy', 'Terms of Service'].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300 group text-sm sm:text-base"
                  >
                    <span className="w-2 h-2 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-5 md:space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-white border-l-4 border-pink-500 pl-3 py-1">Categories</h3>
            <ul className="space-y-2 md:space-y-3">
              {['Politics', 'Business', 'Technology', 'Entertainment', 'Sports', 'Health'].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={`/category/${item.toLowerCase()}`} 
                    className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors duration-300 group text-sm sm:text-base"
                  >
                    <span className="w-2 h-2 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-5 md:space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-white border-l-4 border-indigo-500 pl-3 py-1">Stay Updated</h3>
            
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-indigo-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">{contactInfo.address}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <FaPhone className="text-indigo-400" />
                <a href={`tel:${contactInfo.phone}`} className="text-gray-400 hover:text-indigo-400 transition-colors text-sm sm:text-base">
                  {contactInfo.phone}
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-indigo-400" />
                <a href={`mailto:${contactInfo.email}`} className="text-gray-400 hover:text-indigo-400 transition-colors text-sm sm:text-base">
                  {contactInfo.email}
                </a>
              </div>
            </div>
            
            <div className="mt-3 md:mt-4">
              <h4 className="text-gray-300 font-medium mb-2 md:mb-3 text-sm sm:text-base">Subscribe to our newsletter</h4>
              <form className="flex flex-col gap-2 md:gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-medium py-2 md:py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/20 text-sm sm:text-base"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright & Bottom Info */}
        <div className="py-6 md:py-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-gray-500 text-xs sm:text-sm">
            © {currentYear} {brandName}. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-gray-500 text-xs sm:text-sm">
            <Link to="/privacy-policy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link>
          </div>
          
          <div className="flex items-center">
            <span className="text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 font-semibold">
              Powered by <a href="https://pigo-pi.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Pigopi</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
