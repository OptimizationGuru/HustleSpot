import React from 'react';
import { Image } from './image';

interface WelcomeCardProps {
  onCreateTaskClick: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ onCreateTaskClick }) => {
  return (
    <div className="flex items-center justify-center mx-auto mt-40 h-[500px] md:h-[600px] lg:h-[600px] w-[90%] md:w-[70%] lg:w-[50%]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md text-center h-full pt-10">
        <h2 className="text-3xl font-bold text-white">
          Welcome to Your Productivity Hub! 🌟
        </h2>
        <p className="mt-4 text-gray-300 text-lg">
          Ready to conquer your day? Start creating tasks and watch your goals
          come to life! Each task is a step closer to your dreams. Let’s make
          today count!
        </p>
        <button
          onClick={onCreateTaskClick}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Create Your First Task
        </button>

        <img
          src={Image}
          alt="Productivity Illustration"
          className="mt-6 w-[250px] mx-auto h-[250px] rounded-full shadow-lg"
        />
      </div>
    </div>
  );
};

export default WelcomeCard;
