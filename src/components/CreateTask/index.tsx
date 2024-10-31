import React, { useState } from 'react';
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
        <Form className="w-full max-w-lg mx-auto -my-1 p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg m-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Create New Task
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-red-500 text-xl hover:text-red-700"
            >
              <IoMdClose />
            </button>
          </div>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-800 font-medium  text-md  mb-2 text-left"
            >
              Title:
            </label>
            <Field
              name="title"
              className="shadow appearance-none border border-blue-300 rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-gray-400"
              placeholder="Enter task title..."
            />
            <ErrorMessage name="title">
              {(msg) => (
                <div className="text-red-500 text-xs italic mt-1">{msg}</div>
              )}
            </ErrorMessage>
          </div>

          <div className="mb-4">
            <label
              htmlFor="desc"
              className="block text-gray-800 font-medium  text-md  mb-2 text-left"
            >
              Description:
            </label>
            <Field
              name="desc"
              as="textarea"
              rows="3"
              className="shadow appearance-none border border-blue-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-gray-400"
              placeholder="Enter task description..."
            />
            <ErrorMessage name="desc">
              {(msg) => (
                <div className="text-red-500 text-xs italic mt-1">{msg}</div>
              )}
            </ErrorMessage>
          </div>

          <div className="mb-4">
            <label
              htmlFor="dueDate"
              className="block text-gray-800 font-medium  text-md  mb-2 text-left"
            >
              Due Date:
            </label>
            <Field
              name="dueDate"
              type="date"
              className="shadow appearance-none border border-blue-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
            />
            <ErrorMessage name="dueDate">
              {(msg) => (
                <div className="text-red-500 text-md italic mt-1">{msg}</div>
              )}
            </ErrorMessage>
          </div>

          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-gray-800 font-medium  text-md  mb-2 text-left"
            >
              Status:
            </label>
            <Field
              as="select"
              name="status"
              className="block appearance-none w-full bg-blue-50 border border-blue-300 hover:border-blue-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value={TaskStatus.PENDING}>Pending</option>
              <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
              <option value={TaskStatus.COMPLETED}>Completed</option>
            </Field>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white  py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={() => resetForm()}
              className="bg-gray-500 hover:bg-gray-600 text-white  py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
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
