import React from 'react';
import { dayAfterTomorrow, TaskStatus } from '../../constants';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Task } from '../../types';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/taskSlice';
import { IoMdClose } from 'react-icons/io';

interface NewTaskProps {
  onClose: () => void;
}

const NewTask: React.FC<NewTaskProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const initialValues: Task = {
    id: Date.now(),
    title: '',
    desc: '',
    status: TaskStatus.PENDING,
    dueDate: dayAfterTomorrow,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    dueDate: Yup.date().nullable().required('Due date is required'),
  });

  const createNewTask = (values: Task, formikHelpers: FormikHelpers<Task>) => {
    dispatch(
      addTask({
        id: Date.now(),
        title: values.title,
        desc: values.desc,
        status: Number(values.status),
        dueDate: new Date(values.dueDate).getTime(),
      })
    );
    formikHelpers.resetForm();
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={createNewTask}
    >
      {({ setFieldValue, resetForm }) => (
        <div className="flex justify-center">
          <Form className="w-full max-w-sm p-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl transition-transform transform hover:scale-[1.01]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 shadow-md">
                Create New Task
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-white text-2xl hover:text-gray-400 transition duration-200"
              >
                <IoMdClose />
              </button>
            </div>

            <div className="mb-5">
              <label
                htmlFor="title"
                className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-medium text-lg mb-1 shadow-md"
              >
                Title:
              </label>
              <Field
                name="title"
                className="border border-gray-700 rounded-md w-full py-2 px-3 text-gray-300 bg-gray-800 placeholder-gray-500 shadow-inner focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Enter task title..."
              />
              <ErrorMessage name="title">
                {(msg) => (
                  <div className="text-red-500 text-sm italic mt-1">{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div className="mb-5">
              <label
                htmlFor="desc"
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 font-medium text-lg mb-1 shadow-md"
              >
                Description:
              </label>
              <Field
                name="desc"
                as="textarea"
                rows="3"
                className="border border-gray-700 rounded-md w-full py-2 px-3 text-gray-300 bg-gray-800 placeholder-gray-500 shadow-inner focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Enter task description..."
              />
              <ErrorMessage name="desc">
                {(msg) => (
                  <div className="text-red-500 text-sm italic mt-1">{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div className="mb-5">
              <label
                htmlFor="dueDate"
                className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-medium text-lg mb-1 shadow-md"
              >
                Due Date:
              </label>
              <Field
                name="dueDate"
                type="date"
                className="border border-gray-700 rounded-md w-full py-2 px-3 text-gray-300 bg-gray-800 shadow-inner focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                style={{
                  colorScheme: 'dark',
                  WebkitAppearance: 'none',
                }}
              />
              <ErrorMessage name="dueDate">
                {(msg) => (
                  <div className="text-red-500 text-sm italic mt-1">{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div className="mb-5">
              <label
                htmlFor="status"
                className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 font-medium text-lg mb-1 shadow-md"
              >
                Status:
              </label>
              <Field
                as="select"
                name="status"
                className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-inner"
              >
                <option value={TaskStatus.PENDING}>Pending</option>
                <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                <option value={TaskStatus.COMPLETED}>Completed</option>
              </Field>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:ring-2 focus:ring-blue-400 transition-all duration-200 shadow-lg"
              >
                Create Task
              </button>
              <button
                type="button"
                onClick={() => resetForm()}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md focus:ring-2 focus:ring-gray-500 transition-all duration-200 shadow-lg"
              >
                Clear
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default NewTask;
