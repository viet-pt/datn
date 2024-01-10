import React from "react";
import {Form,Divider} from "antd";
import { InputForm } from "components/common";
import { Link } from "react-router-dom";
import logo from 'assets/images/favicon.ico';

const ForgotPassword = () => {
  // const { data } = Queries.useGetUserInfo({ page: 0, size: 10 }, {
  //   refetchInterval: (data, query) =>  data.errorCode !== 1 ? 3000 : 0,
  // });

  // console.log(333, data);

  const handleSubmit = (value) => {
    console.log("Submit ", value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-14 w-auto" src={logo} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Your Password?
          </h2>
        </div>
        <Form name="basic" className="mt-8 space-y-6" onFinish={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <InputForm
                isEmail
                isRequired
                name="email"
                placeholder="Enter Email Address"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm
               font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
               focus:ring-indigo-500"
            >
              Reset password
            </button>
          </div>
          <Divider/>
          <div className="text-sm text-center">
              <Link
                to="/login"
                className="font-medium text-sm text-indigo-600 hover:text-indigo-500"
              >
                Already have an account? Login!
              </Link>
            </div>
        </Form>
      </div>
    </div>
  );
};

export default React.memo(ForgotPassword);