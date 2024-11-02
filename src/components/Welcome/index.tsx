import React from 'react';
import { Image } from './image';

interface WelcomeCardProps {
  onCreateTaskClick: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ onCreateTaskClick }) => {
  return (
    <div className="flex items-center justify-center mx-auto mt-30 py-10 h-auto md:h-[500px] lg:h-[600px] w-[90%] md:w-[70%] lg:w-[50%]">
      <div className="bg-gradient-to-r from-gray-800  to-gray-900 p-6 md:p-8 rounded-lg shadow-lg text-center h-full pt-10">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-500">
          Welcome to Your Productivity Hub! 🌟
        </h2>
        <p className="mt-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 text-lg">
          Ready to take charge? Create tasks and turn your goals into reality.
          Let’s make today count!
        </p>

        <button
          onClick={onCreateTaskClick}
          className="mt-6 px-6 py-3 text-white rounded-lg bg-gradient-to-r from-blue-500 to-red-400 hover:from-blue-600 hover:to-red-500 transition duration-300 font-semibold shadow-lg"
        >
          Create Your First Task
        </button>

        <img
          src={Image}
          alt="Productivity Illustration"
          className="mt-6 w-32 h-32 mx-auto rounded-full shadow-lg"
        />
      </div>
    </div>
  );
};

export default WelcomeCard;
