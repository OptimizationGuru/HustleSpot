import React from 'react';

const TaskCard = () => {
  return (
    <div className="w-1/3 flex flex-col gap-8 items-center justify-center mx-auto shadow-lg rounded-lg bg-gray-300 p-4 m-4 border border-black">
      <div className="w-full flex items-center  gap-4">
        <label>Title :</label>
        <p>fwefwewf</p>
      </div>
      <div className="w-full flex flex-col gap-4">
        <label>Description :</label>
        <p>fwefwewf</p>
      </div>

      <div className="w-full flex flex-col gap-4">
        <label>Status :</label>
        <p>fwefwewf</p>
      </div>

      <div className="w-full flex flex-col gap-4">
        <label>Due Date :</label>
        <p>fwefwewf</p>
      </div>
    </div>
  );
};

export default TaskCard;
