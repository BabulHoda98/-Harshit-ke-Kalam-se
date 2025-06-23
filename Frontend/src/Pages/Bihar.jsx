import { useState } from 'react';
import { Link } from 'react-router-dom';

const Bihar = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');

  const districts = [
    'All Districts', 'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 
    'Purnia', 'Saran', 'Sitamarhi', 'Vaishali', 'Samastipur'
  ];

  const parties = [
    { name: 'JD(U)', seats: 45, color: 'bg-green-500' },
    { name: 'BJP', seats: 38, color: 'bg-orange-500' },
    { name: 'RJD', seats: 35, color: 'bg-green-700' },
    { name: 'Congress', seats: 12, color: 'bg-blue-500' },
    { name: 'Others', seats: 15, color: 'bg-gray-500' }
  ];

  const candidates = [
    { name: 'Nitish Kumar', party: 'JD(U)', district: 'Patna', votes: 125000 },
    { name: 'Tejashwi Yadav', party: 'RJD', district: 'Raghopur', votes: 118000 },
    { name: 'Sushil Kumar Modi', party: 'BJP', district: 'Patna', votes: 110500 },
    { name: 'Chirag Paswan', party: 'LJP', district: 'Hajipur', votes: 98500 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-800">Bihar Legislative Assembly Election 2025</h1>
            <p className="text-gray-600 mt-2">243 Seats • Voting Phase 1-7: Oct 12 - Nov 5, 2025</p>
          </div>
          <Link 
            to="/election" 
            className="mt-4 md:mt-0 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Elections
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200 mb-8">
          {['overview', 'constituencies', 'candidates', 'results'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 whitespace-nowrap font-medium text-sm capitalize ${activeSection === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveSection(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* District Filter */}
        <div className="mb-6">
          <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">Filter by District</label>
          <select
            id="district"
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            {districts.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        {/* Content Sections */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Election Overview</h2>
              <p className="text-gray-600 mb-4">
                The Bihar Legislative Assembly election is scheduled to be held in October-November 2025 to elect members to the 243 seats of the Bihar Legislative Assembly.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-indigo-800">Total Seats</h3>
                  <p className="text-2xl font-bold text-indigo-900 mt-1">243</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-green-800">Registered Voters</h3>
                  <p className="text-2xl font-bold text-green-900 mt-1">72.9M</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-purple-800">Polling Stations</h3>
                  <p className="text-2xl font-bold text-purple-900 mt-1">62,779</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Parties</h2>
              <div className="space-y-4">
                {parties.map((party) => (
                  <div key={party.name} className="flex items-center">
                    <div className={`w-3 h-3 ${party.color} rounded-full mr-3`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{party.name}</span>
                        <span>{party.seats} seats</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${party.color}`} 
                          style={{ width: `${(party.seats / 243) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'candidates' && (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Top Candidates</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {candidates
                .filter(c => selectedDistrict === 'All Districts' || c.district === selectedDistrict)
                .map((candidate) => (
                  <div key={candidate.name} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                        {candidate.name.charAt(0)}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">{candidate.name}</h3>
                          <span className="text-sm text-gray-500">{candidate.votes.toLocaleString()} votes</span>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          <span>{candidate.party}</span> • <span>{candidate.district} District</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Add similar sections for 'constituencies' and 'results' */}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>Data source: Bihar Election Commission | Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Bihar;