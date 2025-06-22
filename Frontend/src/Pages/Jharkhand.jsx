import { useState } from 'react';
import { Link } from 'react-router-dom';

const Jharkhand = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedPhase, setSelectedPhase] = useState('All Phases');

  const phases = ['All Phases', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5'];

  const parties = [
    { name: 'BJP', seats: 30, color: 'bg-orange-500' },
    { name: 'JMM', seats: 28, color: 'bg-green-700' },
    { name: 'Congress', seats: 15, color: 'bg-blue-500' },
    { name: 'AJSU', seats: 8, color: 'bg-yellow-500' },
    { name: 'Others', seats: 14, color: 'bg-gray-500' }
  ];

  const constituencies = [
    { name: 'Ranchi', phase: 'Phase 1', candidates: 12, voters: 450000 },
    { name: 'Dhanbad', phase: 'Phase 2', candidates: 9, voters: 520000 },
    { name: 'Jamshedpur', phase: 'Phase 3', candidates: 11, voters: 480000 },
    { name: 'Deoghar', phase: 'Phase 4', candidates: 8, voters: 380000 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-800">Jharkhand Legislative Assembly Election 2025</h1>
            <p className="text-gray-600 mt-2">81 Seats • Multi-phase elections from Nov-Dec 2025</p>
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
          {['overview', 'phases', 'parties', 'voter-info'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 whitespace-nowrap font-medium text-sm capitalize ${activeSection === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveSection(tab)}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Phase Filter */}
        <div className="mb-6">
          <label htmlFor="phase" className="block text-sm font-medium text-gray-700 mb-1">Filter by Phase</label>
          <select
            id="phase"
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
          >
            {phases.map((phase) => (
              <option key={phase} value={phase}>{phase}</option>
            ))}
          </select>
        </div>

        {/* Content Sections */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Election Overview</h2>
              <p className="text-gray-600 mb-4">
                The Jharkhand Legislative Assembly election will be held in five phases between November and December 2025 to elect members to the 81 seats of the Jharkhand Legislative Assembly.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-indigo-800">Total Seats</h3>
                  <p className="text-2xl font-bold text-indigo-900 mt-1">81</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-green-800">Registered Voters</h3>
                  <p className="text-2xl font-bold text-green-900 mt-1">24.3M</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-purple-800">Polling Stations</h3>
                  <p className="text-2xl font-bold text-purple-900 mt-1">29,464</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Political Parties</h2>
              <div className="space-y-4">
                {parties.map((party) => (
                  <div key={party.name} className="flex items-center">
                    <div className={`w-3 h-3 ${party.color} rounded-full mr-3`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{party.name}</span>
                        <span>{party.seats} seats (2019)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${party.color}`} 
                          style={{ width: `${(party.seats / 81) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'phases' && (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Constituencies by Phase</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {constituencies
                .filter(c => selectedPhase === 'All Phases' || c.phase === selectedPhase)
                .map((constituency) => (
                  <div key={constituency.name} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{constituency.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{constituency.voters.toLocaleString()} registered voters</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {constituency.phase}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{constituency.candidates} candidates</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>Data source: Jharkhand Election Commission | Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Jharkhand;