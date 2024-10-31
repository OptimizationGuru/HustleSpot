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
}

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  isOpen,
  onClose,
  taskDetails,
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
    dispatch(
      updateTask({
        ...taskDetails,
        title,
        desc,
        dueDate: new Date(dueDate).getTime(),
        status,
      })
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg shadow-lg w-64 md:w-72">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">Edit Task</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-red-500 text-lg hover:text-red-700"
          >
            <IoMdClose />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="title"
              className="block text-gray-800 font-medium text-sm mb-1 text-left"
            >
              Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border border-blue-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-gray-400"
              placeholder="Enter task title..."
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="desc"
              className="block text-gray-800 font-medium text-sm mb-1 text-left"
            >
              Description:
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="shadow appearance-none border border-blue-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-gray-400"
              placeholder="Enter task description..."
              rows={2}
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="dueDate"
              className="block text-gray-800 font-medium text-sm mb-1 text-left"
            >
              Due Date:
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="shadow appearance-none border border-blue-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-gray-400"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="status"
              className="block text-gray-800 font-medium text-sm mb-1 text-left"
            >
              Status:
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(Number(e.target.value) as TaskStatus)}
              className="shadow appearance-none border border-blue-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
              required
            >
              <option value={0}>Pending</option>
              <option value={1}>In Progress</option>
              <option value={2}>Completed</option>
            </select>
          </div>

          <div className="flex justify-between mt-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Update Task
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white py-1.5 px-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
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
