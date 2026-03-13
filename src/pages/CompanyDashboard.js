import React from 'react';
import { Building2, Users, Briefcase } from 'lucide-react';

const CompanyDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <Building2 className="h-8 w-8 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Company Dashboard</h2>
          </div>
          
          <nav className="mt-8 space-y-1">
            <a href="#" className="bg-blue-50 text-blue-700 block px-3 py-2 rounded-md text-sm font-medium">
              <Users className="inline-block w-5 h-5 mr-2" />
              Profile
            </a>
            <a href="#" className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-sm font-medium">
              <Briefcase className="inline-block w-5 h-5 mr-2" />
              Jobs
            </a>
            <a href="#" className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-sm font-medium">
              <Building2 className="inline-block w-5 h-5 mr-2" />
              Candidates
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Company Name!</h1>
            <p className="mt-2 text-lg text-gray-600">
              Your company profile is complete and ready for recruiting
            </p>
          </div>
        </header>

        <main className="flex-1">
          <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-lg rounded-lg">
              <div className="px-4 py-5 sm:p-6 sm:px-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Stats Cards */}
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg">
                    <div className="text-white">
                      <h3 className="text-lg font-semibold">Active Jobs</h3>
                      <p className="text-3xl font-bold">12</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg">
                    <div className="text-white">
                      <h3 className="text-lg font-semibold">Total Applicants</h3>
                      <p className="text-3xl font-bold">248</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg">
                    <div className="text-white">
                      <h3 className="text-lg font-semibold">Interviews Scheduled</h3>
                      <p className="text-3xl font-bold">8</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CompanyDashboard;
