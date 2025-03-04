import React from 'react';
import { motion } from 'framer-motion';

const Resources = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Learning Resources
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Documentation Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">Documentation</h2>
              <ul className="space-y-4">
                <li>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Getting Started Guide</h3>
                  <p className="text-gray-600">Learn the basics of using our virtual lab platform.</p>
                </li>
                <li>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Lab Manuals</h3>
                  <p className="text-gray-600">Detailed instructions for each laboratory experiment.</p>
                </li>
                <li>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">API Documentation</h3>
                  <p className="text-gray-600">Technical documentation for advanced users.</p>
                </li>
              </ul>
            </div>

            {/* Learning Materials */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">Learning Materials</h2>
              <ul className="space-y-4">
                <li>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Video Tutorials</h3>
                  <p className="text-gray-600">Step-by-step video guides for common tasks.</p>
                </li>
                <li>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Sample Projects</h3>
                  <p className="text-gray-600">Example projects to help you get started.</p>
                </li>
                <li>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Best Practices</h3>
                  <p className="text-gray-600">Guidelines for optimal use of the platform.</p>
                </li>
              </ul>
            </div>

            {/* Support Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">Support</h2>
              <ul className="space-y-4">
                <li>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">FAQ</h3>
                  <p className="text-gray-600">Answers to commonly asked questions.</p>
                </li>
                <li>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Technical Support</h3>
                  <p className="text-gray-600">Get help with technical issues.</p>
                </li>
              </ul>
            </div>

            {/* Community Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">Community</h2>
              <ul className="space-y-4">
                <li>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Discussion Forum</h3>
                  <p className="text-gray-600">Connect with other students and faculty.</p>
                </li>
                <li>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Share Resources</h3>
                  <p className="text-gray-600">Contribute and access community-created content.</p>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;