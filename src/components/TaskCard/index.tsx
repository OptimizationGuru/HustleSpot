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
  className?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  taskDetails,
  onUpdate,
  className,
}) => {
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
    <div
      className={`${className} relative w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col gap-4 items-center justify-center mx-auto shadow-2xl rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 p-6 sm:p-8 m-4 md:m-8 border border-gray-700 transition-transform transform hover:scale-105 hover:shadow-3xl`}
    >
      <div className="absolute top-4 right-4 flex gap-2">
        <span
          className={`${statusColor} text-blue-400 text-xs font-semibold px-3 py-1 sm:px-4 sm:py-2 rounded-2xl shadow-md`}
        >
          {statusLabel}
        </span>
        <span
          className="bg-blue-600 text-white text-xs font-semibold p-1.5 sm:p-2 rounded-full shadow-md hover:bg-blue-700 transition duration-300 cursor-pointer"
          onClick={handleEditClick}
        >
          <CiEdit size={20} />
        </span>
        <span
          className="bg-red-500 text-white text-xs font-semibold p-1.5 sm:p-2 rounded-full shadow-md hover:bg-red-600 transition duration-300 cursor-pointer"
          onClick={() => deleteTaskbyId(taskDetails.id)}
        >
          <CiTrash size={20} />
        </span>
      </div>

      <div className="w-full flex items-center gap-3 sm:gap-4 mt-10 sm:mt-12">
        <span className="bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          Title
        </span>
        <p className="text-gray-300 font-semibold text-base sm:text-lg truncate shadow-md">
          {taskDetails?.title}
        </p>
      </div>

      <div className="w-full flex flex-col gap-1 sm:gap-2">
        <span className="bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          Description
        </span>
        <div className="max-h-24 overflow-y-auto">
          <p className="text-gray-400 text-sm sm:text-base shadow-md">
            {taskDetails?.desc}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-1 sm:gap-2">
        <span className="bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          Due Date
        </span>
        <p className="text-gray-400 text-sm sm:text-base shadow-md">
          {formattedDueDate}
        </p>
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
