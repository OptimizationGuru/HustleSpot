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
        <Form className="w-full max-w-xl mx-auto p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">Create New Task</h2>
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
              className="block text-gray-300 font-medium text-lg mb-1 text-left"
            >
              Title:
            </label>
            <Field
              name="title"
              className="shadow-md border border-gray-700 rounded-md w-full py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-800 placeholder-gray-500 transition-all duration-200"
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
              className="block text-gray-300 font-medium text-lg mb-1 text-left"
            >
              Description:
            </label>
            <Field
              name="desc"
              as="textarea"
              rows="3"
              className="shadow-md border border-gray-700 rounded-md w-full py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-800 placeholder-gray-500 transition-all duration-200"
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
              className="block text-gray-300 font-medium text-lg mb-1 text-left"
            >
              Due Date:
            </label>
            <Field
              name="dueDate"
              type="date"
              className="shadow-md border border-gray-700 rounded-md w-full py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-800 transition-all duration-200"
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
              className="block text-gray-300 font-medium text-lg mb-1 text-left"
            >
              Status:
            </label>
            <Field
              as="select"
              name="status"
              className="block w-full bg-gray-800 border border-gray-700 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-200 text-gray-200"
            >
              <option value={TaskStatus.PENDING}>Pending</option>
              <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
              <option value={TaskStatus.COMPLETED}>Completed</option>
            </Field>
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-200"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={() => resetForm()}
              className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200"
            >
              Clear
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewTask;
