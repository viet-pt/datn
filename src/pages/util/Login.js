import { Form } from "antd";
import { UserService } from "api/UserService";
import logo from 'assets/images/logo.png';
import { InputForm, Notification } from "components/common";
import { ROUTES } from "global/routes";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchUser } from "redux/action/userAction";

import Cookies from 'universal-cookie';
import { storageKey } from "utils/storageKey";
const cookies = new Cookies();
const dd = 3 * 86400 * 1000;
const d = new Date();

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { mutate: onLogin } = useMutation(UserService.login, {
    onSuccess: (res) => {
      if (res?.success) {
        Notification.success('Đăng nhập thành công!');
        storeData(res.data);
        history.push(ROUTES.HOME_PAGE);
      } else {
        Notification.error(res?.message || 'Tài khoản hoặc mật khẩu không đúng!');
      }
    },
    onError: (err) => {
      Notification.error(err.message || 'Tài khoản hoặc mật khẩu không đúng!');
    },
  });

  const handleSubmit = (values) => {
    const data = {
      username: values.email?.toLowerCase(),
      password: values.password,
      id_token: ''
    };
    onLogin(data);
  };

  const storeData = (data) => {
    d.setTime(d.getTime() + dd);
    cookies.set(storageKey.ACCESS_TOKEN, data.access_token, { path: '/', expires: d });
    dispatch(fetchUser());
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-28 w-auto" src={logo} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Form name="basic" className="mt-8 space-y-6" onFinish={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <InputForm
                isRequired
                name="email"
                placeholder="Email"
              />
            </div>
            <div>
              <InputForm
                isPassword
                isRequired
                name="password"
                placeholder="Password"
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
              Sign in
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default React.memo(Login);
