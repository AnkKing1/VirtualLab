import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full rotate-12 transform-gpu">
          <div className="absolute w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-screen bg-cover bg-center bg-fixed bg-blend-overlay bg-black/30" 
           style={{ backgroundImage: 'url(../../public/NCE.avif)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        <div className="relative z-10 flex justify-center items-center h-full text-white text-center px-6">
          <motion.div
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={fadeIn.transition}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Welcome to Virtual College Lab
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200">
              Experience next-generation learning with our state-of-the-art virtual laboratory platform
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/student-login"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg overflow-hidden shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative text-lg font-semibold">Student Login</span>
              </Link>
              <Link
                to="/faculty-login"
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative text-lg font-semibold">Faculty Login</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* About Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Nalanda College of Engineering
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Nalanda College of Engineering is a prestigious Government Engineering College operating under the Department of Science and Technology, established by the Government of Bihar in 2008. Located on the sacred land where Lord Buddha attained enlightenment and Lord Vardhaman Mahavir achieved Nirvana, our institution carries forward the legacy of the ancient Nalanda University.
                </p>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-semibold mb-4 text-blue-800">Our Programs</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center transform hover:translate-x-2 transition-transform duration-300">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Computer Science & Engineering
                    </li>
                    <li className="flex items-center transform hover:translate-x-2 transition-transform duration-300">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Civil Engineering
                    </li>
                    <li className="flex items-center transform hover:translate-x-2 transition-transform duration-300">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Mechanical Engineering
                    </li>
                    <li className="flex items-center transform hover:translate-x-2 transition-transform duration-300">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Electrical & Electronics Engineering
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative">
                  <img 
                    src="/assets/campus.jpg" 
                    alt="Campus" 
                    className="rounded-xl shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
        <div className="relative py-16 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            >
              <div className="p-6 rounded-lg bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-colors duration-300">
                <h3 className="text-4xl font-bold mb-2">1200+</h3>
                <p className="text-gray-200">Students</p>
              </div>
              <div className="p-6 rounded-lg bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-colors duration-300">
                <h3 className="text-4xl font-bold mb-2">7</h3>
                <p className="text-gray-200">Programs</p>
              </div>
              <div className="p-6 rounded-lg bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-colors duration-300">
                <h3 className="text-4xl font-bold mb-2">60</h3>
                <p className="text-gray-200">Students per Branch</p>
              </div>
              <div className="p-6 rounded-lg bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-colors duration-300">
                <h3 className="text-4xl font-bold mb-2">2008</h3>
                <p className="text-gray-200">Established</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;