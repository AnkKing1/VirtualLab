import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/assets/NCE.avif)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg animate-fadeIn">
            Welcome to Virtual College Lab
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 drop-shadow-md animate-fadeIn delay-100">
            Access courses, teaching tools, and more in one place. Log in to get started.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 animate-slideIn">
            <Link
              to="/student-login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg hover:scale-105"
            >
              Student Login
            </Link>
            <Link
              to="/faculty-login"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 shadow-lg hover:scale-105"
            >
              Faculty Login
            </Link>
          </div>
        </div>
      </div>

      {/* College Info Section */}
      <div className="p-10 bg-gray-100 text-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-800 animate-fadeIn">
            Nalanda College of Engineering
          </h1>
          <p className="text-lg leading-relaxed animate-fadeIn delay-100">
            Nalanda College of Engineering is a Government Engineering College working under the Department of Science and Technology. 
            Established in 2008, it is situated on the sacred land where Lord Buddha attained enlightenment and Lord Vardhaman Mahavir embraced Nirvana.
            <br /><br />
            Initially, it offered B.Tech degrees in four programs: Computer Science & Engineering, Civil Engineering, Mechanical Engineering, and Electrical & Electronics Engineering. Later, it expanded to include B.Tech in Aeronautical Engineering, Artificial Intelligence & Machine Learning, and an M.Tech in Power Systems. 
            <br /><br />
            Each B.Tech branch accommodates 60 students, totaling approximately 1200 students.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;