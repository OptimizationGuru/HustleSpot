import React from 'react';
import { Image } from './image';

interface WelcomeCardProps {
  onCreateTaskClick: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ onCreateTaskClick }) => {
  return (
    <div className="flex items-center justify-center mx-auto mt-40 py-10 h-auto md:h-[600px] lg:h-[600px] w-[90%] md:w-[70%] lg:w-[50%]">
      <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-md text-center h-full pt-10">
        <h2 className="text-3xl font-bold text-white">
          Welcome to Your Productivity Hub! 🌟
        </h2>
        <p className="mt-4 text-gray-300 text-lg">
          "Ready to take charge? Create tasks and turn your goals into reality.
          Let’s make today count!"
        </p>
        <button
          onClick={onCreateTaskClick}
          className="mt-6 px-6 py-3 text-white rounded-lg bg-gradient-to-r from-blue-900 to-gray-800 hover:from-blue-800 hover:to-gray-700 transition duration-300"
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
