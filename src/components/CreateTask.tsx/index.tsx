import React, { useState } from 'react';
import { dayAfterTomorrow, TaskStatus } from '../../constants';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Task } from '../../types';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/taskSlice';

const NewTask: React.FC = () => {
  const initialValues: Task = {
    id: Date.now(),
    title: '',
    desc: '',
    status: TaskStatus.PENDING,
    dueDate: dayAfterTomorrow,
  };
  const dispatch = useDispatch();
  const [task, setTask] = useState<Task>(initialValues);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    desc: Yup.string().required('Description is required'),
    dueDate: Yup.number().nullable(),
  });

  const createNewTask = (values: Task, formikHelpers: FormikHelpers<Task>) => {
    const newTask = {
      id: Date.now(),
      title: values.title,
      desc: values.desc,
      status: TaskStatus.PENDING,
      dueDate: new Date(values.dueDate).getTime(),
    };
    setTask(newTask);
    dispatch(addTask(task));

    formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={createNewTask}
    >
      {({ setFieldValue, resetForm }) => (
        <Form className="w-full max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg  m-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Create New Task
          </h2>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title:
            </label>
            <Field
              name="title"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description:
            </label>
            <Field
              name="desc"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="desc">
              {(msg) => (
                <div className="text-red-500 text-xs italic mt-1">{msg}</div>
              )}
            </ErrorMessage>
          </div>

          <div className="mb-4">
            <label
              htmlFor="duedate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Due Date:
            </label>
            <Field
              name="duedate"
              type="date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="duedate">
              {(msg) => (
                <div className="text-red-500 text-xs italic mt-1">{msg}</div>
              )}
            </ErrorMessage>
          </div>

          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Status:
            </label>
            <Field
              as="select"
              name="status"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={TaskStatus.PENDING}>Pending</option>
              <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
              <option value={TaskStatus.COMPLETED}>Completed</option>
            </Field>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={() => resetForm()}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
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
