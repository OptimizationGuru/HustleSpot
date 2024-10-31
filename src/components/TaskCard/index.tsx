import React, { useState } from 'react';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { Task } from '../../types';
import { getStatusLabel } from '../../helpers/GetTaskStatus';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../store/taskSlice';
import EditTaskDialog from '../EditTask';
import { formatToIndianDate } from '../../utils/dateFunction';

interface TaskCardProps {
  taskDetails: Task;
  onUpdate: (updatedTask: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ taskDetails, onUpdate }) => {
  const dispatch = useDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const deleteTaskbyId = (task_id: number) => {
    dispatch(deleteTask(task_id));
  };

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const { label: statusLabel, color: statusColor } = getStatusLabel(
    taskDetails?.status
  );
  const formattedDueDate = formatToIndianDate(taskDetails?.dueDate);

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col gap-6 items-center justify-center mx-auto shadow-2xl rounded-xl bg-gradient-to-b from-blue-50 to-blue-100 p-6 sm:p-8 m-4 md:m-8 border border-blue-300 transition-transform transform hover:scale-105 hover:shadow-3xl">
      <div className="absolute top-4 right-4 flex gap-2">
        <span
          className={`${statusColor} text-white text-xs font-semibold px-3 py-1 sm:px-4 sm:py-2 rounded-2xl shadow-md`}
        >
          {statusLabel}
        </span>
        <span
          className="bg-blue-500 text-white text-xs font-semibold p-1.5 sm:p-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300 cursor-pointer"
          onClick={handleEditClick}
        >
          <CiEdit size={20} />
        </span>
        <span className="bg-red-500 text-white text-xs font-semibold p-1.5 sm:p-2 rounded-full shadow-md hover:bg-red-600 transition duration-300 cursor-pointer">
          <CiTrash size={20} onClick={() => deleteTaskbyId(taskDetails.id)} />
        </span>
      </div>

      <div className="w-full flex items-center gap-3 sm:gap-4 mt-10 sm:mt-12">
        <span className="bg-purple-200 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          Title
        </span>
        <p className="text-gray-800 font-semibold text-sm sm:text-lg truncate">
          {taskDetails?.title}
        </p>
      </div>

      <div className="w-full flex flex-col gap-1 sm:gap-2">
        <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          Description
        </span>
        <p className="text-gray-700 text-xs sm:text-sm truncate">
          {taskDetails?.desc}
        </p>
      </div>

      <div className="w-full flex flex-col gap-1 sm:gap-2">
        <span className="bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          Due Date
        </span>
        <p className="text-gray-700 text-xs sm:text-sm">{formattedDueDate}</p>
      </div>

      <EditTaskDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        taskDetails={taskDetails}
        onSave={(updatedTask: Task) => {
          onUpdate(updatedTask);
          setIsEditDialogOpen(false);
        }}
      />
    </div>
  );
};

export default TaskCard;
