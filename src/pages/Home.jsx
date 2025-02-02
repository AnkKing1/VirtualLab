import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/assets/NCE.avif)' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex justify-center items-center h-full text-white text-center px-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Virtual College Lab
          </h1>
          <p className="text-xl mb-8">
            Access courses, teaching tools, and more in one place. Log in to get started.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/student-login"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Student Login
            </Link>
            <Link
              to="/faculty-login"
              className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition duration-300"
            >
              Faculty Login
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className='p-5 bg-slate-400  text-black'>
      <h1 className='text-3xl p-3 m-2 flex justify-center'>Nalanda College of Engineering</h1>

      <p className='flex justify-between text-pretty'>Nalanda College of Engineering is a Government Engineering College working under the Department of Science and Technology. It has been established by the Government of Bihar in 2008. It is situated on the holy land where Lord Buddha experienced enlightenment and Lord Vardhaman Mahavir embraced Nirvana. It belongs to the land of ancient Nalanda University where students across the world would study Buddhism. Initially in the year 2008 it offered B. Tech. Degree in four programs namely Computer Science & Engineering, Civil Engineering, Mechanical engineering and Electrical & Electronics Engineering. In the subsequent year, three more programs i.e. B. Tech. in Aeronautical Engineering, B. Tech. in Artificial Intelligence & Machine Learning and M.Tech in power System came into existence.  Each branch for B.Tech consists of 60 students and the total number of students is around 1200.</p>
    </div>
    </div>
  );
};

export default Home;
