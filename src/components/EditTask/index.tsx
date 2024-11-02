import React, { useState, useEffect } from 'react';
import { Task } from '../../types';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../store/taskSlice';
import { IoMdClose } from 'react-icons/io';
import { TaskStatus } from '../../constants';

interface EditTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  taskDetails: Task;
  onSave?: (updatedTask: Task) => void;
}

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  isOpen,
  onClose,
  taskDetails,
  onSave,
}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(taskDetails.title);
  const [desc, setDesc] = useState(taskDetails.desc);
  const [dueDate, setDueDate] = useState(
    new Date(taskDetails.dueDate).toISOString().substring(0, 10)
  );
  const [status, setStatus] = useState<TaskStatus>(taskDetails.status);

  useEffect(() => {
    setTitle(taskDetails.title);
    setDesc(taskDetails.desc);
    setDueDate(new Date(taskDetails.dueDate).toISOString().substring(0, 10));
    setStatus(taskDetails.status);
  }, [taskDetails]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask = {
      ...taskDetails,
      title,
      desc,
      dueDate: new Date(dueDate).getTime(),
      status,
    };

    dispatch(updateTask(updatedTask));

    if (onSave) {
      onSave(updatedTask);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-gray-800 border border-gray-700 p-6 sm:p-8 rounded-lg shadow-lg w-72 sm:w-80 md:w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-gray-500">
            Edit Task
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-red-500"
          >
            <IoMdClose size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="title"
              className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-medium text-sm mb-1 text-left"
            >
              Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border border-gray-600 rounded-md w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 placeholder-gray-400"
              placeholder="Enter task title..."
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="desc"
              className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 font-medium text-sm mb-1 text-left"
            >
              Description:
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="shadow appearance-none border border-gray-600 rounded-md w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 placeholder-gray-400"
              placeholder="Enter task description..."
              rows={2}
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="dueDate"
              className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-medium text-sm mb-1 text-left"
            >
              Due Date:
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="shadow appearance-none border border-gray-600 rounded-md w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="status"
              className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 font-medium text-sm mb-1 text-left"
            >
              Status:
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(Number(e.target.value) as TaskStatus)}
              className="shadow appearance-none border border-gray-600 rounded-md w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
              required
            >
              <option value={0}>Pending</option>
              <option value={1}>In Progress</option>
              <option value={2}>Completed</option>
            </select>
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-red-400 hover:from-blue-600 hover:to-red-500 text-white py-1.5 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Update Task
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white py-1.5 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskDialog;
